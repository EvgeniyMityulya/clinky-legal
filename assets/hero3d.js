// Clinky hero — three.js collectible renderer (mirrors studio.html scene math).
// Persistent canvas + renderer; site.js (classic script) drives it via window.ClinkyHero.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// Per-drink config — tuned in studio.html, kept as the source of truth here.
const CFG = {
  beer: {
    src: 'models/BeerCap.glb',
    camera: { azim: 35.0, elev: 12.0, dist: 8.4, fov: 30 }, target: [0, 0.70, -0.03],
    offset: [0, 0.86, 0], scale: 1.0, rotation: [20, 0, 0],
    light: { azim: 14, elev: 34, intensity: 2.4 }, ambient: 1.0,
    env: 'assets/env_photostudio.hdr', envIntensity: 1.15, tone: 'aces', exposure: 1.0,
    material: { metalness: 1.0, roughness: 0.40 }, shadow: { opacity: 0.2, softness: 5 }
  },
  coffee: {
    src: 'models/CoffeeCup.glb',
    camera: { azim: 42.4, elev: 23.7, dist: 6.8, fov: 35 }, target: [-0.01, 1.00, 0.02],
    offset: [0, 0, 0], scale: 1.0, rotation: [0, 45, 0],
    light: { azim: 20, elev: 44, intensity: 4.5 }, ambient: 0.65,
    env: 'assets/env_photostudio.hdr', envIntensity: 1.0, tone: 'aces', exposure: 0.8,
    material: { metalness: 0.52, roughness: 0.30 }, shadow: { opacity: 0.3, softness: 10 }
  }
};
const D2R = THREE.MathUtils.degToRad;
const TONE = { aces: THREE.ACESFilmicToneMapping, neutral: THREE.NeutralToneMapping, agx: THREE.AgXToneMapping, linear: THREE.LinearToneMapping };

let renderer, scene, camera, dirLight, ambLight, groundMat, modelRoot, poseGroup, pmrem;
let canvas, drink = 'beer', dirty = false, spinning = false, queuedDrink = null, spinToken = 0, groundedY = 0;
let ready = false;        // first paint only after the active model AND the environment are loaded
const holders = {};       // src -> normalized Group
const progress = { model: 0, env: 0 };   // 0..1 each → combined load %

function reduceMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function init() {
  canvas = document.createElement('canvas');
  // hidden until everything is ready, so the un-lit (black, metallic-no-env) first frame never shows
  canvas.style.cssText = 'width:100%;height:100%;display:block;opacity:0;transition:opacity .5s ease';
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) { console.error('hero3d: WebGL unavailable', e); return; }
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

  if (queuedDrink) { drink = queuedDrink; queuedDrink = null; }

  // ---- environment (needed before first paint — metallic with no env renders black) ----
  function useRoomEnv() {
    try { scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture; } catch (e) {}
    progress.env = 1; updateLoader(); checkReady();
  }
  new RGBELoader().load(CFG[drink].env,
    function (hdr) {
      hdr.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = pmrem.fromEquirectangular(hdr).texture; hdr.dispose();
      progress.env = 1; updateLoader(); checkReady();
    },
    function (e) { if (e && e.lengthComputable && e.total) { progress.env = Math.min(1, e.loaded / e.total); updateLoader(); } },
    useRoomEnv   // network/parse error → neutral room env so nothing stays black
  );

  // ---- models: active drink reports progress + gates reveal; the other preloads quietly ----
  const loader = new GLTFLoader();
  Object.keys(CFG).forEach(function (k) {
    const isActive = CFG[k].src === CFG[drink].src;
    loader.load(CFG[k].src, function (gltf) {
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
      if (isActive) { progress.model = 1; updateLoader(); }
      checkReady();
    }, function (e) {
      if (isActive && e && e.lengthComputable && e.total) { progress.model = Math.min(1, e.loaded / e.total); updateLoader(); }
    }, function (e) { console.error('hero3d: model load failed', e); });
  });

  window.addEventListener('resize', function () { resize(); dirty = true; });
  renderer.setAnimationLoop(loop);
}

function updateLoader() {
  const pct = Math.min(100, Math.round((progress.model * 0.55 + progress.env * 0.45) * 100));
  const arc = document.getElementById('mvProgArc');
  if (arc) arc.style.strokeDashoffset = (163.36 * (1 - pct / 100)).toFixed(1);
  const t = document.getElementById('mvPct');
  if (t) t.textContent = pct + '%';
}

function checkReady() {
  if (ready) return;
  if (scene.environment && holders[CFG[drink].src]) {
    applyConfig(drink);
    ready = true;
    const l = document.getElementById('mvLoader');
    if (l) { l.style.opacity = '0'; setTimeout(function () { l.style.display = 'none'; }, 300); }
    canvas.style.opacity = '1';
    dirty = true;
  }
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
  camera.position.setFromSphericalCoords(c.camera.dist, phi, th).add(tgt);
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

function resize() {
  const mount = canvas.parentElement; if (!mount) return;
  const w = mount.clientWidth, h = mount.clientHeight;
  if (!w || !h) return;
  renderer.setSize(w, h, false);
  camera.aspect = w / h; camera.updateProjectionMatrix();
}

const easeIO = function (p) { return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; };
function play() {
  const c = CFG[drink], holder = holders[c.src];
  if (!holder || spinning) return;
  if (reduceMotion()) return;
  spinning = true;
  const myToken = ++spinToken;
  try { if (navigator.vibrate) navigator.vibrate(9); } catch (e) {}
  const coffee = drink === 'coffee', dur = 900, t0 = performance.now();
  const rx0 = D2R(c.rotation[0]), ry0 = D2R(c.rotation[1]), rz0 = D2R(c.rotation[2]);
  const baseY = groundedY;
  const riseH = (coffee ? 0.30 : 0.16) * holder.userData.size.y;
  (function tick(now) {
    if (myToken !== spinToken) return;   // a drink switch / newer spin took over → abandon
    const p = Math.min((now - t0) / dur, 1);
    const deg = 2 * Math.PI * easeIO(p);
    // toss: main hop then a small soft secondary bounce on landing
    var lp;
    if (p < 0.62) lp = Math.sin(Math.PI * (p / 0.62));
    else lp = 0.16 * Math.sin(Math.PI * ((p - 0.62) / 0.38));
    modelRoot.position.y = baseY + lp * riseH;
    if (coffee) poseGroup.rotation.set(rx0, ry0 + deg, rz0);   // calm spin around its own vertical axis
    else poseGroup.rotation.set(rx0 - deg, ry0, rz0);          // forward roll for the cap
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
    }
    if (ready && (dirty || spinning)) { renderer.render(scene, camera); dirty = false; }
  }
}

// public API for site.js (classic script)
window.ClinkyHero = {
  setDrink: function (d) {
    if (d !== 'beer' && d !== 'coffee') return;
    drink = d;
    if (renderer && holders[CFG[d].src]) applyConfig(d);
    else queuedDrink = d;
  },
  play: play,
  isReady: function () { return !!renderer; }
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
