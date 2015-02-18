import Ember from "ember";
import Cube from "funny-animations/three-dimensions/animated-svg/cube";

var AnimatedSvg = Ember.Component.extend({
  tagName:   'svg',
  container: null,
  width:     1000,
  height:    600,
  camera:    mat4.create(),
  cube:      null,

  didInsertElement: function () {
    d3.timer(this.update.bind(this));
    this.container = d3.select(this.element).append('g');
    this.cube = Cube.create({x: 0.5, y: 0.5, z: 0.5, length: 0.3});
  },

  update: function() {
    this.cube.transform(this.camera);
  }
});

export default AnimatedSvg;