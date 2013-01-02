/**
 * JSON + Object references wrapper
 *
 * @author Hunter Loftis <hunter@skookum.com>
 * @license The MIT license.
 * @copyright Copyright (c) 2010 Skookum, skookum.com
 */

;(function() {

  function parse(json) {
    var jsref = JSON.parse(json);
    var jsref_objects = jsref.objects;

    function dereference(item) {
      if (typeof(item) === "string") {
        if (item.slice(0, 15) === "_jsref_objects[") {
          var ref_index = item.slice(15, -1);
          return jsref_objects[ref_index];
        }
      }
      return item;
    }

    var i = jsref_objects.length;
    while (i--) {
      var obj = jsref_objects[i];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj[key] = dereference(obj[key]);
        }
      }
    }

    return dereference(jsref.root);
  }

  function stringify(object) {
    var jsref_objects = [];

    function store_objects(object) {
      if (typeof(object) === "object") {
        var jsref_index = jsref_objects.indexOf(object);
        if (jsref_objects.indexOf(object) === -1) {      // Obj hasn't been referenced before, so we need to store it
          jsref_objects.push(object);
        }
        // Save all the properties of this object recursively
        for (var key in object) {
          if (object.hasOwnProperty(key)) {
            store_objects(object[key]);
          }
        }
      }
    }
    store_objects(object);

    function reference(item) {
      return (typeof(item) === "object") ? "_jsref_objects[" + jsref_objects.indexOf(item) + "]" : item;
    }

    // Clone each object in jsref_objects, replacing any object-type key with a reference to that object's index
    // store the cloned "flat" reference objects in jsref_objects_reference
    var jsref_objects_reference = new Array(jsref_objects.length),
        i = jsref_objects.length;
    while(i--) {
      var obj = jsref_objects[i];
      var obj_clone = (obj instanceof Array) ? [] : {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj_clone[key] = reference(obj[key]);
        }
      }
      jsref_objects_reference[i] = obj_clone;
    }

    return JSON.stringify({
      root: reference(object),
      objects: jsref_objects_reference
    });
  }

  // Exported object
  Cryo = {
    stringify: stringify,
    parse: parse
  };

  // global on server, window in browser
  var root = this;

  // AMD / RequireJS
  if (typeof define !== 'undefined' && define.amd) {
    define('Cryo', [], function () {
      return Cryo;
    });
  }

  // node.js
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Cryo;
  }

  // included directly via <script> tag
  else {
    root.Cryo = Cryo;
  }

})();

/*
var stuff = {whatever: "Goes here"};
var other_stuff = {pointer_to: stuff};
var test_object = {
  objects: stuff,
  references: other_stuff,
  array: [0, 1, 2, other_stuff, 4],
  func: function() {
    console.log("What happens with a function?");
  }
};

console.log("\noriginal object:");
console.dir(test_object);

console.log("\nJSON.stringified:");
console.log(JSON.stringify(test_object));

var str = Cryo.stringify(test_object);

console.log("\nCryo.stringified:");
console.log(str);

var parsed = Cryo.parse(str);

console.log("\nCryo.parse re-created object:");
console.dir(parsed);
*/