import StorageObject from 'ember-local-storage/local/object';

export default StorageObject.extend({
    storageKey: 'chat-user',
    initialContent: {
        authenticated: false,
        name: '',
        avatar: 'helen'
    },
    avatarList: [
        'christian',
        'elliot',
        'jenny',
        'laura',
        'lindsay.png',
        'matt',
        'steve',
        'daniel',
        'helen',
        'joe',
        'lena.png',
        'mark.png',
        'molly.png',
        'stevie'
    ]
});
