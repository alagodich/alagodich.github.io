import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'button',
    click() {
        if (confirm(this.get('text'))) {
            this.get('onConfirm')();
        }
    }
});