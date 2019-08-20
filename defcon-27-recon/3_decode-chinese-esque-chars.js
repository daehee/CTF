// Base65536 is a binary encoding optimised for UTF-32-encoded text
const base65536 = require('base65536');

// Weird character string from .bin file
const crypticString = "ꍦ鱡𠄺荵顉餰鐳奩顟畒蹺𒅟桩驃葟鑦桴襸ᕽ";

// Decodes a Base65536 String and
// returns a uint8 ArrayBuffer containing the original binary data.
const decodedToUint8 = base65536.decode(crypticString);

// Feed Uint8 array buffer into Unit8Array object:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
const uint8Array = new Uint8Array(decodedToUint8);

// Uint8Array is a typed array that represents an array of 8-bit unsigned integers
// new Uint8Array(buffer [, byteOffset [, length]])
const decodeUint8Arr = (array) => {
  // TextDecoder generates a code point stream with "utf-8" specified in parameters.
  return new TextDecoder("utf-8").decode(array);
}

const decodedString = decodeUint8Arr(uint8Array);

console.log(decodedString);
// Output: flag:{uNIc0d3_i$_cR@zY_pi3Ce_Of_t3xT}