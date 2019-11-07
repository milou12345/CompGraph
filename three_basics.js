// Initialize webGL
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor('white');    // set background color

// Create a new Three.js scene with camera and light
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
camera.position.set(0,0,3);
camera.lookAt(scene.position);   // camera looks at origin

const geo = new THREE.SphereGeometry(0.2, 16, 16);

const params = {color: "green",
                wireframe:true,
                wireframeLinewidth:2};

const mat = new THREE.MeshBasicMaterial(params);

// Combine geometry and material to a new object:
const obj = new THREE.Mesh(geo, mat);
scene.add(obj);

// Draw everything
const axes = new THREE.AxesHelper();
scene.add(axes);
const controls = new THREE.TrackballControls( camera, canvas );
const clock = new THREE.Clock();
function render() {
  requestAnimationFrame(render);

  const t = clock.getElapsedTime();

  controls.update();
  renderer.render(scene, camera);
}
render();




function genRotMat(ax, theta, pivot) {
  const m = new THREE.Matrix4();
  m.makeRotationAxis(ax, theta);
  const prp = pivot.clone().sub(pivot.clone().applyMatrix4(m));
  m.setPosition(prp);
  return m;
}
