import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        active: {
            refreshModel: false
        }
    },
    model(params) {
        return this.store.query('whiteboard', {
            orderBy: 'date',
            limitToLast: 100
        });
        //var active;
        //if (params.active) {
        //    console.log('searching');
        //    active = this.store.findRecord('whiteboard', params.active);
        //} else {
        //    console.log('creating new');
        //    active = this.store.createRecord('whiteboard', {
        //        title: '',
        //        elements: []
        //    });
        //}
        //return Ember.RSVP.hash({
        //    active: active,
        //    list: this.store.query('whiteboard', {
        //        orderBy: 'date',
        //        limitToLast: 100
        //    })
        //});
    }
});
