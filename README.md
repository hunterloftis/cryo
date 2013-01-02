# Cryo

Easily store/serialize/pickle and re-hydrate complex JavaScript objects (including Functions)

Something like extended JSON or limited Pickle.

## Installation

```
$ npm install cryo
```

## Example

```js
var Cryo = require('cryo');

var obj = {
  name: 'Hunter',
  hello: function() {
    console.log(this.name + ' says hello!');
  }
};

var frozen = Cryo.stringify(obj);
var hydrated = Cryo.parse(frozen);

hydrated.hello(); // Hunter says hello!
```

## Tests

```
$ git clone git://github.com/hunterloftis/cryo.git
$ cd cryo
$ make setup
$ make test
```