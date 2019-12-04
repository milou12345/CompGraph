/* global dat */

// Demos for applying textures

// Initialize webGL
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas});
// get rid of useless firefox warnings: should soon disappear
renderer.context.getShaderInfoLog = () => '';
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('rgb(255,255,255)');

// create scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight,
                                            0.1, 1000);
camera.position.z = 3;

window.addEventListener("resize", function(event) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
});




//
// Light
const ambientLight = new THREE.AmbientLight('#404040');
scene.add(ambientLight);
// const dirLight = new THREE.DirectionalLight('#ffffff');
// dirLight.position.set( 1.5,1,1 );
// scene.add(dirLight);
const spotLight = new THREE.SpotLight('#aaaaaa');
spotLight.position.set( 15,15,15 );
scene.add(spotLight);


// create object to apply texture
const txtLoader = new THREE.TextureLoader();


const map = txtLoader.load("earth_surface_2048.jpg");
// const map = txtLoader.load("checkerboard.jpg");
// map.wrapS = THREE.RepeatWrapping;
// map.wrapT = THREE.RepeatWrapping;
// map.repeat.set(3,3);

const mat = new THREE.MeshPhongMaterial({
  color:'#ffffff',
  specular:'#606060',
  shininess: 10,
  map
});

// renderer.gammaOutput = true;

const geo = new THREE.SphereGeometry(1, 24, 24);
const earth = new THREE.Mesh(geo, mat);
earth.name = 'Earth';
scene.add(earth);


const controls = new THREE.OrbitControls( camera, canvas );
controls.zoomSpeed = 1/2;
function render() {
  requestAnimationFrame(render);

  spotLight.position.copy(camera.position);

  controls.update();
  renderer.render(scene, camera);
}

render();
