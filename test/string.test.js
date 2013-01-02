var mocha = require('mocha');
var assert = require('chai').assert;

var Cryo = require('../lib/cryo');

describe('String', function() {

  it('should hydrate a simple string', function() {
    var original = [
      "This is my simple string. Isn't it beautiful!?",
      "Here is a mustache: {{"
    ].join('\n');
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });

  it('should hydrate an empty string', function() {
    var original = '';
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, original);
  });

});