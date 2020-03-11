"use strict";
import * as THREE from "../js/three/build/three.module.js";
import { OrbitControls } from "./js/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "../js/three/examples/jsm/loaders/GLTFLoader.js";

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
// let camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, height / - 2, 1, 1000 );
// camera.position.z = 100;
camera.position.set(100, 100, 100);
// camera.lookAt(new THREE.Vector3(0,0,0));

let loader = new GLTFLoader();
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

let controls = new OrbitControls(camera, renderer.domElement);
// let controls = new THREE.SimpleOrbitControls(renderer, scene, camera);

// let geometry = new THREE.BoxGeometry();
// let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// let cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// resize renderer and canvas when window resizes.
let onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener("resize", onWindowResize, false);

// add model
loader.load(
  "./model/model.gltf",
  function(gltf) {
    gltf.scene.traverse(function(child) {
      if (child.isMesh) {
        child.geometry.center(); // center here
      }
    });

    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Group
    gltf.scene.scale.set(.5, .5, .5); // Array<THREE.Group>
    scene.add(gltf.scene);
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object

    // let box = new THREE.Box3().setFromObject( gltf );
    // console.log( box.min, box.max, box.getSize() );
  },
  // called while loading is progressing
  function(xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function(error) {
    console.log("An error happened");
  }
);

//    // resize renderer and canvas when window resizes.
//    let onWindowResize = () => {
// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();
// 	renderer.setSize( window.innerWidth, window.innerHeight );
// }
// window.addEventListener( 'resize', onWindowResize, false );

// to calculate delta time
// _lastTime = (new Date()).getTime();

let animate = function() {
  requestAnimationFrame(animate);

  //render scene
  renderer.render(scene, camera);
};

animate();
