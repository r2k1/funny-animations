import { test, moduleFor } from 'ember-qunit';
import Cube from 'funny-animations/models/cube';

module('Cube', {
  setup: function() {
    Cube.reopen({
      createElement: undefined,
      updateElement: undefined,
      camera: mat4.create()
    });
  }
});

test('linesData', function() {
  var cube = Cube.create({vector: [0, 0, 0, 1]});
  ok(cube.get('linesData.length') === 12);
  deepEqual(cube.get('linesData')[0][0], vec3.fromValues(-0.5, -0.5, -0.5));
  deepEqual(cube.get('linesData')[0][1], vec3.fromValues(0.5, -0.5, -0.5));
});

test('linesData with scale', function() {
  var cube = Cube.create({vector: [0, 0, 0, 20]});
  deepEqual(cube.get('linesData')[0][0], vec3.fromValues(-10, -10, -10));
  deepEqual(cube.get('linesData')[0][1], vec3.fromValues(10, -10, -10));
});

test('linesData with translate', function() {
  var cube = Cube.create({vector: [20, 20, 20, 1]});
  deepEqual(cube.get('linesData')[0][0], vec3.fromValues(19.5, 19.5, 19.5));
  deepEqual(cube.get('linesData')[0][1], vec3.fromValues(20.5, 19.5, 19.5));
});

test('linesData with scale translate', function() {
  var cube = Cube.create({vector: [20, 20, 20, 20]});
  deepEqual(cube.get('linesData')[0][0], vec3.fromValues(10, 10, 10));
  deepEqual(cube.get('linesData')[0][1], vec3.fromValues(30, 10, 10));
});

test('cubePathString', function() {
  var cube = Cube.create({linesData: [
    [[10, 10, 10], [20, 20, 20]],
    [[30, 30, 30], [40, 40, 40]]
  ]});
  equal(cube.get('cubePathString'), 'M10,10L20,20M30,30L40,40');
});
