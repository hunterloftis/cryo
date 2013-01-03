# Cryo

Easily store/serialize/pickle and re-hydrate complex JavaScript objects, including:
- [Functions](https://github.com/hunterloftis/cryo/blob/master/test/function.test.js)
- [Undefined](https://github.com/hunterloftis/cryo/blob/master/test/null.test.js)
- [Dates](https://github.com/hunterloftis/cryo/blob/master/test/date.test.js)
- [Nested references](https://github.com/hunterloftis/cryo/blob/master/test/complex.test.js)
- [Infinity](https://github.com/hunterloftis/cryo/blob/master/test/number.test.js)

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

Tests require node.js.

```
$ git clone git://github.com/hunterloftis/cryo.git
$ cd cryo
$ make setup
$ make test
```