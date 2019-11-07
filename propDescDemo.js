// Demo of property descriptors

"use strict";

const someObj = {
  x: 2,
  s: 'abc'
};


const propDesc = {
  value:17,
  writable: false, // false=default
  configurable: false, // false=default
  enumerable: false // false=default
};

Object.defineProperty(someObj, 'y', propDesc);
// someObj.y = 18;  // error

const xDesc = Object.getOwnPropertyDescriptor(someObj, 'x');
