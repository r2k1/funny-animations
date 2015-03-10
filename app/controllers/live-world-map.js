import Ember from 'ember';

var LiveWorldMapController = Ember.Controller.extend({
  events: [],
  timer: null,
  eventsPerSecond: 2,

  delay: function() {
    return 1000 / parseInt(this.get('eventsPerSecond'));
  }.property('eventsPerSecond'),

  startEventGenerator: function() {
    setTimeout(function() {
      this.timer = setInterval(this.generateEvent.bind(this), this.get('delay'));
    }.bind(this), 1000);
  },

  stopEventGenerator: function() {
    clearInterval(this.timer);
  },

  restartGenerator: function() {
    this.stopEventGenerator();
    this.startEventGenerator();
  }.observes('delay'),

  generateEvent: function() {
    // do you know another way to stop timer? I don't
    var latitude = -90 + Math.random() * 180;
    var longitude = -180 + Math.random() * 360;
    this.get('events').addObject({
      location: {
        lat: latitude,
        lon: longitude
      }
    });
  }
});

export default LiveWorldMapController;