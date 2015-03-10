import { test, moduleFor } from 'ember-qunit';
import Shape from 'funny-animations/models/shape';

module('Shape', {
  setup: function() {
    Shape.reopen({
      camera: mat4.create(),
      createElement: undefined,
      edges: [[[-0.5, -0.5, -0.5], [0.5, -0.5, -0.5]]]
    });
  }
});

test('lines', function() {
  var object = Shape.create({vector: [0, 0, 0, 1]});
  ok(object.lines().length === 1);
  deepEqual(object.lines()[0][0], vec3.fromValues(-0.5, -0.5, -0.5));
  deepEqual(object.lines()[0][1], vec3.fromValues(0.5, -0.5, -0.5));
});

test('lines with scale', function() {
  var object = Shape.create({vector: [0, 0, 0, 20]});
  deepEqual(object.lines()[0][0], vec3.fromValues(-10, -10, -10));
  deepEqual(object.lines()[0][1], vec3.fromValues(10, -10, -10));
});

test('lines with translate', function() {
  var object = Shape.create({vector: [20, 20, 20, 1]});
  deepEqual(object.lines()[0][0], vec3.fromValues(19.5, 19.5, 19.5));
  deepEqual(object.lines()[0][1], vec3.fromValues(20.5, 19.5, 19.5));
});

test('lines with scale translate', function() {
  var object = Shape.create({vector: [20, 20, 20, 20]});
  deepEqual(object.lines()[0][0], vec3.fromValues(10, 10, 10));
  deepEqual(object.lines()[0][1], vec3.fromValues(30, 10, 10));
});
