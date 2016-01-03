import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'img',
    classNames: ['ui'],
    classNameBindings: ['size', 'additionalClass', ':image'],
    attributeBindings: ['src'],
    size: 'mini',
    defaultFormat: '.jpg',
    src: Ember.computed('avatar', function () {
        var avatar = this.get('avatar');
        avatar = (avatar.indexOf('.') > -1) ? avatar : avatar + this.defaultFormat;
        return '/experiments/images/avatar/small/' + avatar;
    }),
    click() {
        if (typeof this.get('onClick') === 'function') {
            this.get('onClick')(this.get('avatar'));
        }
    }
});
