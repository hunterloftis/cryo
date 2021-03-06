var Cryo = require('../lib/cryo');

var number = Infinity;

var withJSON = JSON.parse(JSON.stringify(number));
console.log(withJSON === Infinity);                 // false

var withCryo = Cryo.parse(Cryo.stringify(number));
console.log(withCryo === Infinity);                 // true
