import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.store.query('chat-message', {
            orderBy: 'date',
            limitToLast: 100
        });
    }
});
