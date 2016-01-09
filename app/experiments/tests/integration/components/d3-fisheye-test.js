import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('d3-fisheye', 'Integration | Component | d3 fisheye', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{d3-fisheye}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#d3-fisheye}}
      template block text
    {{/d3-fisheye}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
