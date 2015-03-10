import Ember from "ember";

export default Ember.Component.extend({
  tagName: 'g',
  shape: null,
  camera: null,
  shapeSelector: null,

  path: function() {
    var shape = this.get('shape');
    var camera = this.get('camera');
    var line = d3.svg.line();
    return shape.lines(camera).map(function(lineData) {
      return line(lineData);
    }).join('');
  }.property('camera', 'shape'),

  didInsertElement: function() {
    var shapeSelector = d3.select(this.element)
      .append('path')
      .attr('class', 'shape');
    this.set('shapeSelector', shapeSelector);
  },

  render: function() {
    var shapeSelector = this.get('shapeSelector');
    if (!shapeSelector) { return; }
    shapeSelector.attr('d', this.get('path'));
  }.observes('path', 'shapeSelector')
});