import StorageObject from 'ember-local-storage/local/object';

export default StorageObject.extend({
    storageKey: 'chat-user',
    initialContent: {
        authenticated: false,
        name: '',
        avatar: 'helen'
    },
    avatarUrl: Ember.computed('avatar', function () {
        var avatar = this.get('avatar');
        if (avatar) {
            return `/experiments/images/avatar/small/${avatar}.jpg`;
        } else {
            return '/experiments/images/avatar/small/helen.jpg';
        }
    }),
    avatarList: [
        'christian',
        'elliot',
        'helen',
        'jenny',
        'joe',
        'laura',
        'matt',
        'steve',
        'stevie'
    ]
});
