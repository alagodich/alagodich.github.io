import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('google-recaptcha', 'Integration | Component | google recaptcha', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(0);
  this.set('isVisible', false);
  this.on('onVerify', function(val) {
    console.log('onVerify', val);
  });
  this.render(hbs`{{google-recaptcha isVisible=isVisible}}`);
});
