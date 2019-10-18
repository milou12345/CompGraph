// Initialize webGL
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor('white');    // set background color

// Create a new Three.js scene with camera and light
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
camera.position.set(0,0,3);
camera.lookAt(scene.position);   // camera looks at origin

// const spotLight = new THREE.SpotLight("white");
// spotLight.position.set(5,6,7);
// scene.add(spotLight);


const geo = new THREE.SphereGeometry(0.2);

// const geo2 = new THREE.TeapotBufferGeometry(1);

// material specifies how triangle looks like
const mat = new THREE.MeshBasicMaterial({color: "green",
                                         wireframe:true,
                                         wireframeLinewidth:2});

// Combine geometry and material to a new object:
const obj = new THREE.Mesh(geo, mat);

scene.add(obj);

let speed = 0;
const radius = 1.25;
const omega = 1;

const axes = new THREE.AxesHelper();
scene.add(axes);


const myCallback =  function(event) {
  console.log(event.keyCode);
  if(event.keyCode === 37) {
    speed = -1;
  }
  if(event.keyCode === 39) {
    speed = 1;
  }

}
document.addEventListener("keydown", myCallback);

document.addEventListener("keyup", function(event) {speed =0;});




// Draw everything
const controls = new THREE.TrackballControls( camera, canvas );
const clock = new THREE.Clock();
function render() {
  requestAnimationFrame(render);
  // const t = tms / 1000;   // time in Seconds

  const h = clock.getDelta();
  // const t2 = clock.getElapsedTime();

  obj.position.x += speed * h;

  // if(obj.position.x > 2) {
  //   speed = -Math.abs(speed);
  // }

  // if(obj.position.x < -2) {
  //   speed = Math.abs(speed);
  // }
  // controls.update();
  renderer.render(scene, camera);
}
render();
// setInterval(render, 16);
