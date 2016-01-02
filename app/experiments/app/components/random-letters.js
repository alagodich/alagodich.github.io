import Ember from 'ember';
import d3 from 'd3';

/**
 * @see http://bl.ocks.org/mbostock/3808218
 */
export default Ember.Component.extend({
    tagName: 'svg',
    attributeBindings: ['width', 'height'],
    width: 800,
    height: 100,
    classNames: ['whiteboard'],
    interval: 2000,

    /**
     * Init svg, draw on interval
     */
    didRender() {
        var svg = d3.select('svg').style('border', '1px solid #CCC'),
            alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

        svg.append('g')
            .attr('transform', 'translate(32,' + (this.get('height') / 2) + ')');
        this.draw(alphabet);

        setInterval(() => {
            this.draw(d3.shuffle(alphabet).slice(0, Math.floor(Math.random() * 26)));
        }, this.get('interval'));
    },

    /**
     * Declare d3 enter() and exit() rules
     * @param data
     */
    draw(data) {
        var text = d3.select('svg').select('g').selectAll('text').data(data);

        text.attr('style', 'fill: #000;');

        text.enter().append('text')
            .attr('style', 'fill: #80A6CD;')
            .attr('x', (data, index) => index * 32)
            .attr('dy', '.35em');

        text.text((data) => data);

        text.exit().remove();
    }
});
