import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('small-avatar', 'Integration | Component | small avatar', {
    integration: true
});

test('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
    this.set('avatar', 'avatar');
    this.render(hbs`{{small-avatar avatar=avatar}}`);

    assert.equal(this.$().text().trim(), '');
});
