import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    elements: DS.hasMany('svg-element'),
    date: DS.attr('date')
});
