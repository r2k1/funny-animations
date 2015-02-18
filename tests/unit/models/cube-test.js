import { test, moduleFor } from 'ember-qunit';
import Cube from 'funny-animations/models/cube';

module('Cube');

test('lines', function() {
  var cube = Cube.create({vector: [0, 0, 0, 1]});
  ok(cube.get('lines.length') === 12);
  deepEqual(cube.get('lines')[0][0], vec3.fromValues(-0.5, -0.5, -0.5));
  deepEqual(cube.get('lines')[0][1], vec3.fromValues(0.5, -0.5, -0.5));
});

test('lines with scale', function() {
  var cube = Cube.create({vector: [0, 0, 0, 20]});
  deepEqual(cube.get('lines')[0][0], vec3.fromValues(-10, -10, -10));
  deepEqual(cube.get('lines')[0][1], vec3.fromValues(10, -10, -10));
});

test('lines with translate', function() {
  var cube = Cube.create({vector: [20, 20, 20, 1]});
  deepEqual(cube.get('lines')[0][0], vec3.fromValues(19.5, 19.5, 19.5));
  deepEqual(cube.get('lines')[0][1], vec3.fromValues(20.5, 19.5, 19.5));
});

test('lines with scale translate', function() {
  var cube = Cube.create({vector: [20, 20, 20, 20]});
  deepEqual(cube.get('lines')[0][0], vec3.fromValues(10, 10, 10));
  deepEqual(cube.get('lines')[0][1], vec3.fromValues(30, 10, 10));
});