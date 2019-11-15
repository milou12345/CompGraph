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


// control parallel or perspective shadow
const perspective = 0;
const parallel = 1;
const shadow = perspective;

const light = new THREE.PointLight();
light.position.set(0,0, 0);
const lightBulb = new THREE.Mesh(new THREE.SphereBufferGeometry(0.2),
                                 new THREE.MeshBasicMaterial({color:'yellow'}));
lightBulb.position.copy(light.position);
const dirLight = new THREE.DirectionalLight();
dirLight.position.set(0,0,1);
// add the right light for the right shadow
if(shadow === perspective) {
  scene.add(light);
  scene.add(lightBulb);
} else if(shadow === parallel) {
  scene.add(dirLight);
}

// the plane that receives the shadow
const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(100,60),
                             new THREE.MeshBasicMaterial({color:'#ffffff'}));
plane.position.z = -40;
scene.add(plane);
plane.add(new THREE.AxesHelper());
// normal vector and distance to origin
const planeNormal = new THREE.Vector3(0,0,1).normalize();
const dist = Math.sqrt(plane.position.z);

// the object that casts the shadow
const knotGeometry = new THREE.TorusKnotGeometry(5,1,160,100);

const mat = new THREE.MeshStandardMaterial({color:'#55cc22',
                                            metalness:0.3});
const torusKnot = new THREE.Mesh(knotGeometry, mat);
torusKnot.position.z = -20;
scene.add(torusKnot);
torusKnot.updateMatrix();   // make sure torusKnot.matrix is properly filled


const shadowKnotGeometry = knotGeometry.clone();
if(shadow === perspective) {
  // HOMEWORK (1): Implement parallel shadow projection

  // do the right thing here to the vertices of shadowKnotGeometry to project to the white screen

} else if(shadow === parallel) {
  // HOMEWORK (2): Implement parallel shadow projection
}

const shadowKnot = new THREE.Mesh(shadowKnotGeometry,
                                  new THREE.MeshBasicMaterial({color:'#303030'}));
scene.add(shadowKnot);

// Draw everything
const controls = new THREE.OrbitControls( camera);
controls.zoomSpeed = 5.0;
function render() {
  requestAnimationFrame(render);

  controls.update();
  renderer.render(scene, camera);

}
render();
