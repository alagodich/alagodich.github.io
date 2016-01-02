import Ember from 'ember';

export default Ember.Route.extend({
    intl: Ember.inject.service(),
    beforeModel() {
        // define the app's runtime locale
        // For example, here you would maybe do an API lookup to resolver
        // which locale the user should be targeted and perhaps lazily
        // load translations using XHR and calling intl's `addTranslation`/`addTranslations`
        // method with the results of the XHR request
        //
        this.get('intl').setLocale('en-us');

        // OR for those that sideload, an array is accepted to handle fallback lookups

        // en-ca is the primary locale, en-us is the fallback.
        // this is optional, and likely unnecessary if you define defaultLocale (see below)
        // The primary usecase is if you side load all translations
        this.get('intl').setLocale(['en-ca', 'en-us']);
    }
});
