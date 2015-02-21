import Ember from "ember";

var Cube = Ember.Object.extend({
  vector:    null, //describes center and edge length
  container: null,
  element:   null,
  camera:    null,
  EDGES: [
    // bottom
    [[-0.5, -0.5, -0.5], [0.5, -0.5, -0.5]],
    [[-0.5, -0.5, -0.5], [-0.5, 0.5, -0.5]],
    [[0.5, -0.5, -0.5], [0.5, 0.5, -0.5]],
    [[-0.5, 0.5, -0.5], [0.5, 0.5, -0.5]],

    // top
    [[-0.5, -0.5, 0.5], [0.5, -0.5, 0.5]],
    [[-0.5, -0.5, 0.5], [-0.5, 0.5, 0.5]],
    [[0.5, -0.5, 0.5], [0.5, 0.5, 0.5]],
    [[-0.5, 0.5, 0.5], [0.5, 0.5, 0.5]],

    // others
    [[-0.5, -0.5, -0.5], [-0.5, -0.5, 0.5]],
    [[-0.5, 0.5, -0.5], [-0.5, 0.5, 0.5]],
    [[0.5, -0.5, -0.5], [0.5, -0.5, 0.5]],
    [[0.5, 0.5, -0.5], [0.5, 0.5, 0.5]]
  ],

  linesData: function() {
    var transform = mat4.create();
    var length = this.get('vector')[3];
    mat4.translate(transform, transform, this.get('vector'));
    mat4.scale(transform, transform, vec3.fromValues(length, length, length));
    mat4.mul(transform, transform, this.get('camera'));

    return this.EDGES.map(function(edge) {
      var start = vec3.create();
      var end = vec3.create();
      vec3.transformMat4(start, edge[0], transform);
      vec3.transformMat4(end, edge[1], transform);
      return [start, end];
    });
  }.property('camera', 'vector'),

  line: d3.svg.line(),
  cubePathString: function() {
    var line = this.line;
    return this.get('linesData').map(function(lineData) {
      return line(lineData);
    }).join('');
  }.property('linesData'),

  createElement: function() {
    this.element = this.container
      .append('path')
      .attr('class', 'cube')
      .attr('stroke', 'black');
  }.on('init'),

  updateElement: function() {
    this.element.attr('d', this.get('cubePathString'));
  }.observes('camera')

});

export default Cube;
