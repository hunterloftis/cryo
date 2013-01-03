# Cryo

Easily freeze and re-hydrate complex JavaScript objects.

Built for node.js and browsers. Cryo is inspired by Python's Pickle, extending JSON to handle:

- [Functions](https://github.com/hunterloftis/cryo/blob/master/test/function.test.js)
- [Undefined](https://github.com/hunterloftis/cryo/blob/master/test/null.test.js)
- [Dates](https://github.com/hunterloftis/cryo/blob/master/test/date.test.js)
- [Nested references](https://github.com/hunterloftis/cryo/blob/master/test/complex.test.js)
- [Infinity](https://github.com/hunterloftis/cryo/blob/master/test/number.test.js)

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

## Tests

Tests require node.js.

```
$ git clone git://github.com/hunterloftis/cryo.git
$ cd cryo
$ make setup
$ make test
```