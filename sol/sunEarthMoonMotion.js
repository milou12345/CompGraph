// Initialize webGL, create scene and camera
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor('black');    // set background color

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
camera.position.set(0,0,5);


// Create sun, earthm moon
const sun = new THREE.Mesh(new THREE.SphereGeometry( 0.5, 32, 32),
                           new THREE.MeshBasicMaterial({color: "yellow",
                                                        wireframe:true} ));
scene.add(sun);


const earth = new THREE.Mesh(new THREE.SphereGeometry( 0.2, 16,16),
                             new THREE.MeshBasicMaterial({color: "blue",
                                                         wireframe:true} ));
scene.add(earth);
const distSunEarth = 3;
const wEarth = 2*Math.PI/15;

const moon = new THREE.Mesh(new THREE.SphereGeometry( 0.1, 16,16),
                            new THREE.MeshBasicMaterial({color: "white",
                                                         wireframe:true} ));
earth.add(moon);
const distEarthMoon = 1;
const wMoon = 2*Math.PI/5;

// Draw everything
const controls = new THREE.TrackballControls( camera, canvas );
const clock = new THREE.Clock();
function render() {
  requestAnimationFrame(render);
  const t = clock.getElapsedTime();

  earth.position.x = distSunEarth * Math.cos(wEarth * t);
  earth.position.y = distSunEarth * Math.sin(wEarth * t);

  moon.position.x = distEarthMoon * Math.cos(wMoon * t);
  moon.position.y = distEarthMoon * Math.sin(wMoon * t);

  controls.update();
  renderer.render(scene, camera);
}
render();
