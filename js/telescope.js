import * as THREE from "./vendor/three-0.187.0.min.js";

const radians = THREE.MathUtils.degToRad;
const up = new THREE.Vector3(0, 1, 0);

function finish(color, metalness, roughness) {
  return new THREE.MeshStandardMaterial({ color, metalness, roughness });
}

function part(parent, geometry, material, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  parent.add(mesh);
  return mesh;
}

// A turned profile along the optical axis. Each pair is [axial distance, radius].
function turned(parent, material, profile, y = 0, z = 0) {
  const geometry = new THREE.LatheGeometry(profile.map(([x, radius]) => new THREE.Vector2(radius, x)), 48);
  geometry.rotateZ(-Math.PI / 2);
  return part(parent, geometry, material, 0, y, z);
}

function strut(parent, material, from, to, radius, endRadius = radius) {
  const a = new THREE.Vector3(...from);
  const b = new THREE.Vector3(...to);
  const axis = b.clone().sub(a);
  const mesh = part(parent, new THREE.CylinderGeometry(endRadius, radius, axis.length(), 16), material);
  mesh.position.lerpVectors(a, b, .5);
  mesh.quaternion.setFromUnitVectors(up, axis.normalize());
  return mesh;
}

function buildInstrument(scene) {
  const enamel = finish(0xe0dfd1, .32, .26);
  const graphite = finish(0x30393d, .58, .33);
  const rubber = finish(0x191e22, .08, .72);
  const steel = finish(0xb7c6cf, .86, .25);
  const brass = finish(0xc99560, .72, .28);
  const mount = finish(0x657477, .62, .34);

  // Three legs converge under the head. The braces attach inside each leg.
  for (const angle of [14, 134, 254]) {
    const leg = new THREE.Group();
    leg.rotation.y = radians(angle);
    scene.add(leg);
    for (const x of [-.041, .041]) {
      strut(leg, steel, [x, 1.13, .105], [x, .47, .34], .026);
    }
    strut(leg, graphite, [0, .49, .337], [0, .425, .359], .064);
    strut(leg, steel, [0, .445, .35], [0, .055, .494], .029);
    strut(leg, rubber, [0, .075, .486], [0, .02, .505], .038, .046);
    strut(leg, mount, [0, .64, .05], [0, .57, .312], .014);
  }
  part(scene, new THREE.CylinderGeometry(.22, .18, .028, 3), graphite, 0, .63);
  part(scene, new THREE.CylinderGeometry(.145, .169, .10, 36), mount, 0, 1.12);
  part(scene, new THREE.CylinderGeometry(.125, .145, .075, 36), graphite, 0, 1.205);
  part(scene, new THREE.CylinderGeometry(.134, .134, .018, 36), brass, 0, 1.24);

  const azimuth = new THREE.Group();
  azimuth.position.y = 1.25;
  scene.add(azimuth);
  strut(azimuth, enamel, [0, 0, 0], [-.083, .233, 0], .12, .107);
  strut(azimuth, graphite, [-.08, .21, -.12], [-.08, .21, .128], .11);
  strut(azimuth, brass, [-.08, .21, .129], [-.08, .21, .144], .086);
  strut(azimuth, mount, [-.08, .21, .144], [-.08, .21, .151], .064);
  strut(azimuth, steel, [-.08, .21, .151], [-.08, .21, .162], .024);
  for (const angle of [30, 150, 270]) {
    const x = -.08 + .05 * Math.cos(radians(angle));
    const y = .21 + .05 * Math.sin(radians(angle));
    strut(azimuth, graphite, [x, y, .151], [x, y, .156], .009);
  }
  strut(azimuth, steel, [-.08, .21, -.065], [.205, .02, .24], .019);
  strut(azimuth, graphite, [.085, .104, .115], [.158, .053, .195], .079);
  strut(azimuth, enamel, [-.075, .226, -.065], [.012, .33, -.04], .092);

  const altitude = new THREE.Group();
  altitude.position.set(.012, .33, -.04);
  azimuth.add(altitude);
  part(altitude, new THREE.BoxGeometry(.48, .045, .113), graphite, .01, .005);
  const tube = new THREE.Group();
  tube.position.y = .177;
  altitude.add(tube);

  // Ivory optical tube, dovetail, padded rings and the machined dew shield.
  turned(tube, enamel, [[-.53, .106], [-.50, .139], [.46, .139], [.48, .15]]);
  for (const x of [-.19, .2]) {
    turned(tube, graphite, [[x-.035,.138],[x-.03,.153],[x+.027,.153],[x+.035,.139]]);
    part(tube, new THREE.BoxGeometry(.061,.052,.089), mount, x,-.149);
    part(tube, new THREE.BoxGeometry(.036,.041,.026), graphite, x,.005,.15);
    strut(tube, steel, [x,.005,.157], [x,.005,.178], .014);
    turned(tube, steel, [[x-.027,.151],[x-.023,.154],[x-.020,.151]]);
  }
  turned(tube, brass, [[.427,.14],[.433,.153],[.46,.153],[.466,.146]]);
  turned(tube, enamel, [[.46,.145],[.50,.173],[.84,.177],[.86,.17]]);
  turned(tube, graphite, [[.83,.176],[.845,.181],[.873,.181],[.884,.172],[.884,.148],[.825,.146]]);
  turned(tube, steel, [[.803,.175],[.807,.1775],[.810,.175]]);
  turned(tube, brass, [[.855,.181],[.861,.182],[.867,.181]]);
  const coating = new THREE.MeshPhysicalMaterial({
    color: 0x225377, metalness: .54, roughness: .12,
    clearcoat: 1, clearcoatRoughness: .08, iridescence: .58, iridescenceIOR: 1.38
  });
  turned(tube, coating, [[.833,.147],[.847,.122],[.857,.081],[.862,.036],[.863,0]]);

  // Focuser, silver drawtube, right-angle eyepiece and dual-speed focus knobs.
  turned(tube, graphite, [[-.69,.066],[-.68,.088],[-.57,.096],[-.53,.128],[-.50,.137]]);
  turned(tube, steel, [[-.79,.05],[-.69,.05],[-.68,.061]]);
  turned(tube, rubber, [[-.83,.01],[-.82,.064],[-.78,.066],[-.77,.053]]);
  strut(tube, graphite, [-.811,.015,0],[-.849,.113,0],.039,.048);
  strut(tube, rubber, [-.846,.101,0],[-.859,.149,0],.048);
  strut(tube, steel, [-.598,-.058,-.144],[-.598,-.058,.154],.021);
  for (const side of [-1,1]) {
    strut(tube, graphite, [-.598,-.058,side*.12],[-.598,-.058,side*.17],.057);
  }
  strut(tube, brass, [-.598,-.058,.17],[-.598,-.058,.196],.035);
  for (let i = 0; i < 12; i++) {
    const angle = i * Math.PI / 6;
    const x = -.598 + .053 * Math.cos(angle);
    const y = -.058 + .053 * Math.sin(angle);
    strut(tube, mount, [x,y,.132],[x,y,.163],.006);
  }
  strut(tube, steel, [-.598,-.058,.196],[-.598,-.058,.199],.013);

  // A finder sits slightly toward the viewer so the two tubes read separately.
  for (const x of [-.17,.09]) {
    strut(tube, mount, [x,.11,.065],[x,.219,.104],.016);
  }
  turned(tube, graphite, [[-.32,.027],[-.26,.035],[.15,.038],[.16,.045]],.222,.104);
  turned(tube, enamel, [[-.18,.036],[.115,.04],[.118,.039]],.222,.104);
  turned(tube, graphite, [[.118,.04],[.127,.053],[.211,.053],[.211,.041]],.222,.104);
  turned(tube, coating, [[.207,.041],[.209,0]],.222,.104);

  const lead = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-.61,-.08,-.025), new THREE.Vector3(-.60,-.19,.005),
    new THREE.Vector3(-.39,-.25,.04), new THREE.Vector3(-.20,-.147,.025)
  ]);
  part(tube, new THREE.TubeGeometry(lead, 18, .007, 6, false), rubber);
  return { azimuth, altitude };
}

// Reflection cards give the steel and coated lens distinct highlights at icon size.
function makeSkyReflection() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  const sky = ctx.createLinearGradient(0, 0, 0, 128);
  for (const [at, color] of [[0,"#73879d"],[.43,"#526170"],[.55,"#212e36"],[1,"#393227"]]) {
    sky.addColorStop(at, color);
  }
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 256, 128);
  ctx.fillStyle = "#f7eee0";
  ctx.fillRect(34, 25, 49, 18);
  ctx.fillStyle = "#c3dafa";
  ctx.fillRect(145, 17, 15, 49);
  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createTelescope(host) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setClearColor(0, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const scene = new THREE.Scene();
  scene.environment = makeSkyReflection();
  scene.add(new THREE.HemisphereLight(0xd9eaff, 0x897366, 1.05));
  const key = new THREE.DirectionalLight(0xfff1db, 2.5);
  key.position.set(2, 4, 3);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xa7c9ff, 2.1);
  rim.position.set(-2, 3, -1);
  scene.add(rim);

  const { azimuth, altitude } = buildInstrument(scene);
  const camera = new THREE.OrthographicCamera(-1, 1, 1.34, -1.34, .1, 20);
  camera.position.set(2.8, 2.03, 6);
  camera.lookAt(.02, 1.235, 0);
  altitude.rotation.z = radians(34);
  azimuth.rotation.y = radians(-6);

  let bounds;
  let running = false;
  let frame = 0;
  let lastDraw = 0;
  let elapsed = 0;
  let aimX = 0;
  let aimY = 0;
  let touchedUntil = 0;
  const canvas = renderer.domElement;
  host.append(canvas);

  function point(event) {
    const dx = event.clientX - (bounds.left + bounds.width / 2);
    const dy = event.clientY - (bounds.top + bounds.height / 2);
    const reach = Math.max(110, bounds.width * 1.65);
    const influence = Math.max(0, 1 - Math.hypot(dx, dy) / reach);
    aimX = THREE.MathUtils.clamp(dx / (bounds.width * .42), -1, 1) * influence;
    aimY = THREE.MathUtils.clamp(-dy / (bounds.height * .42), -1, 1) * influence;
    touchedUntil = event.pointerType === "touch" ? performance.now() + 1700 : 0;
  }

  function release() {
    aimX = aimY = touchedUntil = 0;
  }

  function draw(now) {
    if (!running) return;
    frame = requestAnimationFrame(draw);
    const delta = (now - lastDraw) / 1000;
    if (delta < 1 / 30) return;
    const dt = Math.min(delta, .1);
    elapsed += dt;
    lastDraw = now;
    if (touchedUntil && now > touchedUntil) release();
    const yaw = -6 + 12 * Math.sin(elapsed * .28) + 27 * aimX;
    const pitch = 34 + 5 * Math.sin(elapsed * .41) + 17 * aimY;
    azimuth.rotation.y = THREE.MathUtils.damp(azimuth.rotation.y, radians(yaw), 4, dt);
    altitude.rotation.z = THREE.MathUtils.damp(altitude.rotation.z, radians(pitch), 4, dt);
    renderer.render(scene, camera);
    host.classList.add("is-rendered");
  }

  function start() {
    if (renderer.getContext().isContextLost()) return;
    bounds = host.getBoundingClientRect();
    renderer.setSize(bounds.width, bounds.height, false);
    camera.right = camera.top * bounds.width / bounds.height;
    camera.left = -camera.right;
    camera.updateProjectionMatrix();
    if (running) return;
    running = true;
    window.addEventListener("pointermove", point, { passive: true });
    window.addEventListener("pointerdown", point, { passive: true });
    document.documentElement.addEventListener("pointerleave", release);
    lastDraw = performance.now() - 100;
    draw(performance.now());
  }

  function stop() {
    running = false;
    cancelAnimationFrame(frame);
    window.removeEventListener("pointermove", point);
    window.removeEventListener("pointerdown", point);
    document.documentElement.removeEventListener("pointerleave", release);
    release();
    host.classList.remove("is-rendered");
  }

  canvas.addEventListener("webglcontextlost", stop);
  return { start, stop };
}
