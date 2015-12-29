import Ember from 'ember';
import User from 'experiments/models/chat-user';

export default Ember.Component.extend({
    messageSizeLimit: 500,
    user: null,
    willRender() {
        this.set('user', User.create());
    },
    actions: {
        /**
         * Save message to firebase
         * @note probably i should not access store in components, but trying not to use controller
         * As they are going to get rid of it
         */
        send() {
            var body = this.get('body'),
                message;
            if (!body) {
                this.$('#reply').focus();
                return;
            }
            message = this.get('targetObject.store').createRecord('chat-message', {
                user: this.get('user.name'),
                body: body.substring(0, this.messageSizeLimit),
                avatar: this.get('user.avatar'),
                date: new Date()
            });
            message.save();
            this.set('body');
            this.$('#reply').focus();
        }
    }
});
