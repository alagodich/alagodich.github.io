/* jshint node: true */

module.exports = function (environment) {
    var ENV = {
        modulePrefix: 'experiments',
        environment: environment,
        firebase: 'https://alagodich-ember.firebaseio.com/',
        baseURL: '/experiments/',
        locationType: 'hash',
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            }
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        },
        /**
         * @see http://content-security-policy.com/
         */
        contentSecurityPolicy: {
            'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
            'font-src': "'self' data: https://fonts.gstatic.com",
            'connect-src': "'self' https://auth.firebase.com wss://*.firebaseio.com " +
            "https://www.google.com/recaptcha/api/siteverify",
            'script-src': "'self' " +
            "https://*.firebaseio.com " +
            "https://apis.google.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ " +
            "https://cdn.polyfill.io",
            'frame-src': "https://www.google.com/recaptcha/",
            'img-src': "'self' https://ssl.gstatic.com/"
        },
        intl: {
            locales: ['en-us'],
            defaultLocale: 'en-us'
        }
    };

    if (environment === 'development') {
        ENV.firebase = 'https://alagodich-ember-dev.firebaseio.com/';
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test') {
        ENV.firebase = 'https://alagodich-ember-test.firebaseio.com/';
        // Testem prefers this
        ENV.baseURL = '/';
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {

    }

    return ENV;
};
