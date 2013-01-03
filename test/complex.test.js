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

  it('should dereference objects that were originally the same into a single hydrated object', function() {
    var user = [{ name: 'Hunter' }, { name: 'Abe' }, { name: 'Bob' }];
    var state = {
      sortedUsers: [user[1], user[0], user[2]], // Abe, Hunter, Bob
      activeUser: user[1] // Abe
    };
    var stringified = Cryo.stringify(state);
    var hydrated = Cryo.parse(stringified);

    assert.deepEqual(hydrated, state);
    assert.strictEqual(hydrated.activeUser, hydrated.sortedUsers[0]);
  });

  it('should be able to hydrate itself', function() {
    var stringified = Cryo.stringify(Cryo);
    var hydrated = Cryo.parse(stringified);

    assert.isFunction(hydrated.parse);
    assert.isFunction(hydrated.stringify);
  });
});