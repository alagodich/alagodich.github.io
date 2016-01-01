import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';
import './dblclick';
import './should-have-element-with-count';

export default function startApp(attrs) {
    let application;

    let attributes = Ember.merge({}, config.APP);
    // use defaults, but you can override;
    attributes = Ember.merge(attributes, attrs);
    //attributes.defaultLocale = 'en-us';
    //console.log(attributes);

    Ember.run(() => {
        application = Application.create(attributes);
        application.setupForTesting();
        application.injectTestHelpers();
    });

    return application;
}
