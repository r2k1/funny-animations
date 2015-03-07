import Ember from 'ember';

export default Ember.Object.extend({
  events: null,
  appIds: [],
  context: null,
  worldMap: null,
  colour: '#00a0e3',

  newEvent: function() {
    var event = this.get('events').shift();
    if (!event) { return; }
    var position = this.get('worldMap').positionFromGeo([event.location.lon, event.location.lat]);
    this.renderEventAnimation(position, event.app_id);
  }.observes('events.length'),

  renderEventAnimation: function(position, appId) {
    var context = this.get('context');
    var self = this;
    d3.select({}).transition()
      .duration(5000)
      .tween('release', function() {
        return function(time) {
          self.renderEvent(time, position, appId, context);
        };
      })
      .transition()
      .duration(5000)
      .tween('fadeout', function() {
        return function(time) {
          context.globalAlpha = 1 - time;
          self.renderEvent(1, position, appId, context);
          context.globalAlpha = 1;
        };
      });
  },

  renderEvent: function(time, position, appId, context) {
    var colour = this.get('colour');
    var distanceBetweenPoints = this.get('worldMap.interval');
    // position - upper left coordinates
    var x = Math.floor(position[0] + distanceBetweenPoints / 2);
    var y = Math.floor(position[1] + distanceBetweenPoints / 2);
    this.renderCircle(context, colour, position);
    context.shadowBlur = 15;
    context.shadowColor = '#03b3ed';
    context.strokeStyle = colour;
    context.lineWidth = 2;
    context.beginPath();
    context.arc(x, y, 20 * time, 0, 2 * Math.PI);
    context.stroke();
    context.shadowColor = "transparent";
  },

  renderCircle: function(context, colour, position) {
    var distanceBetweenPoints = this.get('worldMap.interval');
    var radius   = Math.floor( distanceBetweenPoints / 2.25);
    // position - upper left coordinates
    var x = Math.floor(position[0] + distanceBetweenPoints / 2);
    var y = Math.floor(position[1] + distanceBetweenPoints / 2);
    context.fillStyle = colour;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
  }
});
