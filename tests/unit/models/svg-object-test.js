import { test, moduleFor } from 'ember-qunit';
import SVGObject from 'funny-animations/models/svg-object';

module('SVGObject', {
  setup: function() {
    SVGObject.reopen({
      camera: mat4.create(),
      createElement: undefined,
      edges: [[[-0.5, -0.5, -0.5], [0.5, -0.5, -0.5]]]
    });
  }
});

test('linesData', function() {
  var object = SVGObject.create({vector: [0, 0, 0, 1]});
  ok(object.linesData().length === 1);
  deepEqual(object.linesData()[0][0], vec3.fromValues(-0.5, -0.5, -0.5));
  deepEqual(object.linesData()[0][1], vec3.fromValues(0.5, -0.5, -0.5));
});

test('linesData with scale', function() {
  var object = SVGObject.create({vector: [0, 0, 0, 20]});
  deepEqual(object.linesData()[0][0], vec3.fromValues(-10, -10, -10));
  deepEqual(object.linesData()[0][1], vec3.fromValues(10, -10, -10));
});

test('linesData with translate', function() {
  var object = SVGObject.create({vector: [20, 20, 20, 1]});
  deepEqual(object.linesData()[0][0], vec3.fromValues(19.5, 19.5, 19.5));
  deepEqual(object.linesData()[0][1], vec3.fromValues(20.5, 19.5, 19.5));
});

test('linesData with scale translate', function() {
  var object = SVGObject.create({vector: [20, 20, 20, 20]});
  deepEqual(object.linesData()[0][0], vec3.fromValues(10, 10, 10));
  deepEqual(object.linesData()[0][1], vec3.fromValues(30, 10, 10));
});

test('pathString', function() {
  var object = SVGObject.create({linesData: function() {
    return [
      [[10, 10, 10], [20, 20, 20]],
      [[30, 30, 30], [40, 40, 40]]
    ];
  }});
  equal(object.pathString(), 'M10,10L20,20M30,30L40,40');
});
