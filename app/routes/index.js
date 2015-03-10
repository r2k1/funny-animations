import Ember from "ember";

var ApplicationRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('gallery');
  }
});

export default ApplicationRoute;