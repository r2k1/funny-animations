import Ember from 'ember';

var LiveWorldMapController = Ember.Controller.extend({
  runTimer: true,
  events: [],

  startEventGenerator: function() {
    this.set('runTimer', true);
    d3.timer(this.generateEvent.bind(this), 1000);
  },

  generateEvent: function() {
    // do you know another way to stop timer? I don't
    if (!this.get('runTimer')) { return true; }
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