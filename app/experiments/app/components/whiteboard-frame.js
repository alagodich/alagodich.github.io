import Ember from 'ember';
import d3 from 'd3';

export default Ember.Component.extend({
    tagName: 'svg',
    classNames: ['whiteboard'],
    margin: {top: 40, right: 20, bottom: 20, left: 40},
    radius: 2,
    drawing: false,

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
        jQuery(window).on('resize', Ember.run.bind(this, this.handleResize));

        this.get('onClear')(this.clearFrame);

        //this.drawAxis();
    },

    clearFrame() {
        d3.selectAll("svg > *").remove();
    },

    correctSize() {
        this.get('svg').attr({
            width: this.$().parent().width(),
            height: 500
        });
    },

    drawAxis() {
        var xAxis,
            yAxis;
        // Add a X and Y Axis (Note: orient means the direction that ticks go, not position)
        xAxis = d3.svg.axis().scale(this.xScale()).orient('top');
        yAxis = d3.svg.axis().scale(this.yScale()).orient('left');

        this.get('svg').append('g').attr({
            'class': 'axis',
            transform: 'translate(' + [0, this.get('margin.top')] + ')'
        }).call(xAxis);

        this.get('svg').append('g').attr({
            'class': 'axis',
            transform: 'translate(' + [this.get('margin.left'), 0] + ')'
        }).call(yAxis);

        this.refresh();
    },

    addPoint(point) {
        var alreadyExists = this.get('dataSet').find(function (element) {
            return element.x === point.x && element.y === point.y;
        });
        if (alreadyExists) {
            return;
        }
        this.get('dataSet').push(point);
        this.refresh();
    },

    refresh() {
        this.get('svg').selectAll('circle')
            .data(this.get('dataSet'))
            .enter()
            .append('circle')
            .attr({
                cx: (d) => this.xScale()(d.x),
                cy: (d) => this.yScale()(d.y),
                r: this.get('radius')
            });
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
        if (this.get('mode') === 'polyline') {
            this.startPolyline(event.offsetX, event.offsetY);
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
        if (this.get('mode') === 'polyline') {
            this.continuePolyline(event.offsetX, event.offsetY);
            return;
        }
        if (this.get('mode') === 'line') {
            this.continueLine(event.offsetX, event.offsetY);
            return;
        }
        if (this.get('mode') === 'erase') {
            this.continueErase(event.offsetX, event.offsetY);
        }
    },

    mouseUp() {
        this.stopAllActions();
    },

    mouseLeave() {
        this.stopAllActions();
    },

    stopAllActions() {
        this.set('drawing', false);
        this.set('polyline');
        this.set('line');
        this.set('erase');
    },

    startPolyline(x, y) {
        this.set('polyline', this.get('svg')
            .append('polyline')
            .attr({
                stroke: 'black',
                strokeWidth: 1,
                points: x + ',' + y
            }));
    },

    continuePolyline(x, y) {
        var points = this.get('polyline').attr('points').split(' ');
        points.push(x + ',' + y);
        this.get('polyline').attr({
            points: points.join(' ')
        });
    },

    startLine(x, y) {
        this.set('line', this.get('svg')
            .append('path')
            .attr({
                stroke: 'black',
                strokeWidth: 1,
                d: 'M' + x + ',' + y,
                fill: 'none'
            }));
    },

    continueLine(x, y) {
        var points = this.get('line').attr('d').split(' ');
        points.push('L' + x + ',' + y);
        this.get('line').attr({
            d: points.join(' ')
        });
    },

    startErase(x, y) {
        this.set('erase', this.get('svg')
            .append('path')
            .attr({
                stroke: 'white',
                'stroke-width': 10,
                d: 'M' + x + ',' + y,
                fill: 'none'
            }));
    },

    continueErase(x, y) {
        var points = this.get('erase').attr('d').split(' ');
        points.push('L' + x + ',' + y);
        this.get('erase').attr({
            d: points.join(' ')
        });
    }
});
