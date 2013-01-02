var mocha = require('mocha');
var assert = require('chai').assert;

var Cryo = require('../lib/cryo');

describe('String', function() {

  before(function() {
    this.original = [
      "This is my simple string. Isn't it beautiful!?",
      "Here is a mustache: {{"
    ].join('\n');
    this.stringified = Cryo.stringify(this.original);
  });

  it('should hydrate a simple string', function() {
    var hydrated = Cryo.parse(this.stringified);
    assert.strictEqual(hydrated, this.original);
  });
});