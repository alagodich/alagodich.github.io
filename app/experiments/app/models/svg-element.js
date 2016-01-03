import DS from 'ember-data';

export default DS.Model.extend({
    whiteboard: DS.belongsTo('whiteboard'),
    element: DS.attr('string'),
    stroke: DS.attr('string'),
    strokeWidth: DS.attr('number'),
    fill: DS.attr('string'),
    d: DS.attr('string')
});
