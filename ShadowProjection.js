/*global Stats */

// Initialize webGL
const canvas = document.getElementById("mycanvas");
const context = canvas.getContext( 'webgl2' );
const renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true, context: context });
renderer.setClearColor('black');

// Create a new Three.js scene with camera and light
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 1, 200 );
camera.position.set(0,0,30);

const axesHelper = new THREE.AxesHelper( 10 );
scene.add( axesHelper );
scene.add(new THREE.AmbientLight('#606060'));

function resizeWin() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resizeWin);
resizeWin();


// light source with light bulb indicating the position of the light
const light = new THREE.PointLight();
light.position.set(0,0, 0);
const lightBulb = new THREE.Mesh(new THREE.SphereBufferGeometry(0.2),
                                 new THREE.MeshBasicMaterial({color:'yellow'}));
lightBulb.position.copy(light.position);
scene.add(light);
light.add(lightBulb);

// the plane that receives the shadow
const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(100,60),
                             new THREE.MeshBasicMaterial({color:'#ffffff'}));
plane.position.z = -40;
scene.add(plane);
plane.add(new THREE.AxesHelper());
// normal vector and distance to origin
const planeNormal = new THREE.Vector3(0,0,1).normalize();
const dist = plane.position.length();  // distance to origin

// the object that casts the shadow
const knotGeometry = new THREE.TorusKnotGeometry(5,1,160,100);

const mat = new THREE.MeshStandardMaterial({color:'#55cc22',
                                            metalness:0.3});
const torusKnot = new THREE.Mesh(knotGeometry, mat);
torusKnot.rotation.y = 0.5;
torusKnot.position.z = -20;
scene.add(torusKnot);
torusKnot.updateMatrixWorld();   // make sure torusKnot.matrixWorld is properly filled


// construct the shadow object as copy of the torusKnot geometry and project it onto the screen:
let shadowKnotGeometry = knotGeometry.clone();

// construct the projection matrix: shift the plane on which to project slightly closer to the
// light source than the white ground in order to avoid z-fighting.
const perspProj = new THREE.Matrix4().multiplyScalar(dist-0.001);
perspProj.elements[3] = -planeNormal.x;
perspProj.elements[7] = -planeNormal.y;
perspProj.elements[11] = -planeNormal.z;
perspProj.elements[15] = 0;

// printMat(torusKnot.matrix);

// apply projection matrix to all vertices

// Version 1: extended version, slower, but hopefully clearer
shadowKnotGeometry.vertices = shadowKnotGeometry.vertices.map(v => {
  // map vertex to coordinate system where light source sits at origin (=world space in this case):
  v.applyMatrix4(torusKnot.matrixWorld);

  // construct a 4 component vector in order to apply projection matrix and do perspective division:
  const v4 = new THREE.Vector4(v.x, v.y, v.z, 1);
  v4.applyMatrix4(perspProj);
  v4.divideScalar(v4.w);
  return new THREE.Vector3(v4.x, v4.y, v4.z);
});

// Version 2: faster and more compact. Works, because Vector3.applyMatrix4 implicitly divides by 4th component.
// see https://threejs.org/docs/index.html#api/en/math/Vector3.applyMatrix4
// let world2Plane = torusKnot.matrixWorld.clone().premultiply(perspProj);
// shadowKnotGeometry.vertices = shadowKnotGeometry.vertices.map(v => v.applyMatrix4(world2Plane));

// construct shadow object from projected geometry
let shadowKnot = new THREE.Mesh(shadowKnotGeometry,
                                new THREE.MeshBasicMaterial({color:'#303030'}));
scene.add(shadowKnot);

// Mouse control, fps counter and render loop
const controls = new THREE.OrbitControls( camera);
controls.zoomSpeed = 5.0;

function render() {
  requestAnimationFrame(render);

  controls.update();
  renderer.render(scene, camera);
}
render();
