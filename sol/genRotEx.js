// Exercise about generalized rotations, slide 84, chapter 3.
const ax = new THREE.Vector3(0,0,1);
const theta = Math.PI/4;
const pivot = new THREE.Vector3(3,1,0);
const m = new THREE.Matrix4();
m.makeRotationAxis(ax, theta);
const prp = pivot.clone().sub(pivot.clone().applyMatrix4(m));
m.setPosition(prp);


const p = new THREE.Vector3(4,1,0);
p.applyMatrix4(m);
