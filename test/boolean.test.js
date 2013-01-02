var mocha = require('mocha');
var assert = require('chai').assert;

var Cryo = require('../lib/cryo');

describe('Boolean', function() {

  it('should hydrate a boolean true', function() {
    var original = true;
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });

  it('should hydrate a boolean false', function() {
    var original = false;
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });
});