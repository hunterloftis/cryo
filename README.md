# Cryo

Easily serialize and deserialize JavaScript objects.

Built for node.js and browsers. Cryo is inspired by Python's pickle and works similarly to JSON.stringify() and JSON.parse().
Cryo.stringify() and Cryo.parse() improve on JSON in these circumstances:

- [Undefined](#undefined)
- [Date](#date)
- [Infinity](#infinity)
- [Object references](#references)
- [Attached properties](#properties)
- [Functions](#functions)

## Installation

### node.js

```
$ npm install cryo
```

### browser

Add the [latest minified build](https://github.com/hunterloftis/cryo/tree/master/build) to your project as a script:

```html
<script type='text/javascript' src='cryo-0.0.3.min.js'></script>
```

## Example

```js
var Cryo = require('cryo');

var obj = {
  name: 'Hunter',
  created: new Date(),
  hello: function() {
    console.log(this.name + ' said hello in ' + this.created.getFullYear() + '!');
  }
};

var frozen = Cryo.stringify(obj);
var hydrated = Cryo.parse(frozen);

hydrated.hello(); // Hunter says hello in 2013!
```

## More powerful JSON

### Undefined

Cryo takes a verbatim snapshot of all your properties, including those that are `undefined` - which JSON ignores.

```js
var Cryo = require('../lib/cryo');

var obj = {
  defaultValue: undefined
};

var withJSON = JSON.parse(JSON.stringify(obj));
console.log(withJSON.hasOwnProperty('defaultValue'));   // false

var withCryo = Cryo.parse(Cryo.stringify(obj));
console.log(withCryo.hasOwnProperty('defaultValue'));   // true
```

### Date

Cryo successfully works with `Date` objects, which `JSON.stringify()` mangles into strings.

```js
var Cryo = require('../lib/cryo');

var now = new Date();

var withJSON = JSON.parse(JSON.stringify(now));
console.log(withJSON instanceof Date);              // false

var withCryo = Cryo.parse(Cryo.stringify(now));
console.log(withCryo instanceof Date);              // true
```

### References

`JSON.stringify()` makes multiple copies of single objects, losing object relationships.
When several references to the same object are stringified with JSON, those references are turned into clones of each other.
Cryo maintains object references so the restored objects are identical to the originals.
This is easier to understand with an example:

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

### Infinity

Cryo successfully stringifies and parses `Infinity`, which JSON mangles into `null`.

```js
var Cryo = require('../lib/cryo');

var number = Infinity;

var withJSON = JSON.parse(JSON.stringify(number));
console.log(withJSON === Infinity);                 // false

var withCryo = Cryo.parse(Cryo.stringify(number));
console.log(withCryo === Infinity);                 // true
```

### Properties

Objects, Arrays, Dates, and Functions can all hold properties, but JSON will only stringify properties on Objects.
Cryo will recover properties from all containers:

```js
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
```

### Functions

Cryo will stringify functions, which JSON ignores.

**Note:** Usually, if you've come up with a solution that needs to serialize functions, a better solution exists that doesn't.
However, sometimes this can be enormously useful.
Cryo will make faithful hydrated functions and objects with properties that are functions.

```js
var Cryo = require('../lib/cryo');

function fn() {}

try {
  var withJSON = JSON.parse(JSON.stringify(fn));
  console.log(typeof withJSON === 'function');
} catch(e) {
  console.log('error');                             // error
}

var withCryo = Cryo.parse(Cryo.stringify(fn));
console.log(typeof withCryo === 'function');        // true
```

## Tests

Tests require node.js.

```
$ git clone git://github.com/hunterloftis/cryo.git
$ cd cryo
$ make setup
$ make test
```