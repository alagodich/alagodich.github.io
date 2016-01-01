import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('whiteboard-frame', 'Integration | Component | whiteboard frame', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{whiteboard-frame}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#whiteboard-frame}}
      template block text
    {{/whiteboard-frame}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
