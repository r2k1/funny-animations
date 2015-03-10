import Ember from 'ember';
import config from './config/environment';
var Router;

Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('gallery');
  this.route('cube');
  this.route('live-world-map');
});

export default Router;