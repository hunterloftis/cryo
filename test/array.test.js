var mocha = require('mocha');
var assert = require('chai').assert;

var Cryo = require('../lib/cryo');

describe('Array', function() {

  it('should hydrate a one-dimensional array', function() {
    var original = [1, 2, 3, 'a', 'b', 'c'];
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });

  it('should hydrate a multi-dimensional array', function() {
    var original = [
      [ 0, 1, 2 ],
      [ 3, 4, 5 ],
      [ 'a', 'b', 'c' ]
    ];
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });

  it('should hydrate an array that has properties', function() {
    var original = [1, 2, 3];
    original.attached = 'some property';
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });

});