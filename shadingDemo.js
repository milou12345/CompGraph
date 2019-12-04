// Initialize webGL
const canvas = document.getElementById("mycanvas");
const renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true});
renderer.context.getShaderInfoLog = function () { return '';};
renderer.setClearColor('white');    // set background color

// Create a new Three.js scene with camera and light
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, canvas.width / canvas.height, 0.1, 70 );
camera.position.set(0,0,2.5);
camera.lookAt(scene.position);   // camera looks at origin
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const spotLight = new THREE.SpotLight(0xffffff);

scene.add(spotLight);


const mat = new THREE.MeshPhongMaterial({color: 'blue',
                                         specular:'green',
                                         shininess:5,
                                         flatShading:false,
                                         wireframe:false} );

// Create sphere
const sphereGeo = new THREE.SphereGeometry( 0.5, 8,8);
// sphereGeo.computeFlatVertexNormals();

const sphere = new THREE.Mesh(sphereGeo, mat);
scene.add(sphere);

// sphere.add(new THREE.FaceNormalsHelper( sphere, 0.1, 0xff0000, 2 ));
// sphere.add(new THREE.VertexNormalsHelper( sphere, 0.1, 0x00ff00, 2 ));
// sphere.geometry.faces.forEach(f => {
//   const n = new THREE.Vector3(-1 + 2 * Math.random(),-1 + 2 * Math.random(),-1 + 2 * Math.random());
//   f.vertexNormals.forEach(vn => vn.copy(n));
// });


// sphere.geometry.faces.forEach(f => f.vertexNormals.forEach(vn => {
//   vn.x *= Math.random();
//   vn.y *= Math.random();
//   vn.z *= Math.random();
//   vn.normalize();
// }));


sphere.geometry.elementsNeedUpdate = true;
sphere.geometry.normalsNeedUpdate = true;

// Draw everything
const controls = new THREE.TrackballControls( camera, canvas );
function render() {
  requestAnimationFrame(render);
  spotLight.position.copy(camera.position);

  controls.update();
  renderer.render(scene, camera);
}
render();
