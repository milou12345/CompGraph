// Create a house

//* Initialize webGL with camera and lights
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor('rgb(255,255,255)');
// create scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, canvas.width / canvas.height,
                                           0.1, 1000);
camera.position.z = 10;

const ambientLight = new THREE.AmbientLight(0x909090);
scene.add(ambientLight);
const light = new THREE.DirectionalLight(0x444444);
light.position.set( 1.5,1,1 );
scene.add(light);
scene.add(new THREE.AxesHelper());  // Global coordinate system


//* Build the house
const width = 1;
const len = 2;
const height = 0.8;

const house = new THREE.Object3D();
scene.add(house);
house.position.z = 3.5;
// Add the body to the house

const bodyMat = new THREE.MeshPhongMaterial({color: "gray"} );
// transparent body for debugging:
// bodyMat.transparent = true;
// bodyMat.opacity = 0.3;
const bodyGeo = new THREE.BoxGeometry(width,height,len);
const body = new THREE.Mesh(bodyGeo, bodyMat);
body.position.y = height/2; //  + 0.0001;
house.add(body);

// Add the roof
const roofMat = new THREE.MeshBasicMaterial({color: "red"} );
const roofGeo = createRoofGeo(1.1*len,1.2*width,0.5*height);
const roof = new THREE.Mesh(roofGeo, roofMat);
roof.position.y = height;
house.add(roof);

// Add the ground
const groundMat = new THREE.MeshPhongMaterial({color:"green",
                                               side:THREE.DoubleSide} );
groundMat.transparent = true;
groundMat.opacity = 0.5;
const groundGeo = new THREE.PlaneGeometry(20,20);
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI/2;
scene.add(ground);




//* Render loop
const controls = new THREE.TrackballControls( camera, canvas );

function render() {
  requestAnimationFrame(render);

  controls.update();
  renderer.render(scene, camera);
}

render();
