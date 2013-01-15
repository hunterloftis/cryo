# Cryo

JSON on steroids.

Built for node.js and browsers. Cryo is inspired by Python's pickle and works similarly to JSON.stringify() and JSON.parse().
Cryo.stringify() and Cryo.parse() improve on JSON in these circumstances:

- [Undefined](#undefined)
- [Date](#date)
- [Infinity](#infinity)
- [Object references](#references)
- [Attached properties](#properties)
- [Functions](#functions)
- [DOM Nodes](#dom)

## Installation

### node.js

```
$ npm install cryo
```

### browser

Add the [latest minified build](https://github.com/hunterloftis/cryo/tree/master/build) to your project as a script:

```html
<script type='text/javascript' src='cryo-0.0.4.js'></script>
```

## Use

Cryo has a very simple API that mimicks JSON:

- `Cryo.stringify(item)`
- `Cryo.parse(string)`

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

hydrated.hello(); // Hunter said hello in 2013!
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

function fn() {
  console.log('Hello, world!');
}

try {
  var withJSON = JSON.parse(JSON.stringify(fn));
  withJSON();
} catch(e) {
  console.log('error');                             // error
}

var withCryo = Cryo.parse(Cryo.stringify(fn));
withCryo();                                         // Hello, world!
```

### DOM

JSON chokes when you try to stringify an object with a reference to a DOM node, giving `Uncaught TypeError: Converting circular structure to JSON.`
Cryo will ignore DOM nodes so you can serialize such objects without hassle.

```js
var obj = {
  button: document.getElementById('my-button');
  message: 'Hello'
};

try {
  var withJSON = JSON.parse(JSON.stringify(obj));
  console.log(withJSON.message === 'Hello');
} catch(e) {
  console.log('error');                             // error
}

var withCryo = Cryo.parse(Cryo.stringify(obj));
console.log(withCryo.message === 'Hello');          // true
```

## Stringified Output

`Cryo.stringify()` returns valid JSON data with non-compatible types encoded as strings.
Thus, anything you can do with JSON, you can do with Cryo.

Here is the stringified result from the hello, world example:

```json
{
  "root":"_CRYO_REF_2",
  "references":[
    {
      "contents": {},
      "value":"_CRYO_DATE_1358245390835"
    },
    {
      "contents": {},
      "value":"_CRYO_FUNCTION_function () {\n    console.log(this.name + ' said hello in ' + this.created.getFullYear() + '!');\n  }"
    },
    {
      "contents":{
        "name":"Hunter",
        "created":"_CRYO_REF_0",
        "hello":"_CRYO_REF_1"
      },
      "value":"_CRYO_OBJECT_"
    }
  ]
}
```

## Tests

Tests require node.js.

```
$ git clone git://github.com/hunterloftis/cryo.git
$ cd cryo
$ make setup
$ make test
```
