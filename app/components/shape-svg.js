import Ember from "ember";

export default Ember.Component.extend({
  tagName: 'g',
  shape: null,
  camera: null,
  path: null,

  didInsertElement: function() {
    var path = d3.select(this.element)
      .append('path')
      .attr('class', 'shape');
    this.set('path', path);
  },

  render: function() {
    if (!(this.get('camera') && this.get('shape') && this.get('path'))) {
      return;
    }
    var pathString = this.get('shape').pathString(this.get('camera'));
    this.get('path').attr('d', pathString);
  }.observes('camera', 'shape', 'path')
});