import Ember from "ember";

var SVGObject = Ember.Object.extend({
  vector:    null, //describes center and edge length
  container: null,
  element:   null,
  camera:    null,
  edges:     null,

  linesData: function(camera) {
    var transformation = this.transformation(camera);
    return this.edges.map(function(edge) {
      var start = vec3.create();
      var end = vec3.create();
      vec3.transformMat4(start, edge[0], transformation);
      vec3.transformMat4(end, edge[1], transformation);
      return [start, end];
    });
  },

  transformation: function(camera) {
    var matrix = mat4.create();
    var length = this.vector[3];
    mat4.translate(matrix, matrix, this.vector);
    mat4.scale(matrix, matrix, vec3.fromValues(length, length, length));
    if (camera) {
      mat4.mul(matrix, matrix, camera);
    }
    return matrix;
  },

  pathString: function(camera) {
    var line = d3.svg.line();
    return this.linesData(camera).map(function(lineData) {
      return line(lineData);
    }).join('');
  },

  createElement: function() {
    this.element = this.container
      .append('path')
      .attr('class', 'cube');
  }.on('init'),

  renderTo: function(camera) {
    this.element.attr('d', this.pathString(camera));
  }
});

export default SVGObject;
