var mocha = require('mocha');
var assert = require('chai').assert;

var Cryo = require('../lib/cryo');

describe('Number', function() {

  it('should hydrate a simple number', function() {
    var original = 123;
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });

  it('should hydrate zero', function() {
    var original = 0;
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });

  it('should hydrate Infinity', function() {
    var original = Infinity;
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });

  it('should hydrate a negative number', function() {
    var original = -999;
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });

  it('should hydrate a decimal', function() {
    var original = 333/444 + 0.00005;
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });

});