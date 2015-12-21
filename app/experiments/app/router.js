import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function () {
    this.route('chat');
    this.route('arcanoid');
    this.route('svg');
    this.route('about');
});

export default Router;
