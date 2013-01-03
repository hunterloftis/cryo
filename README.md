# Cryo

Easily serialize and deserialize JavaScript objects.

Built for node.js and browsers. Cryo is inspired by Python's pickle and works similarly to JSON.stringify() and JSON.parse().
Cryo.stringify() and Cryo.parse() handle these additional circumstances:

- [Undefined](#undefined)
- [Date](#date)
- [Infinity](#infinity)
- [Object references](#references)
- [Functions](#functions)
- [Attached properties](#properties)

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

`JSON.stringify()` doesn't store undefined values.
This is frequently desired behavior, but Cryo's goal is to capture a verbatim snapshot of the target object.
Undefined keys are still keys that exist in a container, so Cryo restores them to undefined values in `parse()`.

- [Undefined tests](https://github.com/hunterloftis/cryo/blob/master/test/null.test.js)

### Date

`JSON.stringify()` converts Date objects to strings.
Cryo maintains Date objects so the parsed value is identical to the stringified value.

- [Date tests](https://github.com/hunterloftis/cryo/blob/master/test/date.test.js)

### References

JSON.stringify() replaces Object references with clones of data.
When several references to the same object are stringified, those references will becomes separate clones of the object's data on JSON.parse().
Cryo maintains object references so the restored objects are identical to the stringified objects.
For example:

```js
var Cryo = require('../lib/cryo');

var userList = [{ name: 'Abe' }, { name: 'Bob' }, { name: 'Carl' }];
var state = {
  users: userList,
  activeUser: userList[1]
};

var withJSON = JSON.parse(JSON.stringify(state));
console.log(withJSON.activeUser === withJSON.users[1]);   // false

var withCryo = Cryo.parse(Cryo.stringify(state));
console.log(withCryo.activeUser === withCryo.users[1]);   // true
```

- [Object reference tests](https://github.com/hunterloftis/cryo/blob/master/test/complex.test.js)

### Infinity

- [Infinity tests](https://github.com/hunterloftis/cryo/blob/master/test/number.test.js)

### Functions

- [Function tests](https://github.com/hunterloftis/cryo/blob/master/test/function.test.js)

### Properties



## Tests

Tests require node.js.

```
$ git clone git://github.com/hunterloftis/cryo.git
$ cd cryo
$ make setup
$ make test
```