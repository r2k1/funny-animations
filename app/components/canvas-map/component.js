import Ember from 'ember';
import WorldMap from 'funny-animations/components/canvas-map/world-map';
import EventsRenderer from 'funny-animations/components/canvas-map/events-renderer';


export default Ember.Component.extend({
  tagName:    'canvas',
  events:     null,
  appIds:     [],
  cropTop:    0.06,
  cropBottom: 0.3,
  width: Ember.computed.oneWay('_worldMap.maxWidth'),
  height: Ember.computed.oneWay('_worldMap.maxHeight'),
  stopRender: false,

  _worldMap: null,

  didInsertElement: function() {
    this.set('_worldMap', WorldMap.create({
      cropTop:    this.get('cropTop'),
      cropBottom: this.get('cropBottom')
    }));

    this.$(window).on('debouncedresize', this.resize.bind(this));
    this.resize();

    d3.timer(this.renderMap.bind(this));
    EventsRenderer.create({
      events:   this.get('events'),
      context:  this.get('element').getContext('2d'),
      worldMap: this.get('_worldMap'),
      appIds:   this.get('appIds')
    });
  },

  renderMap: function() {
    // only way to stop d3 timer
    if (this.get('stopRender')) { return true; }
    var map = this.get('worldMapCanvas');
    var context = this.get('element').getContext('2d');
    context.clearRect(0, 0, this.get('width'), this.get('height'));
    if (map) { context.drawImage(map, 0, 0); }
  },

  // cached canvas with map
  worldMapCanvas: function() {
    if (!this.get('width') || !this.get('height') || !this.get('_worldMap.mapPoints')) { return; }
    var canvas = document.createElement('canvas');
    canvas.width = this.get('width');
    canvas.height = this.get('height');
    var context = canvas.getContext('2d');
    this.get('_worldMap.mapPoints').forEach(this.renderCircle.bind(this, context));
    return canvas;
  }.property('_worldMap.mapPoints', 'width', 'height'),

  renderCircle: function(context, position) {
    var distanceBetweenPoints = this.get('_worldMap.interval');
    var radius   = Math.floor( distanceBetweenPoints / 2.25);
    // position - upper left coordinates
    var x = Math.floor(position[0] + distanceBetweenPoints / 2);
    var y = Math.floor(position[1] + distanceBetweenPoints / 2);
    context.fillStyle = '#6a737e';
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
  },

  sizeDidChange: function() {
    this.get('element').height = this.get('height');
    this.get('element').width = this.get('width');
  }.observes('width', 'height'),

  resize: function() {
    this.set('_worldMap.maxWidth', this.get('element').parentNode.offsetWidth);
  },

  removeEventHandler: function() {
    this.set('stopRender', true);
    this.$(window).off('debouncedresize');
  }.on('willClearRender')
});