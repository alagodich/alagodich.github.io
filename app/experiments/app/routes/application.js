import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        this.store.push({
            data: [{
                id: 1,
                type: 'message',
                attributes: {
                    name: 'alagodich',
                    text: 'Here you can send a public message, any person visiting this page can will see it.'
                }
            }]
        });
    }
});
