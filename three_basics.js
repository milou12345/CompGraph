// Initialize webGL
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor('white');    // set background color
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a new Three.js scene with camera and light
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(0,0,3);
camera.lookAt(scene.position);   // camera looks at origin

const radius = 0.2;
const geo = new THREE.SphereGeometry(radius, 16, 16);

const params = {color: "green",
                wireframe:true,
                wireframeLinewidth:2};

const mat = new THREE.MeshBasicMaterial(params);

// Combine geometry and material to a new object:
const obj = new THREE.Mesh(geo, mat);
scene.add(obj);
const speed = new THREE.Vector3(-3,0,0);


window.addEventListener("resize", function(event) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
});


// Draw everything
const axes = new THREE.AxesHelper();
scene.add(axes);
const controls = new THREE.TrackballControls( camera, canvas );
const clock = new THREE.Clock();
function render() {
  requestAnimationFrame(render);

  const h = clock.getDelta();
  const t = clock.getElapsedTime();

  // move ball
  obj.position.add(speed.clone().multiplyScalar(h));

  const posc = obj.position.clone();
  posc.applyMatrix4(camera.matrixWorldInverse);

  console.log(posc.z);
  const zc = Math.abs(posc.z);
  const hc = 2 * zc * Math.tan(Math.PI/180*camera.fov/2);
  const wc = camera.aspect*hc;
  if(posc.x < -wc/2+radius) {
    speed.x = Math.abs(speed.x);
  }
  if(posc.x > wc/2-radius) {
    speed.x = -Math.abs(speed.x);
  }



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
