var Cryo = require('../lib/cryo');

function first() {}
first.second = new Date();
first.second.third = [1, 2, 3];
first.second.third.fourth = { name: 'Hunter' };

try {
  var withJSON = JSON.parse(JSON.stringify(first));
  console.log(withJSON.second.third.fourth.name === 'Hunter');
} catch(e) {
  console.log('error');                                       // error
}

var withCryo = Cryo.parse(Cryo.stringify(first));
console.log(withCryo.second.third.fourth.name === 'Hunter');  // true
