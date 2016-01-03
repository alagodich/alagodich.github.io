import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        active: {
            refreshModel: false
        }
    },

    model() {
        return this.store.query('whiteboard', {
            orderBy: 'date',
            limitToLast: 100
        });
    },

    setupController(controller, whiteboards) {
        this._super(controller, whiteboards);
        controller.set('firstWhiteboardId', whiteboards.get('firstObject.id'));
    }
});
