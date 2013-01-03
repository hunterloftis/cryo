var mocha = require('mocha');
var assert = require('chai').assert;

var Cryo = require('../lib/cryo');

describe('Date', function() {


  it('should hydrate a date', function() {
    var original = new Date();
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.typeOf(hydrated, 'date');
    assert.strictEqual(hydrated.getTime(), original.getTime());
  });

  it('should hydrate a date that has properties', function() {
    var original = new Date();
    original.attached = 'some property';
    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.typeOf(hydrated, 'date');
    assert.strictEqual(hydrated.getTime(), original.getTime());
    assert.strictEqual(hydrated.attached, original.attached);
  });


});