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


// Generalized rotation exercise on slide 84 (chapter 3)
const axis84 = new THREE.Vector3(0,0,1);
const theta84 = Math.PI/4;
const pivot84 = new THREE.Vector3(3,1,0);
const mat84 = new THREE.Matrix4();
mat84.makeRotationAxis(axis84, theta84);
const rp = pivot84.clone().applyMatrix4(mat84);
const prp = pivot84.clone().sub(rp);
mat84.setPosition(prp);

const p = new THREE.Vector3(4,1,0);
p.applyMatrix4(mat84);
