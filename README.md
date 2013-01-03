# Cryo

Easily serialize and deserialize JavaScript objects.

Built for node.js and browsers. Cryo is inspired by Python's Pickle, and works similarly to JSON.stringify() and JSON.parse().
Cryo.stringify() and Cryo.parse() handle these additional circumstances:

- [Undefined](#undefined)
- [Date](#date)
- [Infinity](#infinity)
- [Object references](#references)
- [Functions](#functions)

## Installation

### node.js

```
$ npm install cryo
```

### browser

Add the [latest minified build](https://github.com/hunterloftis/cryo/tree/master/build) to your project as a script:

```html
<script type='text/javascript' src='cryo-0.0.2.min.js'></script>
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

## More powerful JSON

### Undefined

- [Undefined tests](https://github.com/hunterloftis/cryo/blob/master/test/null.test.js)

### Date

- [Date tests](https://github.com/hunterloftis/cryo/blob/master/test/date.test.js)

### References

- [Object reference tests](https://github.com/hunterloftis/cryo/blob/master/test/complex.test.js)

### Infinity

- [Infinity tests](https://github.com/hunterloftis/cryo/blob/master/test/number.test.js)

### Functions

- [Function tests](https://github.com/hunterloftis/cryo/blob/master/test/function.test.js)

## Tests

Tests require node.js.

```
$ git clone git://github.com/hunterloftis/cryo.git
$ cd cryo
$ make setup
$ make test
```