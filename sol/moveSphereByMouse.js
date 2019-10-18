// Initialize webGL
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor('black');    // set background color

// Create a new Three.js scene with camera and light
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
camera.position.set(0,0,5);
camera.lookAt(scene.position);   // camera looks at origin
const ambientLight = new THREE.AmbientLight("white");
scene.add(ambientLight);


// Create sphere:
const geo = new THREE.SphereGeometry( 0.5, 16,16);
const mat = new THREE.MeshBasicMaterial({color: "yellow",
                                         wireframe:true} );
const obj = new THREE.Mesh(geo, mat);
scene.add(obj);


let speed = 0;   // units per seconds

scene.add(new THREE.AxisHelper( 1.5 ));


const mycb = function(event) {
  // console.log('event.keyCode=', event.keyCode);

  event.preventDefault();

  if(event.keyCode===37) {
    speed = -1;
  }
  if(event.keyCode===39) {
    speed = 1;
  }
};
document.addEventListener('keydown', mycb);
document.addEventListener('keyup', function() {speed = 0;} );

const controls = new THREE.TrackballControls( camera, canvas );
const clock = new THREE.Clock();
function render() {
  requestAnimationFrame(render);
  const h = clock.getDelta();

  obj.position.x += speed*h;

  controls.update();
  renderer.render(scene, camera);
}
render();
