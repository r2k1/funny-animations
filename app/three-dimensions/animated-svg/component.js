import Ember from "ember";

var AnimatedSvg = Ember.Component.extend({
  tagName: 'svg',
  svg:     null,
  width:   1000,
  height:  600,
  camera:  mat4.create(),

  data: [vec3.fromValues(100, 0, 0), vec3.fromValues(0, 100, 0), vec3.fromValues(0, 0, 100)],

  didInsertElement: function () {
    mat4.translate(this.camera, this.camera, [200, 200, 200]);
    this.createPolygon();
    d3.timer(this.update.bind(this));
  },

  dataToView: function() {
    var camera = this.camera;
    return this.data.map(function(vector) {
      return vec3.transformMat4([], vector, camera).slice(0, 2);
    });
  },

  createPolygon: function () {
    d3.select(this.element)
      .attr('width', this.width)
      .attr('height', this.height)
    .append('g')
      .attr('class', 'polygon')
    .append('polygon');
  },

  update: function() {
    mat4.rotateX(this.camera, this.camera, 0.03);
    d3.select('polygon').attr('points', (this.dataToView().join(' ')));
  }
});

export default AnimatedSvg;