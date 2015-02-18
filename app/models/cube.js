import Ember from "ember";

var Cube = Ember.Object.extend({
  vector: null,
  element: null,
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
    var length = this.vector[3];
    var transform = mat4.create();
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
});

export default Cube;