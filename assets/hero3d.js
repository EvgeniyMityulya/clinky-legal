// Clinky hero — three.js collectible renderer (mirrors studio.html scene math).
// Persistent canvas + renderer; site.js (classic script) drives it via window.ClinkyHero.
// three.js is ~600 KB and parsing it costs ~1.8 s of main thread on a phone, so it is
// imported on demand: on desktop once the hero is visible and the page has settled, on mobile
// on first interaction. Init is split into separate tasks so no single step blocks the page.
let THREE, GLTFLoader, RGBELoader, RoomEnvironment, D2R, TONE;

// 256x128 downscale of env_photostudio.hdr (1024x512, 1.6 MB). At roughness 0.3–0.4 the
// prefiltered reflections look the same, and PMREM works on a 64 px cube instead of 256 px.
const ENV_SRC = '/assets/env_photostudio_256.hdr';

// Hand the main thread back between init steps (input, paint) before continuing.
function nextTask() {
  if (globalThis.scheduler && typeof scheduler.yield === 'function') return scheduler.yield();
  return new Promise(function (r) { setTimeout(r, 0); });
}

// Fetch as ArrayBuffer with progress; Content-Length can be the compressed size, so clamp.
async function fetchBuffer(url, onProgress) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('hero3d: ' + url + ' ' + res.status);
  const total = +res.headers.get('content-length') || 0;
  if (!onProgress || !total || !res.body) { const b = await res.arrayBuffer(); if (onProgress) onProgress(1); return b; }
  const reader = res.body.getReader(), parts = [];
  let got = 0;
  for (;;) {
    const r = await reader.read();
    if (r.done) break;
    parts.push(r.value); got += r.value.length;
    onProgress(Math.min(0.99, got / total));
  }
  const out = new Uint8Array(got);
  let o = 0; parts.forEach(function (p) { out.set(p, o); o += p.length; });
  onProgress(1);
  return out.buffer;
}

async function ensureDeps() {
  if (THREE) return;
  const [three, gltf, rgbe, room] = await Promise.all([
    import('three'),
    import('three/addons/loaders/GLTFLoader.js'),
    import('three/addons/loaders/RGBELoader.js'),
    import('three/addons/environments/RoomEnvironment.js')
  ]);
  THREE = three;
  GLTFLoader = gltf.GLTFLoader;
  RGBELoader = rgbe.RGBELoader;
  RoomEnvironment = room.RoomEnvironment;
  D2R = THREE.MathUtils.degToRad;
  TONE = { aces: THREE.ACESFilmicToneMapping, neutral: THREE.NeutralToneMapping, agx: THREE.AgXToneMapping, linear: THREE.LinearToneMapping };
}

// Per-drink config — tuned in studio.html, kept as the source of truth here.
const CFG = {
  beer: {
    src: '/models/BeerCap.glb',
    camera: { azim: 39.6, elev: 14.0, dist: 5.47, fov: 30 }, target: [-0.10, 1.10, -0.09],
    offset: [0, 0.86, 0], scale: 1.15, rotation: [20, 0, 0],
    light: { azim: 14, elev: 34, intensity: 2.4 }, ambient: 1.0,
    envIntensity: 1.15, tone: 'aces', exposure: 1.0,
    material: { metalness: 1.0, roughness: 0.40 }, shadow: { opacity: 0.2, softness: 5 }
  },
  coffee: {
    src: '/models/CoffeeCup.glb',
    camera: { azim: 45.0, elev: 22.3, dist: 5.31, fov: 35 }, target: [-0.08, 1.21, -0.08],
    offset: [0, 0, 0], scale: 1.15, rotation: [0, 45, 0],
    light: { azim: 20, elev: 44, intensity: 4.5 }, ambient: 0.65,
    envIntensity: 1.0, tone: 'aces', exposure: 0.8,
    material: { metalness: 0.52, roughness: 0.30 }, shadow: { opacity: 0.3, softness: 10 }
  }
};

let renderer, scene, camera, dirLight, ambLight, groundMat, modelRoot, poseGroup, pmrem;
let canvas, drink = 'beer', dirty = false, spinning = false, queuedDrink = null, spinToken = 0, groundedY = 0;
let ready = false;        // first paint only after the active model AND the environment are loaded
let revealing = false;
const holders = {};       // src -> normalized Group
const progress = { model: 0, env: 0 };   // 0..1 each → combined load %

function reduceMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

let booting = false;
async function init() {
  if (renderer || booting) return;
  booting = true;
  if (queuedDrink) { drink = queuedDrink; queuedDrink = null; }

  // network first: assets download while three.js is being parsed
  const activeSrc = CFG[drink].src;
  const envBuf = fetchBuffer(ENV_SRC, function (p) { progress.env = p; updateLoader(); });
  const modelBufs = {};
  Object.keys(CFG).forEach(function (k) {
    const src = CFG[k].src;
    modelBufs[k] = fetchBuffer(src, src === activeSrc ? function (p) { progress.model = p; updateLoader(); } : null);
    modelBufs[k].catch(function () {});   // handled where awaited; avoid unhandled-rejection noise
  });
  envBuf.catch(function () {});

  await ensureDeps();
  await nextTask();

  canvas = document.createElement('canvas');
  // hidden until everything is ready, so the un-lit (black, metallic-no-env) first frame never shows
  canvas.style.cssText = 'width:100%;height:100%;display:block;opacity:0;transition:opacity .25s ease';
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) { console.error('hero3d: WebGL unavailable', e); canvas = null; showPlaceholder(); return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  pmrem = new THREE.PMREMGenerator(renderer);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(32, 1, 0.05, 200);

  dirLight = new THREE.DirectionalLight(0xffffff, 2.4);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.set(2048, 2048);
  dirLight.shadow.camera.near = 0.1; dirLight.shadow.camera.far = 40;
  dirLight.shadow.camera.left = -6; dirLight.shadow.camera.right = 6;
  dirLight.shadow.camera.top = 6; dirLight.shadow.camera.bottom = -6;
  dirLight.shadow.bias = -0.0006;
  scene.add(dirLight); scene.add(dirLight.target);

  ambLight = new THREE.HemisphereLight(0xffffff, 0xffe7e0, 0.6);
  scene.add(ambLight);

  groundMat = new THREE.ShadowMaterial({ opacity: 0.3 });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), groundMat);
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true;
  scene.add(ground);

  modelRoot = new THREE.Group();
  poseGroup = new THREE.Group();
  modelRoot.add(poseGroup);
  scene.add(modelRoot);

  window.addEventListener('resize', function () { resize(); dirty = true; });
  renderer.setAnimationLoop(loop);

  // ---- environment (needed before first paint — metallic with no env renders black) ----
  await nextTask();
  pmrem.compileEquirectangularShader();
  await nextTask();
  try {
    const d = new RGBELoader().parse(await envBuf);
    const hdr = new THREE.DataTexture(d.data, d.width, d.height, THREE.RGBAFormat, d.type);
    hdr.colorSpace = THREE.LinearSRGBColorSpace;
    hdr.minFilter = hdr.magFilter = THREE.LinearFilter;
    hdr.generateMipmaps = false; hdr.flipY = true;
    hdr.mapping = THREE.EquirectangularReflectionMapping;
    hdr.needsUpdate = true;
    await nextTask();
    scene.environment = pmrem.fromEquirectangular(hdr).texture; hdr.dispose();
  } catch (e) {
    // network/parse error → neutral room env so nothing stays black
    console.error('hero3d: environment failed, using room env', e);
    try { scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture; } catch (e2) {}
  }
  progress.env = 1; updateLoader(); checkReady();

  // ---- models: active drink first (gates reveal), then the other one ----
  const loader = new GLTFLoader();
  const order = Object.keys(CFG).sort(function (a, b) { return (CFG[b].src === activeSrc) - (CFG[a].src === activeSrc); });
  for (const k of order) {
    await nextTask();
    try { await parseModel(loader, k, await modelBufs[k]); }
    catch (e) { console.error('hero3d: model load failed', e); }
    if (CFG[k].src === activeSrc) { progress.model = 1; updateLoader(); }
    checkReady();
    if (ready && queuedDrink === k) { queuedDrink = null; window.ClinkyHero.setDrink(k); }
  }
}

function parseModel(loader, k, buf) {
  return new Promise(function (resolve, reject) {
    loader.parse(buf, '', function (gltf) {
      const m = gltf.scene;
      const box = new THREE.Box3().setFromObject(m);
      const c = box.getCenter(new THREE.Vector3());
      const sz = box.getSize(new THREE.Vector3());
      const norm = 2 / Math.max(sz.x, sz.y, sz.z);
      m.position.sub(c);
      m.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
      const holder = new THREE.Group();
      holder.add(m); holder.scale.setScalar(norm);
      holder.userData.size = sz.multiplyScalar(norm);
      holders[CFG[k].src] = holder;
      resolve();
    }, reject);
  });
}

function updateLoader() {
  const pct = Math.min(100, Math.round((progress.model * 0.55 + progress.env * 0.45) * 100));
  const arc = document.getElementById('mvProgArc');
  if (arc) arc.style.strokeDashoffset = (163.36 * (1 - pct / 100)).toFixed(1);
  const t = document.getElementById('mvPct');
  if (t) t.textContent = pct + '%';
}

function checkReady() {
  if (ready || revealing) return;
  if (!(scene.environment && holders[CFG[drink].src])) return;
  revealing = true;
  reveal();
}

// Compile shaders off the critical path (KHR_parallel_shader_compile where available), then fade in.
async function reveal() {
  const d = drink;
  applyConfig(d);
  try { await renderer.compileAsync(scene, camera); } catch (e) {}
  await nextTask();
  if (drink !== d) {                       // drink switched while compiling
    if (holders[CFG[drink].src]) applyConfig(drink);
    else { queuedDrink = drink; drink = d; }   // its model is still parsing; the model loop swaps it in
  }
  ready = true; revealing = false;
  const l = document.getElementById('mvLoader');
  if (l) { l.style.opacity = '0'; setTimeout(function () { l.style.display = 'none'; }, 300); }
  canvas.style.opacity = '1';
  dropPlaceholder();
  dirty = true;
}

function applyConfig(d) {
  const c = CFG[d];
  const holder = holders[c.src];
  if (!holder) return;
  spinToken++; spinning = false;   // cancel any in-flight spin so it can't bleed onto the new model
  // swap model
  while (poseGroup.children.length) poseGroup.remove(poseGroup.children[0]);
  poseGroup.add(holder);
  poseGroup.rotation.set(D2R(c.rotation[0]), D2R(c.rotation[1]), D2R(c.rotation[2]));

  const size = holder.userData.size || new THREE.Vector3(2, 2, 2);
  groundedY = size.y / 2 + c.offset[1];
  modelRoot.scale.setScalar(c.scale);
  modelRoot.position.set(c.offset[0], groundedY, c.offset[2]);

  holder.traverse(function (o) {
    if (o.isMesh && o.material) {
      o.material.metalness = c.material.metalness;
      o.material.roughness = c.material.roughness;
      o.material.envMapIntensity = c.envIntensity;
      o.material.needsUpdate = true;
    }
  });

  const tgt = new THREE.Vector3().fromArray(c.target);
  // camera
  const phi = D2R(90 - c.camera.elev), th = D2R(c.camera.azim);
  camera.position.setFromSphericalCoords(c.camera.dist * heroDistMul(), phi, th).add(tgt);
  camera.fov = c.camera.fov; camera.updateProjectionMatrix();
  camera.lookAt(tgt);
  // light
  dirLight.intensity = c.light.intensity;
  dirLight.position.setFromSphericalCoords(6, D2R(90 - c.light.elev), D2R(c.light.azim)).add(tgt);
  dirLight.target.position.copy(tgt); dirLight.target.updateMatrixWorld();
  dirLight.shadow.radius = c.shadow.softness;
  ambLight.intensity = c.ambient;
  groundMat.opacity = c.shadow.opacity;
  // tone (env itself is loaded once in init and shared by both drinks)
  renderer.toneMapping = TONE[c.tone] || THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = c.exposure;
  dirty = true;
}

// Zoom the model in on small screens so it reads bigger (stronger on phones).
function heroDistMul() {
  var w = window.innerWidth;
  if (w < 560) return 0.90;
  if (w < 960) return 0.95;
  return 1;
}
function resize() {
  const mount = canvas.parentElement; if (!mount) return;
  const w = mount.clientWidth, h = mount.clientHeight;
  if (!w || !h) return;
  renderer.setSize(w, h, false);
  camera.aspect = w / h; camera.updateProjectionMatrix();
  const c = CFG[drink];
  const tgt = new THREE.Vector3().fromArray(c.target);
  const phi = D2R(90 - c.camera.elev), th = D2R(c.camera.azim);
  camera.position.setFromSphericalCoords(c.camera.dist * heroDistMul(), phi, th).add(tgt);
  camera.lookAt(tgt);
}

const easeIO = function (p) { return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; };
function play() {
  const c = CFG[drink], holder = holders[c.src];
  if (!holder || spinning) return;
  if (reduceMotion()) return;
  spinning = true;
  const myToken = ++spinToken;
  try {
    var ua = navigator.userActivation;
    if (navigator.vibrate && (!ua || ua.hasBeenActive)) navigator.vibrate(9);
  } catch (e) {}
  const coffee = drink === 'coffee', dur = 900, t0 = performance.now();
  const rx0 = D2R(c.rotation[0]), ry0 = D2R(c.rotation[1]), rz0 = D2R(c.rotation[2]);
  const baseY = groundedY;
  const riseH = (coffee ? 0.24 : 0.13) * holder.userData.size.y;
  (function tick(now) {
    if (myToken !== spinToken) return;   // a drink switch / newer spin took over → abandon
    const p = Math.min((now - t0) / dur, 1);
    const deg = 2 * Math.PI * easeIO(p);
    // toss: main hop then a small soft secondary bounce on landing
    var lp;
    if (p < 0.62) lp = Math.sin(Math.PI * (p / 0.62));
    else lp = 0.16 * Math.sin(Math.PI * ((p - 0.62) / 0.38));
    modelRoot.position.y = baseY + lp * riseH;
    if (coffee) {
      const tilt = D2R(18) * Math.sin(Math.PI * p);            // lean sideways and back, like a spinning top
      poseGroup.rotation.set(rx0, ry0 + deg, rz0 + tilt);
    } else poseGroup.rotation.set(rx0 - deg, ry0, rz0);         // forward roll for the cap
    dirty = true;
    if (p < 1) requestAnimationFrame(tick);
    else { spinning = false; poseGroup.rotation.set(rx0, ry0, rz0); modelRoot.position.y = baseY; dirty = true; }
  })(performance.now());
}

function loop() {
  const mount = document.getElementById('heroMount');
  if (mount) {
    if (canvas.parentElement !== mount) {
      mount.appendChild(canvas); resize(); dirty = true;
      if (ready) { canvas.style.opacity = '1'; const l = document.getElementById('mvLoader'); if (l) l.style.display = 'none'; }
      return;   // the drawing-buffer resize is its own task; draw on the next frame
    }
    if (ready && (dirty || spinning)) { renderer.render(scene, camera); dirty = false; }
  }
}

// public API for site.js (classic script)
window.ClinkyHero = {
  setDrink: function (d) {
    if (d !== 'beer' && d !== 'coffee') return;
    drink = d;
    if (!ready) {
      // the still shows the cap, so a coffee pick before 3D is ready swaps it for the progress ring
      if (d === 'coffee') { dropPlaceholder(); showLoader(); }
      if (!renderer) queuedDrink = d;
      return;
    }
    if (!holders[CFG[d].src]) { queuedDrink = d; return; }
    // smooth cross-fade: fade out, swap the model while hidden, fade the new one in
    canvas.style.opacity = '0';
    setTimeout(function () {
      if (drink !== d) return;            // a newer switch took over
      applyConfig(d);
      dirty = true;
      try { renderer.render(scene, camera); } catch (e) {}   // draw new model before it fades in
      canvas.style.opacity = '1';
    }, 270);
  },
  play: play,
  isReady: function () { return !!renderer; }
};

// Boot strategy: the hero is decorative, so nothing heavy runs before first paint.
// Desktop starts it once the page is idle; phones show a static cap and load three.js
// only when the visitor actually taps the stage (or switches drink).
const PLACEHOLDER_SRC = '/assets/bento/drink.png';

function showPlaceholder() {
  const mount = document.getElementById('heroMount');
  if (!mount || mount.querySelector('[data-hero-still]')) return false;
  const img = document.createElement('img');
  img.src = PLACEHOLDER_SRC;
  img.alt = '';
  img.setAttribute('data-hero-still', '1');
  img.decoding = 'async';
  // absolute, so the canvas can mount underneath while 3D loads and the still fades out on reveal
  img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block;pointer-events:none;transition:opacity .25s ease';
  mount.appendChild(img);
  const loader = document.getElementById('mvLoader');
  if (loader) loader.style.display = 'none';
  return true;
}

function dropPlaceholder() {
  const still = document.querySelector('[data-hero-still]');
  if (!still) return;
  still.removeAttribute('data-hero-still');
  still.style.opacity = '0';
  setTimeout(function () { if (still.parentElement) still.parentElement.removeChild(still); }, 300);
}

function showLoader() {
  const l = document.getElementById('mvLoader');
  if (l) { l.style.display = 'flex'; l.style.opacity = '1'; }
}

function wantsLightHero() {
  if (window.innerWidth < 900) return true;
  const c = navigator.connection;
  if (c && (c.saveData || /^(slow-2g|2g)$/.test(c.effectiveType || ''))) return true;
  return (navigator.hardwareConcurrency || 8) <= 4;
}

let bootRequested = false;
function bootHero() {
  // three.js loads only where the hero is on the page; support, legal and game pages never fetch it
  if (bootRequested || !document.getElementById('heroMount')) return;
  bootRequested = true;
  // a tap before the still went in (mobile) — show progress instead of an empty stage
  if (!document.querySelector('[data-hero-still]')) showLoader();
  init();
}

function waitForMount(attempt) {
  if (showPlaceholder()) return;
  if ((attempt || 0) > 40) return;
  setTimeout(function () { waitForMount((attempt || 0) + 1); }, 120);
}

function armLazyBoot() {
  waitForMount(0);
  const stage = document.querySelector('[data-act="play"]');
  const target = stage || document;
  const once = { once: true, passive: true };
  target.addEventListener('pointerdown', bootHero, once);
  target.addEventListener('touchstart', bootHero, once);
}

// Right after load the GPU process is still busy rasterising the page, and creating a WebGL
// context then blocks the main thread for seconds (measured 4.3 s at 4x CPU throttle vs ~0.3 s
// a second later). So desktop waits for the hero to be on screen, then a settle delay, then idle.
const SETTLE_MS = 1500;

function whenVisible(el, fn) {
  if (!el || typeof IntersectionObserver !== 'function') { fn(); return; }
  let done = false;
  const go = function () { if (done) return; done = true; io.disconnect(); fn(); };
  const io = new IntersectionObserver(function (entries) {
    if (entries.some(function (e) { return e.isIntersecting; })) go();
  });
  io.observe(el);
  setTimeout(go, 10000);   // the SPA may swap the mount out; never wait forever
}

function scheduleHero() {
  if (wantsLightHero()) { armLazyBoot(); return; }
  const stage = document.querySelector('[data-act="play"]');
  if (stage) stage.addEventListener('pointerdown', bootHero, { once: true, passive: true });
  const start = function () {
    whenVisible(document.getElementById('heroMount'), function () {
      setTimeout(function () {
        if (window.requestIdleCallback) requestIdleCallback(bootHero, { timeout: 2000 });
        else bootHero();
      }, SETTLE_MS);
    });
  };
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}

// site.js mounts the app after this module runs, and the SPA can render the home page later
// (say /support, then Home), so scheduling waits for the mount itself, not for page load.
function whenHeroMounted(fn) {
  if (document.getElementById('heroMount')) { fn(); return; }
  if (typeof MutationObserver !== 'function') return;
  const obs = new MutationObserver(function () {
    if (!document.getElementById('heroMount')) return;
    obs.disconnect();
    fn();
  });
  obs.observe(document.getElementById('app') || document.body, { childList: true, subtree: true });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { whenHeroMounted(scheduleHero); });
else whenHeroMounted(scheduleHero);

// site.js can ask for the hero explicitly (drink switch, spin button)
window.ClinkyHeroBoot = bootHero;
