(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var Image = React.createClass({
    displayName: "Image",

    render: function render() {
        var src = 'https://lh3.googleusercontent.com/' + this.props.id;
        return React.createElement("img", { className: "ui image", src: src });
    }
});

module.exports = Image;

},{}],2:[function(require,module,exports){
"use strict";

var MenuItem = require('./MenuItem'),
    Menu = React.createClass({
    displayName: "Menu",

    render: function render() {
        var items = [],
            current = this.props.current;
        this.props.items.forEach(function (item) {
            items.push(React.createElement(MenuItem, { title: item.title, url: item.url, current: current }));
        });
        return React.createElement(
            "div",
            { className: "ui text menu" },
            items
        );
    }
});

module.exports = Menu;

},{"./MenuItem":3}],3:[function(require,module,exports){
"use strict";

var MenuItem = React.createClass({
    displayName: "MenuItem",

    render: function render() {
        var item;
        if (this.props.current === this.props.url) {
            item = React.createElement(
                "span",
                { className: "header" },
                this.props.title
            );
        } else {
            item = React.createElement(
                "a",
                { className: "header", href: this.props.url },
                this.props.title
            );
        }
        return React.createElement(
            "div",
            { className: "item" },
            item
        );
    }
});

module.exports = MenuItem;

},{}],4:[function(require,module,exports){
'use strict';

var Profile = React.createClass({
    displayName: 'Profile',

    render: function render() {
        var items = [];
        this.props.description.forEach(function (params) {
            var iconClass = params.icon + ' icon',
                content;
            if (typeof params.content.href !== 'undefined') {
                content = React.createElement(
                    'a',
                    { href: params.content.href, target: '_blank' },
                    params.content.text
                );
            } else {
                content = params.content;
            }
            items.push(React.createElement(
                'div',
                { className: 'item' },
                React.createElement('i', { className: iconClass }),
                React.createElement(
                    'div',
                    { className: 'content' },
                    content
                )
            ));
        });
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'ui card' },
                React.createElement(
                    'div',
                    { className: 'ui image' },
                    React.createElement('img', { src: this.props.avatar, className: 'ui image' })
                ),
                React.createElement(
                    'div',
                    { className: 'content' },
                    React.createElement(
                        'div',
                        { className: 'header' },
                        this.props.name
                    ),
                    React.createElement(
                        'div',
                        { className: 'description' },
                        React.createElement(
                            'div',
                            { className: 'ui list' },
                            items
                        )
                    )
                )
            )
        );
    }
});

module.exports = Profile;

},{}],5:[function(require,module,exports){
'use strict';

var ReactMap = React.createClass({
    displayName: 'ReactMap',

    getContainer: function getContainer() {
        return this.refs.mapContainer.getDOMNode();
    },
    getDefaultSettings: function getDefaultSettings() {
        return {
            chart: {
                borderWidth: 1,
                events: {
                    drillup: function drillup() {
                        this.setTitle(null, { text: '' });
                    }
                }
            },
            title: {
                text: 'Страны и города, которые я посетил.'
            },

            legend: {
                enabled: false
            },
            mapNavigation: {
                enabled: true,

                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },
            credits: {
                enabled: false
            }
        };
    },
    renderMap: function renderMap(countries) {
        var worldData = Highcharts.maps['custom/world'],
            settings = this.getDefaultSettings(),
            container = this.getContainer(),
            cities = [];

        countries.forEach(function (country) {
            cities[country.code] = country.cities;
        });

        settings.series = [{
            name: 'Countries',
            mapData: worldData,
            color: ['#E0E0E0'],
            enableMouseTracking: false
        }, {
            type: 'mapbubble',
            mapData: worldData,
            name: 'Страны',
            joinBy: ['iso-a2', 'code'],
            data: countries,
            minSize: 20,
            maxSize: '12%',
            tooltip: {
                pointFormat: '{point.country}'
            }
        }];
        settings.drilldown = {
            activeDataLabelStyle: {
                color: '#FFFFFF',
                textDecoration: 'none',
                textShadow: '0 0 3px #000000'
            },
            drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    x: 0,
                    y: 60
                }
            }
        };

        settings.chart.events.drilldown = function (e) {

            if (!e.seriesOptions) {
                var chart = this,
                    countryKey = e.point.drilldown,
                    countryName = e.point.country,
                    mapKey = 'countries/' + countryKey + '/' + countryKey + '-all',
                    fail = setTimeout(function () {
                    if (!Highcharts.maps[mapKey]) {
                        chart.showLoading('<i class="icon-frown"></i> Failed loading ' + e.point.name);

                        fail = setTimeout(function () {
                            chart.hideLoading();
                        }, 1000);
                    }
                }, 3000);

                var mapData = Highcharts.geojson(Highcharts.maps[mapKey]);

                clearTimeout(fail);
                chart.addSeriesAsDrilldown(e.point, {
                    name: e.point.name,
                    mapData: mapData,
                    data: cities[e.point.code],
                    joinBy: 'hasc',
                    tooltip: {
                        pointFormat: '{point.city}'
                    }
                });
            }

            this.setTitle(null, { text: countryName });
        };

        $(container).highcharts('Map', settings);
    },
    componentDidMount: function componentDidMount() {
        var renderMap = this.renderMap;

        $.getJSON('assets/map/places.json', function (data) {
            renderMap(data);
        });
    },
    render: function render() {
        return React.createElement('div', { ref: 'mapContainer', className: 'map' });
    }
});

module.exports = ReactMap;

},{}],6:[function(require,module,exports){
"use strict";

var TODOs = React.createClass({
    displayName: "TODOs",

    render: function render() {
        var header = 'TODOs',
            items = [];

        this.props.items.forEach(function (item) {
            items.push(React.createElement(
                "div",
                { className: "item" },
                React.createElement("i", { className: "settings icon" }),
                React.createElement(
                    "div",
                    { className: "content" },
                    item
                )
            ));
        });
        return React.createElement(
            "div",
            { className: "ui list" },
            React.createElement(
                "div",
                { className: "item header" },
                header
            ),
            items
        );
    }
});

module.exports = TODOs;

},{}],7:[function(require,module,exports){
'use strict';

var Youtube = React.createClass({
    displayName: 'Youtube',

    componentDidMount: function componentDidMount() {
        $(this.refs.youtubeContainer.getDOMNode()).embed({
            id: this.props.id,
            source: 'youtube',
            placeholder: '',
            autoplay: false
        });
    },
    render: function render() {
        return React.createElement('div', { ref: 'youtubeContainer', className: 'ui embed' });
    }
});

module.exports = Youtube;

},{}],8:[function(require,module,exports){
'use strict';

var Youtube = require('./Youtube'),
    Image = require('./Image'),
    Profile = require('./Profile'),
    TODOs = require('./TODOs'),
    Menu = require('./Menu'),
    ReactMap = require('./ReactMap');

$('.post__video').each(function () {
    var id = $(this).data('id');
    if (typeof id === 'undefined') {
        return;
    }
    React.render(React.createElement(Youtube, { id: id }), this);
});

$('.post__image').each(function () {
    var id = $(this).data('id');
    if (typeof id === 'undefined') {
        return;
    }
    React.render(React.createElement(Image, { id: id }), this);
});

$('.blog__profile').each(function () {
    var self = $(this),
        name = self.data('name'),
        avatar = self.data('avatar'),
        description = self.data('description');
    React.render(React.createElement(Profile, { name: name, avatar: avatar, description: description }), this);
});

$('.menu--react').each(function () {
    var self = $(this);
    React.render(React.createElement(Menu, { current: self.data('current'), items: self.data('items') }), this);
});

$('TODOs').each(function () {
    var items = $(this).data('items');
    React.render(React.createElement(TODOs, { items: items }), this);
});

var mapContainer = document.getElementById('mapContainer');
if (mapContainer) {
    React.render(React.createElement(ReactMap, null), mapContainer);
}

$('.popup').popup({
    transition: 'vertical flip'
});

},{"./Image":1,"./Menu":2,"./Profile":4,"./ReactMap":5,"./TODOs":6,"./Youtube":7}]},{},[8]);
