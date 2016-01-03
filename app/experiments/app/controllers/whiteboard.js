import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['active'],
    active: null,

    activeWhiteboard: Ember.computed('active', function () {
        var active = this.get('active');
        if (active) {
            return this.store.findRecord('whiteboard', active);
        } else {
            let whiteboard = this.store.createRecord('whiteboard', {
                title: 'No name'
            });
            whiteboard.save();
            this.set('active', whiteboard.get('id'));
            return this.store.findRecord('whiteboard', whiteboard.get('id'));
        }
    })
});
