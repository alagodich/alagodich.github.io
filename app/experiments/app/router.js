import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function () {
    this.route('chat');
    this.route('whiteboard', () => {
        this.route('index');
        this.route('list');
        this.route('view', {path: '/view/:whiteboard_id'});
    });
});

export default Router;
