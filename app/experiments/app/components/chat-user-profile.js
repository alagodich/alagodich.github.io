import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['ui', 'modal'],
    modal: null,
    didInsertElement() {
        this.modal = this.$().modal({
            onHide: () => {
                this.set('open', false);
            }
        });
    },
    willUpdate() {
        if (this.get('open')) {
            this.modal.modal('show')
        }
    },
    actions: {
        selectAvatar(avatar) {
            this.set('selectedAvatar', avatar);
        }
    }
});
