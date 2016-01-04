import Ember from 'ember';
import d3 from 'd3';

export default Ember.Component.extend({
    tagName: 'svg',
    classNames: ['whiteboard'],
    margin: {top: 40, right: 20, bottom: 20, left: 40},
    drawing: false,

    /**
     * We're passing in a function in d3.max to tell it what we're maxing (x value)
     * @returns {*}
     */
    xScale() {
        return d3.scale.linear()
            .domain([0, 100])
            .range([this.get('margin.left'), this.$().parent().width() - this.get('margin.right')]);
    },

    /**
     * We're passing in a function in d3.max to tell it what we're maxing (y value)
     * @returns {*}
     */
    yScale() {
        return d3.scale.linear()
            .domain([0, 100])
            .range([this.get('margin.top'), this.$().parent().height() - this.get('margin.bottom')]);
    },

    invertPoint(x, y) {
        return {
            x: this.xScale().invert(x),
            y: this.yScale().invert(y)
        };
    },

    didInsertElement() {
        d3.select(this.$()[0]).style('border', '1px solid #CCC');
        this.correctSize();
        this.drawSavedElements();
        //this.drawMessage('Welcome!');
        jQuery(window).on('resize', Ember.run.bind(this, this.handleResize));
        this.get('onClear')(Ember.run.bind(this, this.clearFrame));
        //this.drawAxis();
    },

    clearFrame() {
        d3.select(this.$()[0]).selectAll('.drawing').remove();
    },

    activeWhiteboardChanged: Ember.observer('activeWhiteboard', function () {
        this.clearFrame();
        this.drawSavedElements();
    }),

    activeWhiteboardDataSetChanged: Ember.observer('activeWhiteboard.elements', function () {
        Ember.run.next(this, this.drawSavedElements);
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

                paths = d3.select(this.$()[0]).selectAll('path').data(dataSet);
                paths.enter()
                    .append('path')
                    .attr({
                        class: 'drawing',
                        element: (element) => element.element,
                        stroke: (element) => element.stroke,
                        'stroke-width': (element) => element.strokeWidth,
                        fill: (element) => element.fill,
                        d: (element) => element.d
                    });

                paths.exit().remove();
            });
        });
    },

    correctSize() {
        d3.select(this.$()[0]).attr({
            width: this.$().parent().width(),
            height: 500
        });
    },

    drawAxis() {
        let xAxis = d3.svg.axis().scale(this.xScale()).orient('top'),
            yAxis = d3.svg.axis().scale(this.yScale()).orient('left');

        d3.select(this.$()[0]).append('g').attr({
            'class': 'axis',
            transform: 'translate(' + [0, this.get('margin.top')] + ')'
        }).call(xAxis);

        d3.select(this.$()[0]).append('g').attr({
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
        this.starElement();
    },

    mouseMove(event) {
        if (!this.get('drawing')) {
            return;
        }
        this.continuePath(event.offsetX, event.offsetY);
    },

    mouseUp() {
        this.finalizeElement();
    },

    mouseLeave() {
        this.finalizeElement();
    },

    /**
     * Disable touch events for now
     */
    //touchStart() {
    //    this.starElement();
    //},
    //
    //touchMove() {
    //    if (!this.get('drawing')) {
    //        return;
    //    }
    //    this.continuePath(event.offsetX, event.offsetY);
    //},
    //
    //touchEnd() {
    //    this.finalizeElement();
    //},
    //
    //touchCancel() {
    //    this.finalizeElement();
    //},

    starElement() {
        var className = 'drawing',
            strokeWidth = parseInt(this.get('strokeWidth')),
            stroke,
            fill;
        if (this.get('mode') === 'line') {
            stroke = this.get('stroke').toString();
            fill = this.get('fill') === false ? 'none' : this.get('stroke');
        }
        if (this.get('mode') === 'erase') {
            stroke = 'white';
            fill = 'none';
            strokeWidth++;
        }

        this.set('drawing', true);
        this.startPath(event.offsetX, event.offsetY, {
            class: className,
            stroke: stroke,
            'stroke-width': strokeWidth,
            fill: fill
        });
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
                strokeWidth: element.attr('stroke-width'),
                fill: element.attr('fill'),
                d: element.attr('d')
            });
        }
    },

    startPath(x, y, attributes) {
        if (typeof x === 'undefined' || typeof y === 'undefined') {
            return;
        }
        attributes.d = `M${parseInt(x)},${parseInt(y)}`;
        this.set('drawingElement', d3.select(this.$()[0])
            .append('path')
            .attr(attributes));
    },

    continuePath(x, y) {
        if (typeof x === 'undefined' || typeof y === 'undefined') {
            return;
        }
        var element = this.get('drawingElement');
        element.attr({
            d: `${element.attr('d')}L${parseInt(x)},${parseInt(y)}`
        });
    },

    drawMessage(message) {
        let svg = d3.select(this.$()[0]),
            text,
            group;

        group = svg.append('g').attr('transform', 'translate(32,50)');
        text = svg.select('g').selectAll('text').data(message);

        text.attr('style', 'fill: #000;');

        text.enter().append('text')
            .attr('style', 'fill: #80A6CD;')
            .attr('x', (message, index) => index * 24)
            .attr('dy', '.35em');

        text.text((message) => message);

        text.exit().remove();
    }
});
