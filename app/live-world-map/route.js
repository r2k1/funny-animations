import Ember from 'ember';

var LiveWorldMapRoute = Ember.Route.extend({
  actions: {
    didTransition: function() {
      this.controller.set('events', []);
      this.controller.startEventGenerator();
    },
    willTransition: function() { this.controller.set('runTimer', false); }
  }
});

export default LiveWorldMapRoute;