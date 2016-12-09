var mocha = require('mocha');
var assert = require('chai').assert;

var Cryo = require('../lib/cryo');

describe('Function', function() {

  it('should hydrate a function', function() {
    var original = function(from, to) {
      return 'hello world from ' + from + ' to ' + to;
    };
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    var result1 = original('Hunter', 'you');
    var result2 = hydrated('Hunter', 'you');
    assert.deepEqual(result1, result2);
  });

  it('should hydrate a function that has properties', function() {
    var original = function(from, to) {
      return 'hello world from ' + from + ' to ' + to;
    };
    original.attached = 'some property';
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    var result1 = original('Hunter', 'you');
    var result2 = hydrated('Hunter', 'you');
    assert.deepEqual(result1, result2);
    assert.strictEqual(hydrated.attached, original.attached);
  });

  it('can hydrate a minified function body', function() {
    var original = function(val) {return String(val)};
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    var result1 = original('Hunter');
    var result2 = hydrated('Hunter');
    assert.deepEqual(result1, result2);
  });

});