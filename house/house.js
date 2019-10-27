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
// scene.add(new THREE.AxesHelper());  // Global coordinate system


//* Build the house
const width = 1;
const len = 2;
const height = 0.8;

const house = new THREE.Object3D();
scene.add(house);

// Add the body to the house

const bodyMat = new THREE.MeshPhongMaterial({color: "gray"} );
// transparent body for debugging:
// bodyMat.transparent = true;
//  bodyMat.opacity = 0.3;
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


// windows and a door
const windowGeo = new THREE.BoxGeometry(height/3, len/10, 0.01);
const windowMat = new THREE.MeshPhongMaterial( { color: 'black'} );
const win1 = new THREE.Mesh(windowGeo, windowMat);
// win1.add(new THREE.AxesHelper( 1.0 ));
house.add(win1);


win1.position.x = width/2;
win1.position.y = height/2;
win1.position.z = len/4;
win1.rotation.z = Math.PI/2;
win1.rotation.y = Math.PI/2;

const win2 = win1.clone();
win2.position.z = -len/4;
house.add(win2);
const win3 = win1.clone();
win3.position.x = -width/2;
house.add(win3);

const win4 = new THREE.Mesh(windowGeo, windowMat);
win4.rotation.z = Math.PI/2;
win4.position.z = len/2;
win4.position.y = height/2;
house.add(win4);


const door = new THREE.Mesh(new THREE.BoxGeometry(2*height/3, len/8, 0.01),
                            new THREE.MeshPhongMaterial( { color: 'darkslategrey'} ));
house.add(door);
door.rotation.z = Math.PI/2;
door.rotation.y = Math.PI/2;
door.position.x = -width/2;
door.position.z = -len/4;
door.position.y = height/3;


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
