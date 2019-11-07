/*global THREE */

//* Initialize webGL
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor('rgb(255, 255, 255)');    // set background color

// Create a new Three.js scene with camera and world axes
const scene = new THREE.Scene();
scene.add(new THREE.AxisHelper(2));
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
const ball = new THREE.Mesh(ballGeo,  new THREE.MeshBasicMaterial( {color: 0x0000ff,
                                                                    wireframeLinewidth:2,
                                                                    wireframe:true}));
scene.add(ball);
let ballSpeed = new THREE.Vector3(5*Math.random(), 0, 5*Math.random());
let ballPos = new THREE.Vector3(0, ballRadius, 0);


//* Render loop
const computerClock = new THREE.Clock();
const controls = new THREE.TrackballControls( camera );
function render() {
  requestAnimationFrame(render);

  // translational motion of ball
  const dt = computerClock.getDelta();
  ballPos.add(ballSpeed.clone().multiplyScalar(dt));
  ball.position.copy(ballPos);

  // Implement reflection
  if(ballPos.x> floorX/2) {
    ballSpeed.x = - Math.abs(ballSpeed.x);
  }
  if(ballPos.z > floorZ/2) {
    ballSpeed.z = - Math.abs(ballSpeed.z);
  }

  controls.update();
  renderer.render(scene, camera);
}
render();
