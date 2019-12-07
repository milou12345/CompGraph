/* global createRoofGeo */

//* Initialize webGL with camera and lights
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('rgb(255,255,255)');
renderer.shadowMap.enabled=true;
// create scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight,
                                         0.1, 1000);
camera.position.z = 3;
camera.position.y = 1;

// Add lights
const ambientLight = new THREE.AmbientLight(0x505050);
scene.add(ambientLight);
const light = new THREE.SpotLight(0xffffff);
light.position.set(5,3,4);
light.castShadow = true;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 40;
light.shadow.mapSize.x = 1024;
light.shadow.mapSize.y = 1024;
scene.add(light);
// just for debugging: display the shadow camera frustum by commenting out the next three lines:
// const shadowCamHelper = new THREE.CameraHelper(light.shadow.camera);
// shadowCamHelper.material.linewidth = 2;
// scene.add(shadowCamHelper);
//Texture 
const txtLoader=new THREE.TextureLoader();
const txtWall = txtLoader.load("http://127.0.0.1:8000/Documents/GIT/CompGraph/house/brick-wall.jpg");
const txtSun = txtLoader.load("http://127.0.0.1:8000/Documents/GIT/CompGraph/house/sunmap.jpg");
const txtRoof = txtLoader.load("http://127.0.0.1:8000/Documents/GIT/CompGraph/house/roof.jpg");

// Add sun at position of spotlight
const sun = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32),
                           new THREE.MeshBasicMaterial({map:txtSun}));
sun.position.copy(light.position);
scene.add(sun);

// Add the ground
const groundMat = new THREE.MeshPhongMaterial({color: "lime", side:THREE.DoubleSide} );
groundMat.transparent = true;
groundMat.opacity = 0.5;
const groundGeo = new THREE.PlaneGeometry(20,20);
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI/2;
ground.receiveShadow = true;
scene.add(ground);



// Build the house
const width = 1;
const len = 2;
const height = 0.8;
const house = new THREE.Object3D();
scene.add(house);
// NOTE: 'house.castShadow=true' does NOT work !!
// castShadow=true has to be set on the Mesh objects themselfes!


// Add the body to the house
const bodyMat = new THREE.MeshPhongMaterial({map:txtWall} );
// transparent body for debugging:
// bodyMat.transparent = true;
// bodyMat.opacity = 0.3;
const bodyGeo = new THREE.BoxGeometry(width,height,len);
const body = new THREE.Mesh(bodyGeo, bodyMat);
body.castShadow = true;
body.position.y = height/2 + 0.0001;
house.add(body);

// Add the roof to the house
const roofMat = new THREE.MeshPhongMaterial({map:txtRoof} );
const roofGeo = createRoofGeo(1.1*len,1.1*width,0.5*height);


const roof = new THREE.Mesh(roofGeo, roofMat);
roof.castShadow = true;
roof.position.y = height;
house.add(roof);

// windows
const windowGeo = new THREE.BoxGeometry(height/3, len/10, 0.01);
// shiny windows
const windowMat = new THREE.MeshPhongMaterial( { color: 'black',
                                                 specular:"white",
                                                 shininess:50} );
const win1 = new THREE.Mesh(windowGeo, windowMat);
house.add(win1);
win1.rotation.z = Math.PI/2;
win1.rotation.y = Math.PI/2;
win1.position.x = width/2;
win1.position.y = height/2;
win1.position.z = len/4;
const win2 = win1.clone();
win2.position.z = -len/4;
house.add(win2);
const win3 = win1.clone();
win3.position.x = -width/2;
house.add(win3);
const win4 = win2.clone();
win4.position.x = -width/2;
house.add(win4);
const win5 = new THREE.Mesh(windowGeo, windowMat);
win5.rotation.z = Math.PI/2;
win5.position.z = len/2;
win5.position.y = height/2;
house.add(win5);


//* Render loop
const controls = new THREE.TrackballControls( camera, canvas );
controls.rotateSpeed = 2;

function render() {
    requestAnimationFrame(render);

    controls.update();
    renderer.render(scene, camera);
}

render();
