describe('Cryo - Browser', function() {

  it('should be able to hydrate itself', function() {
    var stringified = Cryo.stringify(Cryo);
    var hydrated = Cryo.parse(stringified);

    assert.isFunction(hydrated.parse);
    assert.isFunction(hydrated.stringify);
  });

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

  it('should ignore DOM references in objects', function() {
    var ref = document.getElementById('ref-test');
    var test = {
      domRef: ref,
      otherData: 'Hello'
    };

    var stringified = Cryo.stringify(test);
    var hydrated = Cryo.parse(stringified);

    assert.ok(ref);
    assert.strictEqual(hydrated.otherData, test.otherData);
  });

  it('should ignore DOM references in arrays', function() {
    var ref = document.getElementById('ref-test');
    var test = [ref, ref, 3, ref];

    var stringified = Cryo.stringify(test);
    var hydrated = Cryo.parse(stringified);

    assert.ok(ref);
    assert.isArray(hydrated);
    assert.strictEqual(hydrated.length, 3);
    assert.strictEqual(hydrated[2], 3);
    assert.isUndefined(hydrated.ref);
  });

  it('should ignore DOM references on dates', function() {
    var ref = document.getElementById('ref-test');
    var original = new Date();
    original.attached = 'some property';
    original.ref = ref;

    var stringified = Cryo.stringify(original);
    var hydrated = Cryo.parse(stringified);

    assert.typeOf(hydrated, 'date');
    assert.strictEqual(hydrated.getTime(), original.getTime());
    assert.strictEqual(hydrated.attached, original.attached);
    assert.isUndefined(hydrated.ref);
  });

  it('should ignore a direct DOM reference', function() {
    var test = document.getElementById('ref-test');

    var stringified = Cryo.stringify(test);
    var hydrated = Cryo.parse(stringified);

    assert.ok(test);
    assert.isUndefined(hydrated);
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
});