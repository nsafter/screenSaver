import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);

const pointlight = new THREE.PointLight(0xffffff);
const ambientlight = new THREE.AmbientLight(0xffffff);

scene.add(pointlight, ambientlight);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

camera.position.set(-40, 140, 140);

const controls = new OrbitControls(camera, renderer.domElement);
const obj = new THREE.Object3D();

const sphereScene = [];

function addSpheres() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  const sphereGeo = new THREE.SphereGeometry(10, 15, 35);
  const sphereMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("rgb(" + r + "," + g + "," + b + ")"),
    wireframe: true,
  });

  const spheres = new THREE.Mesh(sphereGeo, sphereMat);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(500));

  spheres.position.set(x, y, z);
  obj.add(spheres);
  sphereScene.push(obj);
  scene.add(obj);
}

for (let i = 0; i < 500; i++) {
  addSpheres();
}

console.log(sphereScene);

console.log(sphereScene[0].obj);

function animate() {
  requestAnimationFrame(animate);
  for (let k = 0; k < sphereScene.length; k++) {
    sphereScene[k].rotateX(0.000004);
    sphereScene[k].rotateY(0.000004);
    sphereScene[k].rotateZ(0.000004);
  }
  renderer.render(scene, camera);
  controls.update();
}

animate();
