/* jshint node:true */
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app'),
    semanticFonts = ['icons.eot', 'icons.otf', 'icons.svg', 'icons.ttf', 'icons.woff', 'icons.woff2'],
    semanticImages = ['flags.png'];

module.exports = function (defaults) {
    var app = new EmberApp(defaults, {
        fingerprint: {
            exclude: ['images/']
        }
        // Add options here
    });

    app.import('bower_components/semantic/dist/semantic.min.css');
    app.import('bower_components/semantic/dist/semantic.min.js');
    semanticFonts.forEach((font) => {
        app.import('bower_components/semantic/dist/themes/default/assets/fonts/' + font, {
            destDir: 'assets/themes/default/assets/fonts'
        });
    });
    semanticImages.forEach((image) => {
        app.import('bower_components/semantic/dist/themes/default/assets/images/' + image, {
            destDir: 'assets/themes/default/assets/images'
        });
    });
    // Use `app.import` to add additional libraries to the generated
    // output files.
    //
    // If you need to use different assets in different
    // environments, specify an object as the first parameter. That
    // object's keys should be the environment name and the values
    // should be the asset to use in that environment.
    //
    // If the library that you are including contains AMD or ES6
    // modules that you would like to import into your application
    // please specify an object with the list of modules as keys
    // along with the exports of each module as its value.

    return app.toTree();
};
