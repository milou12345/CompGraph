/**
 * calculate specular reflection
 * @param {Vector3} vin incoming vector
 * @param {Vector3} n normal vector
 * @returns {Vector3} outgoing vector
 */
function specRef(vin, n) {
  "use strict";
  const n2 = n.clone();
  n2.normalize();
  let ret = vin.clone();
  const f = 2 * n2.dot(vin);
  ret.sub(n2.multiplyScalar(f));
  return ret;
}





















const n = new THREE.Vector3(1,2,0);
const vin = new THREE.Vector3(1,0,0);
const vout = specRef(vin, n);
