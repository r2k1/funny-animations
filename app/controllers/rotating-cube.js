import Ember from "ember";

var RotatingCubeController = Ember.Controller.extend({
  camera: mat4.create(),
  isShowCamera: false,

  init: function() {
    setInterval(this.rotateCamera.bind(this), 1);
  },

  rotateCamera: function() {
    var newCamera = mat4.create();
    mat4.rotateX(newCamera, this.get('camera'), 0.005);
    mat4.rotateY(newCamera, newCamera, 0.01);
  // reassign new value to camera to fire observers
    this.set('camera', newCamera);
  },

  actions: {
    toggleIsShowCamera: function() {
      this.toggleProperty('isShowCamera');
    }
  }
});

export default RotatingCubeController;
