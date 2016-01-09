import Ember from 'ember';

export default Ember.Component.extend({
    drawScene() {
        // TODO http://bost.ocks.org/mike/fisheye/
        var data = {};
        var width = 600,
            height = 400;
        var force = d3.layout.force()
            .charge(-240)
            .linkDistance(40)
            .size([width, height]);
        let svg = d3.select(this.$()[0]);
        var color = d3.scale.category20();

        var n = data.nodes.length;

        force.nodes(data.nodes).links(data.links);

        // Initialize the positions deterministically, for better results.
        data.nodes.forEach(function (d, i) {
            d.x = d.y = width / n * i;
        });

        // Run the layout a fixed number of times.
        // The ideal number of times scales with graph complexity.
        // Of course, don't run too long—you'll hang the page!
        force.start();
        for (var i = n; i > 0; --i) force.tick();
        force.stop();

        // Center the nodes in the middle.
        var ox = 0, oy = 0;
        data.nodes.forEach(function (d) {
            ox += d.x, oy += d.y;
        });
        ox = ox / n - width / 2, oy = oy / n - height / 2;
        data.nodes.forEach(function (d) {
            d.x -= ox, d.y -= oy;
        });

        var link = svg.selectAll(".link")
            .data(data.links)
            .enter().append("line")
            .attr("style", "stroke: #999; stroke-opacity: .6; stroke-width: 1.5px;")
            .attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            })
            .style("stroke-width", function (d) {
                return Math.sqrt(d.value);
            });

        var node = svg.selectAll(".node")
            .data(data.nodes)
            .enter().append("circle")
            .attr("style", "stroke: #fff; stroke-width: 1.5px;")
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            })
            .attr("r", 4.5)
            .style("fill", function (d) {
                return color(d.group);
            })
            .call(force.drag);
    }
});
