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
      if (typeof item  === 'string') {
        if (item.slice(0, 15) === "_jsref_objects[") {
          var ref_index = item.slice(15, -1);
          return jsref_objects[ref_index];
        }
        if (item.slice(0, 15) === '_jsref_infinity') {
          return Infinity;
        }
        if (item.slice(0, 16) === '_jsref_undefined') {
          return undefined;
        }
        if (item.slice(0, 15) === '_jsref_function') {
          var fn = item.slice(16);
          var argStart = fn.indexOf('(') + 1;
          var argEnd = fn.indexOf(')', argStart);
          var args = fn.slice(argStart, argEnd);
          var bodyStart = fn.indexOf('{') + 1;
          var bodyEnd = fn.lastIndexOf('}') - 1;
          var body = fn.slice(bodyStart, bodyEnd);
          return new Function(args, body);
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

    store_objects(object);

    // Clone each object in jsref_objects, replacing any object-type key with a reference to that object's index
    // store the cloned "flat" reference objects in jsref_objects_reference
    var jsref_objects_reference = new Array(jsref_objects.length),
        i = jsref_objects.length;

    while(i--) {
      var isTheOne = false;
      var obj = jsref_objects[i];
      var obj_clone = (obj instanceof Array) ? [] : {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'undefined') obj_clone[key] = '_jsref_undefined';
          else obj_clone[key] = reference(obj[key]);
        }
      }
      jsref_objects_reference[i] = obj_clone;
    }

    return JSON.stringify({
      root: reference(object),
      objects: jsref_objects_reference
    });

    function store_objects(object) {
      if (typeof object === 'object') {
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

    function reference(item) {
      if (typeof item === "object") {
        if (item === null) return null;
        return "_jsref_objects[" + jsref_objects.indexOf(item) + "]";
      }
      if (item === Infinity) return '_jsref_infinity';
      if (typeof item === 'function') {
        return '_jsref_function' + item.toString();
      }
      return item;
    }
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
