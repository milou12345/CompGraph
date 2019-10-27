// Euler Excercise on slide 58 (chapter 3)
const a = Math.PI/2;
const eu = new THREE.Euler(a,a,0,"YXZ");
const m = new THREE.Matrix4();
m.makeRotationFromEuler(eu);
const v = new THREE.Vector3(0,0,1).applyMatrix4(m);


// Axis-Angle-Representation: Exercise on slide 69 (chapter 3)
const theta = Math.PI/180 * 45;
const ax = new THREE.Vector3(1,1,1);
ax.normalize();
const mat = new THREE.Matrix4();
mat.makeRotationAxis(ax, theta);
//printMat(mat);

const v1 = new THREE.Vector3(1,-1,0);
v1.applyMatrix4(mat);
const v2 = new THREE.Vector3(2,2,2);
v2.applyMatrix4(mat);
