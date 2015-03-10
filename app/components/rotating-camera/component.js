import Ember from "ember";
import Cube from 'funny-animations/models/cube';

export default Ember.Component.extend({
  camera: mat4.create(),
  shapes: [
    Cube.create({
      vector: vec4.fromValues(200, 200, 0, 100),
    }),
    Cube.create({
      vector: vec4.fromValues(100, 100, 0, 50),
    }),
    Cube.create({
      vector: vec4.fromValues(130, 140, 0, 30),
    }),
  ],

  _timer: null,

  startCameraRotating: function() {
    this._timer = setInterval(this.rotateCamera.bind(this), 1);
  }.on('didInsertElement'),

  stopCameraRotating: function() {
    clearInterval(this._timer);
  }.on('willDestroyElement'),

  rotateCamera: function() {
    var newCamera = mat4.create();
    mat4.rotateX(newCamera, this.get('camera'), 0.005);
    mat4.rotateY(newCamera, newCamera, 0.01);
  // reassign new value to camera to fire observers
    this.set('camera', newCamera);
  },
});