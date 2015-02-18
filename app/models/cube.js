import Ember from "ember";

var Cube = Ember.Object.extend({
  vector:    null, //describes center and edge length
  container: null,
  element:   null,
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
    [[0.5, 0.5, -0.5], [0.5, 0.5, 0.5]],
  ],

  lines: function() {
    var transform = mat4.create();
    var length = this.vector[3];
    mat4.translate(transform, transform, this.vector);
    mat4.scale(transform, transform, [length, length, length]);

    return this.EDGES.map(function(edge) {
      var start = vec3.create();
      var end = vec3.create();
      vec3.transformMat4(start, edge[0], transform);
      vec3.transformMat4(end, edge[1], transform);
      return [start, end];
    });
  }.property('vector'),

  createElement: function() {
    if (!this.container) { return; }
    var element = this.container.append('g').classed('cube', true);
    this.set('element', element);
  }.on('init'),

  updateElement: function() {
    var element = this.get('element');
    if (!element) { return; }
    element.selectAll('line')
        .data(this.get('lines'))
      .enter()
        .append('line')
        .attr('x1', function(d) { return d[0][0];})
        .attr('y1', function(d) { return d[0][1];})
        .attr('x2', function(d) { return d[1][0];})
        .attr('y2', function(d) { return d[1][1];})
        .attr('stroke', 'black');
  }.observes('lines', 'element')
});

export default Cube;