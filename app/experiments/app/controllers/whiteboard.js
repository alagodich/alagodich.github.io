import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['active'],
    active: null,
    loading: true,

    activeWhiteboard: Ember.computed('active', function () {
        var active = this.get('active');

        if (active === 'new') {
            let whiteboard = this.store.createRecord('whiteboard', {
                title: 'No name'
            });
            whiteboard.save();
            this.set('active', whiteboard.get('id'));
            return this.store.findRecord('whiteboard', whiteboard.get('id'));
        }

        if (!this.get('active')) {
            this.set('active', this.get('firstWhiteboardId'))
        }
        return this.store.findRecord('whiteboard', this.get('active'));
    })
});
