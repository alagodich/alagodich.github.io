import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        /**
         * Set user name and pick random avatar
         */
        authenticate() {
            var userName = this.get('userName');
            if (userName) {
                var avatarList = this.get('user.avatarList'),
                    randomAvatar = avatarList.pop(Math.floor((Math.random() * avatarList.length) + 1));

                this.set('user.name', this.get('userName'));
                this.set('user.avatar', randomAvatar);
                this.set('user.authenticated', true);
                this.set('userName');
            }
        },
        /**
         * Clear user name and avatar
         */
        logout() {
            this.set('user.name');
            this.set('user.avatar');
            this.set('user.authenticated', false);
        }
    }
});
