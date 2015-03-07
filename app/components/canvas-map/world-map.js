import Ember from 'ember';
import BitmapLoader from 'funny-animations/components/canvas-map/bitmap-loader';

export default Ember.Object.extend({
  maxWidth:   0,
  cropTop:    0,
  cropBottom: 0,

  // async data loader
  _bitmap:     function() {
    return BitmapLoader.create();
  }.property(),

  data: function() {
    var begin = Math.floor(this.get('_bitmap.height') * this.get('cropTop'));
    var end = Math.floor(this.get('_bitmap.height') * (1 - this.get('cropBottom')));
    return this.get('_bitmap.data').slice(begin, end);
  }.property('_bitmap.data', 'cropTop', 'cropBottom'),

  // set width divisible by bitmap width
  // need to avoid antialiasing artifacts
  width: function() {
    var width = this.get('maxWidth') - this.get('maxWidth') % this.get('_bitmap.width');
    if (width < this.get('_bitmap.width'))
      width = this.get('_bitmap.width');
    return width;
  }.property('maxWidth', '_bitmap.width'),

  // set height based on width and aspect ratio
  height: function() {
    var bitmapRenderedHeight = this.get('_bitmap.height') * (1 - this.get('cropTop') - this.get('cropBottom'));
    return this.get('width') * bitmapRenderedHeight / this.get('_bitmap.width');
  }.property('width', '_bitmap.height', '_bitmap.width', 'cropTop', 'cropBottom'),

  maxHeight: function() {
    if (!this.get('width')) return 0;
    if (!this.get('height')) return 0;
    if (!this.get('maxWidth')) return 0;
    return Math.floor(this.get('height') * this.get('maxWidth') / this.get('width'));
  }.property('maxWidth', 'width', 'height'),

  horizontalPadding: function() {
    if (!this.get('width')) return 0;
    return Math.floor((this.get('maxWidth') - this.get('width')) / 2);
  }.property('width', 'maxWidth'),

  verticalPadding: function() {
    if (!this.get('height')) return 0;
    return Math.floor((this.get('maxHeight') - this.get('height')) / 2);
  }.property('height', 'maxHeight'),

  _xScale: function() {
    return d3.scale.linear()
      .domain([0, this.get('_bitmap.width')])
      .rangeRound([this.get('horizontalPadding'), this.get('width') + this.get('horizontalPadding')]);
  }.property('_bitmap.width', 'width', 'horizontalPadding'),

  _yScale: function() {
    var min = this.get('_bitmap.height') * this.get('cropTop');
    var max = this.get('_bitmap.height') * (1 - this.get('cropBottom'));
    return d3.scale.linear()
      .domain([min, max])
      .rangeRound([this.get('verticalPadding'), this.get('height') + this.get('verticalPadding')]);
  }.property('_bitmap.height', 'height', 'cropTop', 'cropBottom', 'verticalPadding'),

  interval: function() {
    return this.get('_xScale')(1) - this.get('_xScale')(0);
  }.property('_xScale', '_yScale'),

  mapPoints: function() {
    var points = [];
    var xScale = this.get('_xScale');
    var yScale = this.get('_yScale');
    this.get('data').forEach(function(row, y) {
      row.forEach(function(value, x) {
        points.push([xScale(x), yScale(y)]);
      });
    });
    return points;
  }.property('data', '_xScale', '_yScale'),

  // position = [lon, lat]
  positionFromGeo: function(position) {
    var width = this.get('_bitmap.width');
    var height = this.get('_bitmap.height');
    var projection = d3.geo.mercator()
      .scale((width + 1) / 2 / Math.PI)
      .translate([width/2, height/2]);
    var gridPosition = projection(position);
    var xScale = this.get('_xScale');
    var yScale = this.get('_yScale');
    var x = xScale(Math.round(gridPosition[0]));
    var y = yScale(Math.round(gridPosition[1]));
    return [x, y];
  }
});