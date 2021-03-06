var Cryo = require('../lib/cryo');

var obj = {
  name: 'Hunter',
  created: new Date(),
  hello: function() {
    console.log(this.name + ' said hello in ' + this.created.getFullYear() + '!');
  }
};

var frozen = Cryo.stringify(obj);

console.log("Stringified cryo objects look like this:\n\n");
console.log(frozen);