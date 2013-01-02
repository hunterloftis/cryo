var mocha = require('mocha');
var assert = require('chai').assert;

var Cryo = require('../lib/cryo');

describe('Object', function() {

  it('should hydrate an empty object', function() {
    var original = {};
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });

  it('should hydrate an object with a string property', function() {
    var original = {
      myString: 'my string'
    };
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });

  it('should hydrate an object with a number property', function() {
    var original = {
      myNum: -128
    };
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });

  it('should hydrate an object with a boolean property', function() {
    var original = {
      myBool: false
    };
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });

  it('should hydrate an object with an array property', function() {
    var original = {
      myArray: ['a', 2, 3, 'd', false, true]
    };
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });

  it('should hydrate an object with an null property', function() {
    var original = {
      myNull: null
    };
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });

  it('should hydrate an object with an undefined property', function() {
    var original = {
      myUndefined: undefined
    };
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });

  it('should hydrate an object with several native types', function() {
    var original = {
      myString: 'my string',
      myNum: 128,
      myArray: ['a', 2, 3, 'd', false, true],
      myBool: false,
      myNull: null,
      myUndefined: undefined
    };
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });

  it('should hydrate an object with nested objects', function() {
    var original = {
      first: {
        second: {
          myString: 'my string',
          myNum: 128,
          myArray: ['a', 2, 3, 'd', false, true],
          myBool: false,
          myNull: null,
          myUndefined: undefined
        },
        secondSibling: [1, 2, 3],
        thirdSibling: undefined
      },
      firstSibling: 'hello'
    };
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });
});