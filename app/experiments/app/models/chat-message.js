import DS from 'ember-data';

export default DS.Model.extend({
    user: DS.attr('string'),
    avatar: DS.attr('string'),
    body: DS.attr('string'),
    date: DS.attr('date'),
    avatarUrl: Ember.computed('avatar', function() {
        var avatar = this.get('avatar');
        if (avatar) {
            return `/experiments/images/avatar/small/${avatar}.jpg`;
        } else {
            return '/experiments/images/avatar/small/helen.jpg';
        }
    })
});
