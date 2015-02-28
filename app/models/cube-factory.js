import Ember from "ember";
import SVGObject from 'funny-animations/models/svg-object';

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
    return SVGObject.create(attributes.setProperties({edges: edges}));
  }
});

export default CubeFactory;
