// Clinky hero — three.js collectible renderer (mirrors studio.html scene math).
// Persistent canvas + renderer; site.js (classic script) drives it via window.ClinkyHero.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

// Per-drink config — tuned in studio.html, kept as the source of truth here.
const CFG = {
  beer: {
    src: 'models/BeerCap.glb',
    camera: { azim: 35.0, elev: 12.0, dist: 7.35, fov: 30 }, target: [-0.01, 1.20, -0.15],
    offset: [0, 0.86, 0], scale: 1.0, rotation: [20, 0, 0],
    light: { azim: 14, elev: 34, intensity: 2.4 }, ambient: 1.0,
    env: 'assets/env_photostudio.hdr', envIntensity: 1.15, tone: 'aces', exposure: 1.0,
    material: { metalness: 1.0, roughness: 0.40 }, shadow: { opacity: 0.2, softness: 5 }
  },
  coffee: {
    src: 'models/CoffeeCup.glb',
    camera: { azim: 42.4, elev: 23.7, dist: 5.65, fov: 35 }, target: [0.02, 1.19, -0.12],
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
const holders = {};       // src -> normalized Group
const envCache = {};      // url -> PMREM texture
let pendingEnv = null;

function reduceMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function init() {
  canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block';
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

  const loader = new GLTFLoader();
  let loaded = 0;
  Object.keys(CFG).forEach(function (k) {
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
      loaded++;
      if (CFG[drink].src === CFG[k].src) applyConfig(drink);
    }, undefined, function (e) { console.error('hero3d: model load failed', e); });
  });

  window.addEventListener('resize', function () { resize(); dirty = true; });
  renderer.setAnimationLoop(loop);
  if (queuedDrink) { drink = queuedDrink; queuedDrink = null; }
}

function loadEnv(url, cb) {
  if (!url) { cb(null); return; }
  if (envCache[url]) { cb(envCache[url]); return; }
  new RGBELoader().load(url, function (hdr) {
    hdr.mapping = THREE.EquirectangularReflectionMapping;
    const tex = pmrem.fromEquirectangular(hdr).texture;
    hdr.dispose(); envCache[url] = tex; cb(tex);
  }, undefined, function () { cb(null); });
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
  // tone
  renderer.toneMapping = TONE[c.tone] || THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = c.exposure;
  // env
  if (pendingEnv !== c.env) {
    pendingEnv = c.env;
    loadEnv(c.env, function (tex) { scene.environment = tex; dirty = true; });
  }
  hideSiteLoader();
  dirty = true;
}

function hideSiteLoader() { var l = document.getElementById('mvLoader'); if (l) l.style.display = 'none'; }

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
    // toss: quick ease-out up, then a fall that softens into the floor (no wooden snap / extra hop)
    var lp; if (p < 0.32) { var u = p / 0.32; lp = 1 - (1 - u) * (1 - u); } else { var q = (p - 0.32) / 0.68; lp = (1 - q) * (1 - q); }
    modelRoot.position.y = baseY + lp * riseH;
    if (coffee) {
      const wob = D2R(10) * Math.sin(Math.PI * p);
      poseGroup.rotation.set(rx0 + wob * Math.cos(deg), ry0 + deg, rz0 + wob * Math.sin(deg));
    } else {
      poseGroup.rotation.set(rx0 - deg, ry0, rz0);
    }
    dirty = true;
    if (p < 1) requestAnimationFrame(tick);
    else { spinning = false; poseGroup.rotation.set(rx0, ry0, rz0); modelRoot.position.y = baseY; dirty = true; }
  })(performance.now());
}

function loop() {
  const mount = document.getElementById('heroMount');
  if (mount) {
    if (canvas.parentElement !== mount) { mount.appendChild(canvas); resize(); dirty = true; }
    if (dirty || spinning) { renderer.render(scene, camera); dirty = false; }
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
