import { test } from 'qunit';
import moduleForAcceptance from 'experiments/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | chat');

test('visiting /chat', (assert) => {
    visit('/chat');

    andThen(function () {
        assert.equal(currentURL(), '/chat');
    });
});