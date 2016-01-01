import Ember from 'ember';

export default Ember.Component.extend({
    apiUrl: 'https://www.google.com/recaptcha/api.js',
    verifyUrl: 'https://www.google.com/recaptcha/api/siteverify',
    classNames: ['g-recaptcha'],
    attributeBindings: [
        'siteKey:data-sitekey',
        'data-theme',
        'data-size',
        'data-callback',
        'data-expired-callback',
        'data-tabindex'
    ],
    _siteKey: '6LdUBBQTAAAAAI0IwSV0iPIvxS7R47LmG2oZMteS',
    _testKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    siteKey() {
        var environment = this.container.lookupFactory('config:environment').environment;
        if (environment === 'development' || environment === 'test') {
            return this._testKey;
        }
        return this._siteKey;
    },
    size: 'normal',
    type: 'image',
    lang: 'en',
    resetTrigger: false,
    _isSetup: false,
    _attempts: 0,

    _maxAttempts: function () {
        return 20;
    }.property().readOnly(),

    _interval: function () {
        // Time between polls (in ms)
        return 100;
    }.property().readOnly(),

    // TODO use didInsertElement instead
    init() {
        this._super();
        Ember.$.getScript(this.apiUrl + "?&render=explicit&hl=" + this.get('lang'), (/*data, textStatus, jqxhr*/) => {
            if (this.container.lookupFactory('config:environment').environment !== 'test') {
                this.waitForGrecaptcha();
            }
        });
    },

    /**
     * When we load recaptcha script, grecaptcha object is not available right away, we have to wait for it
     */
    waitForGrecaptcha: function () {
        /*global grecaptcha */
        if (window.grecaptcha !== undefined) {
            this.setupGrecaptcha();
        } else if (this.get('_attempts') < this.get('_maxAttempts')) {
            this.set('_attempts', this.get('_attempts') + 1);
            Ember.run.later(this, () => {
                this.waitForGrecaptcha();
            }, this.get('_interval'));
        } else {
            Ember.Logger.error("Failed to get grecaptcha script");
        }
    },

    setupGrecaptcha() {
        var self = this;
        // Don't render it for tests, i don't know how to automatically test it yet
        if (!this.$()) {
            return;
        }
        grecaptcha.render(this.$().prop('id'), {
            sitekey: this.siteKey(),
            callback: self.verifyCallback(),
            size: this.get('size'),
            type: this.get('type'),
            'expired-callback': this.resetGrecaptcha
        });
        this.set('_isSetup', true);
    },

    verifyCallback(responseKey) {
        // g-recaptcha token shouldn't be checked on frontend
        Ember.$.ajaxPrefilter(function (options, oriOpt, jqXHR) {
            jqXHR.setRequestHeader("X-Recaptcha-Token", responseKey);
        });
        return this.get('onVerify');
    },

    resetGrecaptcha: function () {
        if (this.get('_isSetup') === true && this.get('resetTrigger') === true) {
            grecaptcha.reset(this.$().prop('id'));
            this.set('resetTrigger', false);
        }
    }.observes('resetTrigger')
});