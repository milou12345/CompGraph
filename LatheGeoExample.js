"use strict";
// Setup renderer, camera and light
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true});
renderer.setClearColor('white');    // set background color
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height,
                                            0.1, 1000 );
camera.position.set(0, 20, -7);
const light = new THREE.PointLight();
scene.add( light );
light.position.copy(camera.position);
scene.add(new THREE.AmbientLight(0x606060));


// dimensions
const radius = 5;
const height = 1;
const thickness = 0.25;

// create ring using LatheGeometry
// Step 1: create rectangle
const points = new Array(5);
points[0] = new THREE.Vector2(radius, 0);
points[1] = new THREE.Vector2(radius, height);
points[2] = new THREE.Vector2(radius+thickness, height);
points[3] = new THREE.Vector2(radius+thickness, 0);
points[4] = new THREE.Vector2(radius,0);
// Step: create geometry by rotating rectangle around y axis
const ringGeo = new THREE.LatheGeometry( points, 200);
ringGeo.computeFlatVertexNormals();   // needed for correct interaction with light

// create Mesh:
var ringMat = new THREE.MeshPhongMaterial( {color: new THREE.Color("#aa99bb"),
                                            side: THREE.DoubleSide});
var ring = new THREE.Mesh( ringGeo, ringMat );
scene.add(ring);


// Render loop
const controls = new THREE.TrackballControls(camera, renderer.domElement);
function render() {
  requestAnimationFrame(render);
  controls.update();

  // light always from direction of camera
  light.position.copy(camera.position.clone());

  renderer.render(scene, camera);
}
render();
