var mocha = require('mocha');
var assert = require('chai').assert;

var Cryo = require('../lib/cryo');

describe('Complex', function() {

  it('should hydrate several objects referring to each other', function() {
    var user1 = {
      name: 'Hunter',
      destroy: function() {
        return 'destroyed ' + this.name;
      }
    };
    var user2 = {
      name: 'Jim'
    };
    var project = {
      maintainers: [user1, user2],
      title: 'Cryo'
    };
    var test = {
      subject: project,
      passing: true,
      hooks: {
        subscribed_users: [user1]
      }
    };
    var stringified = Cryo.stringify(test);
    var hydrated = Cryo.parse(stringified);

    var result1 = test.hooks.subscribed_users[0].destroy();
    var result2 = hydrated.hooks.subscribed_users[0].destroy();

    hydrated.hooks.subscribed_users[0].name = 'Newname';
    var result3 = hydrated.hooks.subscribed_users[0].destroy();

    assert.strictEqual(result1, result2);
    assert.strictEqual(result3, 'destroyed Newname');
    assert.strictEqual(test.passing, hydrated.passing);
    assert.strictEqual(test.subject.title, hydrated.subject.title);
  });

  it('should dereference objects that were originall the same into the same after hydration', function() {
    var userList = [{ name: 'Abe' }, { name: 'Bob' }, { name: 'Carl' }];
    var state = {
      users: userList,
      activeUser: userList[1]
    };
    var stringified = Cryo.stringify(state);
    var hydrated = Cryo.parse(stringified);

    assert.strictEqual(hydrated.activeUser, hydrated.users[1]);
  });

  it('should be able to hydrate itself', function() {
    var stringified = Cryo.stringify(Cryo);
    var hydrated = Cryo.parse(stringified);

    assert.isFunction(hydrated.parse);
    assert.isFunction(hydrated.stringify);
  });

  it('should be able to use callbacks to hydrate objects with types', function() {
    function CustomType() {}
    var test = new CustomType();
    test.sub = [new CustomType()];

    var types = {
      'CustomType': CustomType
    };
    var stringified = Cryo.stringify(test, function(obj) {
      if (types[obj.constructor.name]) {
        obj.__class__ = obj.constructor.name;
      }
    });
    var hydrated = Cryo.parse(stringified, function(obj) {
      if (types[obj.__class__]) {
        obj.__proto__ = types[obj.__class__].prototype;
        delete obj.__class__;
      }
    });

    assert.strictEqual(hydrated.constructor.name, 'CustomType');
    assert.strictEqual(hydrated.sub[0].constructor.name, 'CustomType');
  });

  it('should hydrate object graphs with cycles', function() {
    function Cycle() {}

    var c1 = new Cycle();
    var c2 = new Cycle();

    c1.c = c2;
    c2.c = c1;

    var original = { c1: c1, c2: c2 };

    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    // A passing test is one that doesn't explode the stack.  No asserts necessary
  });
});