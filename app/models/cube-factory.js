import Ember from "ember";
import Shape from 'funny-animations/models/shape';

var CubeFactory = Ember.Object.extend({
  build: function(properties) {
    var edges = [
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
    ];
    var attributes = Ember.Object.create(properties);
    return Shape.create(attributes.setProperties({edges: edges}));
  }
});

export default CubeFactory;
