import Ember from "ember";

export default Ember.Component.extend({
  width: null,
  height: null,
  classNames: ['svg-container'],

  setResize: function() {
    this.resize();
    this.$(window).resize(this.resize.bind(this));
  }.on('didInsertElement'),

  // can't set size of svg with css
  // use all available space in container
  resize: function() {
    var width = this.$(this.element).innerWidth();
    var height = this.$(this.element).innerHeight();
    this.setProperties({
      width: width,
      height: height
    });
    d3.select(this.element).select('svg')
      .attr('width', width)
      .attr('height', height);
  },

  removeResizeHandler: function() {
    this.$(window).off('resize');
  }.on('willClearRender')
});