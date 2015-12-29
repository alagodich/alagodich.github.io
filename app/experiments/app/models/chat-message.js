import DS from 'ember-data';

export default DS.Model.extend({
    user: DS.attr('string'),
    avatar: DS.attr('string'),
    body: DS.attr('string'),
    date: DS.attr('date')
});
