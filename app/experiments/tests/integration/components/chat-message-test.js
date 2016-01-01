import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('chat-message', 'Integration | Component | chat message', {
    integration: true
});

test('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    //{{chat-message user=message.user body=message.body date=message.date avatar=message.avatar}}
    this.set('user', 'test user');
    this.set('body', 'test body');
    // TODO test date, need to set locale in test env
    //this.set('date', '2015-12-29T18:09:42.686Z');
    this.set('avatar', 'test_avatar.png');
    this.render(hbs`{{chat-message user=user body=body date=date avatar=avatar}}`);

    assert.equal(this.$('.author').text().trim(), 'test user');
    assert.equal(this.$('.text').text().trim(), 'test body');
});
