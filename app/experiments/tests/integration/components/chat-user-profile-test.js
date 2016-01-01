import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('chat-user-profile', 'Integration | Component | chat user profile', {
    integration: true
});

test('it renders', function (assert) {
    assert.expect(0);
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('user', {
        name: 'Tester',
        avatar: 'test.avatar'
    });
    this.set('selectedAvatar', 'selected.avatar');
    this.set('open', true);

    this.render(hbs`{{chat-user-profile user=user open=open selectedAvatar=selectedAvatar}}`);

});
