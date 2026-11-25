import * as THREE from "./vendor/three-0.187.0.min.js";

const radians = THREE.MathUtils.degToRad;
const up = new THREE.Vector3(0, 1, 0);

function finish(color, metalness, roughness) {
  return new THREE.MeshStandardMaterial({ color, metalness, roughness });
}

function part(parent, geometry, material, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

// A turned profile along the optical axis. Each pair is [axial distance, radius].
function turned(parent, material, profile, y = 0, z = 0) {
  const geometry = new THREE.LatheGeometry(profile.map(([x, radius]) => new THREE.Vector2(radius, x)), 96);
  geometry.rotateZ(-Math.PI / 2);
  return part(parent, geometry, material, 0, y, z);
}

function strut(parent, material, from, to, radius, endRadius = radius) {
  const a = new THREE.Vector3(...from);
  const b = new THREE.Vector3(...to);
  const axis = b.clone().sub(a);
  const half = axis.length() / 2;
  const bevel = Math.min(radius * .10, endRadius * .10, half * .22);
  const profile = [
    [0, -half], [radius-bevel, -half], [radius, bevel-half],
    [endRadius, half-bevel], [endRadius-bevel, half], [0, half]
  ];
  const mesh = part(parent, new THREE.LatheGeometry(profile.map(([r,h]) => new THREE.Vector2(r,h)), 36), material);
  mesh.position.lerpVectors(a, b, .5);
  mesh.quaternion.setFromUnitVectors(up, axis.normalize());
  return mesh;
}

// Silk-screened lettering follows the curved enamel between the tube rings.
function addTubeMark(tube) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#34444b";
  ctx.font = "500 78px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("ATALAYA", 256, 91);
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshStandardMaterial({
    map, transparent: true, depthWrite: false, roughness: .46,
    polygonOffset: true, polygonOffsetFactor: -1
  });
  const label = new THREE.LatheGeometry(
    [new THREE.Vector2(.1394,-.151), new THREE.Vector2(.1394,.151)], 32, -.72, .54
  );
  const uv = label.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getY(i), 1 - uv.getX(i));
  label.rotateZ(-Math.PI / 2);
  part(tube, label, material).castShadow = false;
}

function buildInstrument(scene) {
  const enamel = new THREE.MeshPhysicalMaterial({
    color: 0xe3e4df, roughness: .34, metalness: .12, clearcoat: .64, clearcoatRoughness: .25
  });
  const graphite = finish(0x343b40, .72, .30);
  const rubber = finish(0x191e22, .08, .72);
  const steel = finish(0xb5c0c6, .88, .34);
  const titanium = finish(0xa8a39b, .9, .30);
  const mount = finish(0x61696c, .44, .43);

  // Three legs converge under the head. The braces attach inside each leg.
  for (const angle of [14, 134, 254]) {
    const leg = new THREE.Group();
    leg.rotation.y = radians(angle);
    scene.add(leg);
    for (const x of [-.041, .041]) {
      strut(leg, steel, [x, 1.13, .105], [x, .47, .34], .026);
    }
    strut(leg, graphite, [0, .49, .337], [0, .425, .359], .064);
    const latch = part(leg, new THREE.BoxGeometry(.038,.09,.022), rubber, 0,.445,.405);
    latch.rotation.x = -.29;
    strut(leg, titanium, [-.029,.467,.402],[.029,.467,.402],.012);
    strut(leg, steel, [0, .445, .35], [0, .055, .494], .029);
    strut(leg, rubber, [0, .075, .486], [0, .02, .505], .038, .046);
    strut(leg, mount, [0, .64, .05], [0, .57, .312], .014);
  }
  part(scene, new THREE.CylinderGeometry(.22, .18, .028, 3), graphite, 0, .63);
  part(scene, new THREE.CylinderGeometry(.145, .169, .10, 36), mount, 0, 1.12);
  part(scene, new THREE.CylinderGeometry(.125, .145, .075, 36), graphite, 0, 1.205);
  part(scene, new THREE.CylinderGeometry(.134, .134, .018, 36), titanium, 0, 1.24);

  const azimuth = new THREE.Group();
  azimuth.position.y = 1.25;
  scene.add(azimuth);
  strut(azimuth, enamel, [0, 0, 0], [-.083, .233, 0], .12, .107);
  strut(azimuth, graphite, [-.08, .21, -.12], [-.08, .21, .128], .11);
  strut(azimuth, titanium, [-.08, .21, .129], [-.08, .21, .144], .086);
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
  turned(tube, enamel, [[-.53,.106],[-.524,.115],[-.51,.132],[-.49,.139],[.46,.139],[.48,.15]]);
  addTubeMark(tube);
  for (const x of [-.19, .2]) {
    turned(tube, graphite, [[x-.035,.138],[x-.03,.153],[x+.027,.153],[x+.035,.139]]);
    part(tube, new THREE.BoxGeometry(.061,.052,.089), mount, x,-.149);
    part(tube, new THREE.BoxGeometry(.036,.041,.026), graphite, x,.005,.15);
    strut(tube, steel, [x,.005,.157], [x,.005,.178], .014);
    turned(tube, steel, [[x-.027,.151],[x-.023,.154],[x-.020,.151]]);
  }
  turned(tube, titanium, [[.427,.14],[.433,.153],[.46,.153],[.466,.146]]);
  turned(tube, enamel, [[.46,.145],[.472,.149],[.495,.17],[.51,.175],[.817,.178],[.836,.176]]);
  turned(tube, graphite, [[.818,.176],[.827,.182],[.872,.182],[.885,.176],[.89,.17],[.89,.157],[.882,.152],[.792,.145],[.78,.142]]);
  turned(tube, titanium, [[.829,.181],[.833,.183],[.84,.183],[.842,.181]]);
  // Flocked baffles and a recessed retaining ring in front of the objective.
  for (const x of [.806,.831,.853]) {
    const r = .145 + (x-.79)*.09;
    turned(tube, rubber, [[x,r+.003],[x,r-.003],[x-.005,r-.003],[x-.009,r+.001]]);
  }
  const coating = new THREE.MeshPhysicalMaterial({
    color: 0x164352, metalness: .59, roughness: .115,
    clearcoat: .67, clearcoatRoughness: .085, ior: 1.52,
    iridescence: .76, iridescenceIOR: 1.34, iridescenceThicknessMinimum: 270, iridescenceThicknessMaximum: 365
  });
  turned(tube, coating, [[.78,.144],[.788,.128],[.795,.105],[.803,.071],[.808,.032],[.809,0]]);

  // Focuser, silver drawtube, right-angle eyepiece and dual-speed focus knobs.
  turned(tube, graphite, [[-.69,.066],[-.68,.088],[-.57,.096],[-.53,.128],[-.50,.137]]);
  turned(tube, steel, [[-.79,.05],[-.69,.05],[-.68,.061]]);
  for (const x of [-.769,-.747,-.725,-.703]) {
    turned(tube, graphite, [[x,.05],[x+.002,.0505],[x+.004,.05]]);
  }
  turned(tube, rubber, [[-.83,.01],[-.82,.064],[-.78,.066],[-.77,.053]]);
  strut(tube, graphite, [-.811,.015,0],[-.849,.113,0],.039,.048);
  strut(tube, rubber, [-.846,.101,0],[-.859,.149,0],.048);
  strut(tube, steel, [-.598,-.058,-.144],[-.598,-.058,.154],.021);
  for (const side of [-1,1]) {
    strut(tube, graphite, [-.598,-.058,side*.12],[-.598,-.058,side*.17],.057);
  }
  strut(tube, titanium, [-.598,-.058,.17],[-.598,-.058,.196],.035);
  for (let i = 0; i < 12; i++) {
    const angle = i * Math.PI / 6;
    const x = -.598 + .053 * Math.cos(angle);
    const y = -.058 + .053 * Math.sin(angle);
    strut(tube, mount, [x,y,.132],[x,y,.163],.006);
  }
  strut(tube, steel, [-.598,-.058,.196],[-.598,-.058,.199],.013);

  // A finder sits slightly toward the viewer so the two tubes read separately.
  for (const x of [-.17,.09]) {
    strut(tube, mount, [x,.11,.065],[x,.219,.104],.025,.018);
    turned(tube, graphite, [[x-.015,.036],[x-.012,.046],[x+.012,.046],[x+.015,.036]],.222,.104);
    strut(tube, steel, [x,.252,.119],[x,.275,.132],.006);
    strut(tube, graphite, [x,.271,.129],[x,.282,.135],.012);
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
  return { azimuth, altitude, tubeHeight: tube.position.y };
}

// Studio Small 09, photographed by Sergej Majboroda (CC0, polyhaven.com/a/studio_small_09).
// The local panorama stores linear radiance at 1/20 exposure to retain the softbox highlights.
async function studioEnvironment() {
  const image = new Image();
  image.src = new URL("../images/atalaya-studio-light.webp", import.meta.url).href;
  await image.decode();
  const texture = new THREE.CanvasTexture(image);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export async function createTelescope(host) {
  const environment = await studioEnvironment();
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setClearColor(0, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  const scene = new THREE.Scene();
  scene.environment = environment;
  scene.environmentIntensity = 13;
  scene.environmentRotation.y = radians(32);
  scene.add(new THREE.HemisphereLight(0xe0ecff, 0x92918a, .24));
  const key = new THREE.DirectionalLight(0xfff2df, 1.55);
  key.position.set(-2.5, 5, 3);
  key.target.position.y = 1.15;
  key.castShadow = true;
  key.shadow.mapSize.set(512, 512);
  Object.assign(key.shadow.camera, { left: -1.65, right: 1.65, top: 1.65, bottom: -1.65, near: .5, far: 10 });
  key.shadow.camera.updateProjectionMatrix();
  key.shadow.normalBias = .005;
  key.shadow.bias = -.0002;
  scene.add(key, key.target);
  const rim = new THREE.DirectionalLight(0xbddaff, .7);
  rim.position.set(1, 2, -3);
  scene.add(rim);

  const { azimuth, altitude, tubeHeight } = buildInstrument(scene);
  const camera = new THREE.OrthographicCamera(-1, 1, 1.34, -1.34, .1, 20);
  camera.position.set(2.8, 2.03, 6);
  camera.lookAt(.02, 1.235, 0);
  altitude.rotation.z = radians(34);
  azimuth.rotation.y = radians(-6);

  let bounds;
  let running = false;
  let frame = 0;
  let lastDraw = 0;
  let targetYaw = azimuth.rotation.y;
  let targetPitch = altitude.rotation.z;
  let pointer = null;
  const target = new THREE.Vector3();
  const pivot = new THREE.Vector3();
  const towardCamera = new THREE.Vector3();
  const canvas = renderer.domElement;
  host.append(canvas);

  function aim() {
    // Place a point on the cursor's orthographic ray, in front of the mount.
    azimuth.getWorldPosition(pivot);
    target.copy(pivot).project(camera);
    target.x = 2 * (pointer.x - bounds.left) / bounds.width - 1;
    target.y = 1 - 2 * (pointer.y - bounds.top) / bounds.height;
    target.unproject(camera).sub(pivot);
    camera.getWorldDirection(towardCamera).negate();
    target.addScaledVector(towardCamera, 2.2 + target.length() * .32);

    // Solve both mount axes, including the height of the optical axis above its saddle.
    const horizontal = Math.hypot(target.x, target.z);
    const axle = altitude.position;
    targetYaw = Math.atan2(-target.z, target.x) + Math.asin(THREE.MathUtils.clamp(axle.z / horizontal, -1, 1));
    const forward = Math.sqrt(Math.max(0, horizontal * horizontal - axle.z * axle.z)) - axle.x;
    const height = target.y - axle.y;
    targetPitch = Math.atan2(height, forward) - Math.asin(THREE.MathUtils.clamp(tubeHeight / Math.hypot(forward, height), -1, 1));
  }

  function requestDraw() {
    if (!frame) frame = requestAnimationFrame(draw);
  }

  function point(event) {
    if (!event.isPrimary) return;
    pointer = { x: event.clientX, y: event.clientY };
    aim();
    requestDraw();
  }

  function draw(now) {
    frame = 0;
    if (!running) return;
    const dt = Math.min((now - lastDraw) / 1000, .05);
    lastDraw = now;
    const yawError = targetYaw - azimuth.rotation.y;
    const shortestYaw = Math.atan2(Math.sin(yawError), Math.cos(yawError));
    const pitchError = targetPitch - altitude.rotation.z;
    if (Math.max(Math.abs(shortestYaw), Math.abs(pitchError)) > .0002) {
      const blend = 1 - Math.exp(-11 * dt);
      azimuth.rotation.y += shortestYaw * blend;
      altitude.rotation.z += pitchError * blend;
      requestDraw();
    } else {
      azimuth.rotation.y = targetYaw;
      altitude.rotation.z = targetPitch;
    }
    renderer.render(scene, camera);
    host.classList.add("is-rendered");
  }

  function start() {
    if (renderer.getContext().isContextLost()) return;
    bounds = host.getBoundingClientRect();
    // Supersample this small canvas even on 1× displays to smooth the thin metal edges.
    renderer.setPixelRatio(Math.min(3, Math.max(2, window.devicePixelRatio * 1.5)));
    renderer.setSize(bounds.width, bounds.height, false);
    camera.right = camera.top * bounds.width / bounds.height;
    camera.left = -camera.right;
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    if (pointer) aim();
    if (!running) {
      running = true;
      window.addEventListener("pointermove", point, { passive: true, capture: true });
      window.addEventListener("pointerdown", point, { passive: true, capture: true });
      window.addEventListener("resize", start);
    }
    requestDraw();
  }

  function stop() {
    running = false;
    cancelAnimationFrame(frame);
    frame = 0;
    window.removeEventListener("pointermove", point, true);
    window.removeEventListener("pointerdown", point, true);
    window.removeEventListener("resize", start);
    host.classList.remove("is-rendered");
  }

  canvas.addEventListener("webglcontextlost", stop);
  return { start, stop };
}
