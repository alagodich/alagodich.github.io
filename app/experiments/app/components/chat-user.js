import Ember from 'ember';

export default Ember.Component.extend({
    notRobot: false,
    openProfile: false,
    userNameLimit: 45,
    willRender() {
        // If user already authenticated, no need to verify
        if (this.get('user.authenticated')) {
            this.set('notRobot', true);
        }
    },
    actions: {
        verify() {
            this.set('notRobot', true);
        },
        /**
         * Set user name and pick random avatar
         */
        authenticate() {
            var userName = this.get('userName');
            if (typeof userName === 'string' && userName.trim().length > 0) {
                var avatarList = this.get('user.avatarList'),
                    randomAvatar = avatarList[Math.floor((Math.random() * avatarList.length) + 1)];

                this.set('user.name', userName.trim().substring(0, this.userNameLimit));
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
        },
        openProfile() {
            this.set('openProfile', true);
        }
    }
});
