var mocha = require('mocha');
var assert = require('chai').assert;

var Cryo = require('../lib/cryo');

describe('Null and undefined', function() {

  it('should hydrate a null value', function() {
    var original = null;
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });

  it('should hydrate an undefined value', function() {
    var original;
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.isUndefined(original);
    assert.deepEqual(hydrated, original);
  });

});