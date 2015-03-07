import Ember from 'ember';

var LiveWorldMapController = Ember.Controller.extend({
  events: [],
  init: function() {
    setInterval(this.generateEvent.bind(this), 1000);
  },

  generateEvent: function() {
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