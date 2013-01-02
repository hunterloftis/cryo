var Cryo = require('../lib/cryo');

var obj = {
  name: 'Hunter',
  hello: function() {
    console.log(this.name + ' says hello!');
  }
};

var frozen = Cryo.stringify(obj);
var hydrated = Cryo.parse(frozen);

hydrated.hello(); // Hunter says hello!