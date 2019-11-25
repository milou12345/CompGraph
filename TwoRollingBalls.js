/*global THREE */

//* Initialize webGL
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor('rgb(255, 255, 255)');    // set background color

// Create a new Three.js scene with camera and world axes
const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(2));
const camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height,
                                          0.1, 1000 );
camera.position.set(20,10,20);


//* Add floor
const floorX = 20;
const floorZ = 20;
const floorMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(floorX, floorZ, 20, 20),
                                 new THREE.MeshBasicMaterial({wireframe:true,
                                                              color:0x000000,
                                                              side:THREE.DoubleSide}));
floorMesh.rotation.x = Math.PI/2;
scene.add(floorMesh);
const floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(floorX, floorZ, 20, 20),
                             new THREE.MeshBasicMaterial({wireframe:false,
                                                          color:0x505050,
                                                          side:THREE.DoubleSide}));
floor.material.transparent = true;
floor.material.opacity = 0.5;
floor.rotation.x = Math.PI/2;
scene.add(floor);

//* Add ball
const ballRadius = 2;
const ballGeo = new THREE.SphereGeometry(ballRadius, 8, 8);
const ball1 = new THREE.Mesh(ballGeo,  new THREE.MeshBasicMaterial( {color: 0x0000ff,
                                                                     wireframeLinewidth:2,
                                                                    wireframe:true}));
const ball2 = ball1.clone();
scene.add(ball1);
scene.add(ball2);



// speed and current position of translational motion
const slowDown = 2;
let u1 = new THREE.Vector3(3+2*Math.random(), 0, 3+2*Math.random()).divideScalar(slowDown);
ball1.position.copy(new THREE.Vector3(-floorX/2, ballRadius, -floorZ/2));
let u2 = new THREE.Vector3(3+2*Math.random(), 0, -3+2*Math.random()).divideScalar(slowDown);
ball2.position.copy(new THREE.Vector3(-floorX/2, ballRadius, floorZ/2));
let ball2Pos = new THREE.Vector3(floorX/2, ballRadius, floorZ/2);

//* Render loop
const computerClock = new THREE.Clock();
const controls = new THREE.TrackballControls( camera );
function render() {
  requestAnimationFrame(render);

  const dt = computerClock.getDelta();
  const t = computerClock.getElapsedTime();

  // update position of ball:
  ball2.position.add(u2.clone().multiplyScalar(dt));
  ball1.position.add(u1.clone().multiplyScalar(dt));


  // Implement reflection: the axis of rotation has to be updated since the direction of the speed changes!
  if(ball1.position.x> floorX/2) {
    u1.x = - Math.abs(u1.x);
  }
  if(ball1.position.z > floorZ/2) {
    u1.z = - Math.abs(u1.z);
  }
  if(ball2.position.x> floorX/2) {
    u2.x = - Math.abs(u2.x);
  }
  if(ball2.position.z > floorZ/2) {
    u2.z = - Math.abs(u2.z);
  }

  controls.update();
  renderer.render(scene, camera);
}
render();
