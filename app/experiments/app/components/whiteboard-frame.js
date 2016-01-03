import Ember from 'ember';
import d3 from 'd3';

export default Ember.Component.extend({
    tagName: 'svg',
    classNames: ['whiteboard'],
    margin: {top: 40, right: 20, bottom: 20, left: 40},
    radius: 2,
    drawing: false,
    svg: d3.select('svg').style('border', '1px solid #CCC'),

    /**
     * We're passing in a function in d3.max to tell it what we're maxing (x value)
     * @returns {*}
     */
    xScale() {
        return d3.scale.linear()
            .domain([0, d3.max(this.get('dataSet'), (d) => d.x)])
            .range([this.get('margin.left'), this.get('width') - this.get('margin.right')]);
    },

    /**
     * We're passing in a function in d3.max to tell it what we're maxing (y value)
     * @returns {*}
     */
    yScale() {
        return d3.scale.linear()
            .domain([0, d3.max(this.get('dataSet'), (d) => d.y)])
            .range([this.get('margin.top'), this.get('height') - this.get('margin.bottom')]);
    },

    invertPoint(x, y) {
        return {
            x: this.xScale().invert(x),
            y: this.yScale().invert(y)
        }
    },

    didInsertElement() {
        this.set('svg', d3.select('svg').style('border', '1px solid #CCC'));
        this.correctSize();
        if (this.get('active')) {
            this.drawSavedElements();
        }
        jQuery(window).on('resize', Ember.run.bind(this, this.handleResize));

        this.get('onClear')(Ember.run.bind(this, this.clearFrame));
    },

    clearFrame() {
        this.get('svg').selectAll('*').remove();
    },

    activeWhiteboardChanged: Ember.observer('activeWhiteboard', function () {
        this.clearFrame();
        if (this.get('active')) {
            this.drawSavedElements();
        }
    }),

    drawSavedElements() {
        this.get('activeWhiteboard').then((whiteboard) => {
            whiteboard.get('elements').then((elements) => {
                var dataSet = [],
                    paths;

                // Unfortunately we cannot send ember record set to d3 data() method, we have to process it first
                elements.forEach((element) => {
                    dataSet.push({
                        element: element.get('element'),
                        stroke: element.get('stroke'),
                        strokeWidth: element.get('strokeWidth'),
                        fill: element.get('fill'),
                        d: element.get('d')
                    });
                });

                paths = this.get('svg').selectAll('path').data(dataSet);

                paths.enter()
                    .append('path')
                    .attr({
                        element: (element) => element.element,
                        stroke: (element) => element.stroke,
                        strokeWidth: (element) => element.strokeWidth,
                        fill: (element) => element.fill,
                        d: (element) => element.d
                    });

                paths.exit().remove();
            });
        });
    },

    correctSize() {
        this.get('svg').attr({
            width: this.$().parent().width(),
            height: 500
        });
    },

    drawAxis() {
        var xAxis = d3.svg.axis().scale(this.xScale()).orient('top'),
            yAxis = d3.svg.axis().scale(this.yScale()).orient('left');

        this.get('svg').append('g').attr({
            'class': 'axis',
            transform: 'translate(' + [0, this.get('margin.top')] + ')'
        }).call(xAxis);

        this.get('svg').append('g').attr({
            'class': 'axis',
            transform: 'translate(' + [this.get('margin.left'), 0] + ')'
        }).call(yAxis);
    },

    addPoint(point) {
        this.get('dataSet').push({element: 'point', attr: point});
        this.refresh();
    },

    handleResize() {
        this.correctSize();
    },

    click(event) {
        if (this.get('mode') === 'point') {
            this.addPoint(this.invertPoint(event.offsetX, event.offsetY));
        }
    },

    mouseDown() {
        this.set('drawing', true);

        if (this.get('mode') === 'line') {
            this.startLine(event.offsetX, event.offsetY);
            return;
        }
        if (this.get('mode') === 'erase') {
            this.startErase(event.offsetX, event.offsetY);
        }
    },

    mouseMove(event) {
        if (!this.get('drawing')) {
            return;
        }
        this.continueLine(event.offsetX, event.offsetY);
    },

    mouseUp() {
        this.finalizeElement();
    },

    mouseLeave() {
        this.finalizeElement();
    },

    finalizeElement() {
        this.set('drawing', false);
        this.saveDrawingElement();
        this.set('drawingElement');
    },

    saveDrawingElement() {
        var element;
        if (element = this.get('drawingElement')) {
            this.get('onNewElement')({
                element: element.node().tagName,
                stroke: element.attr('stroke'),
                strokeWidth: element.attr('strokeWidth'),
                fill: element.attr('fill'),
                d: element.attr('d')
            });
        }
    },

    startLine(x, y) {
        this.set('drawingElement', this.get('svg')
            .append('path')
            .attr({
                stroke: 'black',
                strokeWidth: 1,
                d: `M${x},${y}`,
                fill: 'none'
            }));
    },

    continueLine(x, y) {
        var element = this.get('drawingElement');
        element.attr({
            d: `${element.attr('d')}L${x},${y}`
        });
    },

    startErase(x, y) {
        this.set('drawingElement', this.get('svg')
            .append('path')
            .attr({
                stroke: 'white',
                'stroke-width': 10,
                d: `M${x},${y}`,
                fill: 'none'
            }));
    }
});
