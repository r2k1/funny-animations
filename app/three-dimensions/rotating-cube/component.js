import Ember from "ember";
import CubeFactory from "funny-animations/models/cube-factory";

var RotatingCube = Ember.Component.extend({
  tagName:   'svg',
  container: null,
  width:     1000,
  height:    600,
  camera:    mat4.create(),
  cube:      null,

  didInsertElement: function () {
    this.container = d3.select(this.element)
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g');
    this.set('cube', CubeFactory.create().build({
      vector:    vec4.fromValues(150, 150, 150, 100),
      container: this.container,
      camera:    this.get('camera')
    }));
    setInterval(this.update.bind(this), 1);
  },

  update: function() {
    mat4.rotateX(this.camera, this.camera, 0.005);
    mat4.rotateY(this.camera, this.camera, 0.01);
    this.cube.renderTo(this.camera);
  }
});

export default RotatingCube;
