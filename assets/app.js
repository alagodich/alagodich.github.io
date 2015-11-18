(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Youtube = require('./components/Youtube'),
    Image = require('./components/Image'),
    Profile = require('./components/Profile'),
    TODOs = require('./components/TODOs'),
    Menu = require('./components/Menu'),
    ReactMap = require('./components/ReactMap'),
    Metronome = require('./components/Metronome');

$('.post__video').each(function () {
    var id = $(this).data('id');
    if (typeof id === 'undefined') {
        return;
    }
    React.render(React.createElement(Youtube, { id: id }), this);
});

$('.post__image').each(function () {
    var id = $(this).data('id');
    console.log('tes1t');

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

var metronomeContainer = document.getElementById('metronomeContainer');
if (metronomeContainer) {
    React.render(React.createElement(Metronome, null), metronomeContainer);
}

$('.popup').popup({
    transition: 'vertical flip'
});

},{"./components/Image":2,"./components/Menu":3,"./components/Metronome":5,"./components/Profile":6,"./components/ReactMap":7,"./components/TODOs":8,"./components/Youtube":9}],2:[function(require,module,exports){
"use strict";

var Image = React.createClass({
    displayName: "Image",

    render: function render() {
        var src = 'https://lh3.googleusercontent.com/' + this.props.id;
        return React.createElement("img", { className: "ui image", src: src });
    }
});

module.exports = Image;

},{}],3:[function(require,module,exports){
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

},{"./MenuItem":4}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
'use strict';

var Metronome = React.createClass({
    displayName: 'Metronome',

    minTempo: 30,
    maxTempo: 250,
    audioContext: null,
    timeWorker: null,
    lookAhead: 25.0,
    current16thNote: 0.0,

    scheduleAheadTime: 0.1,

    nextNoteTime: 0.0,
    noteLength: 0.05,

    last16thNoteDrawn: -1,
    notesInQueue: [],

    canvas: null,
    canvasContext: null,
    canvasWidth: 300,
    canvasHeight: 100,
    canvasStrokeStyle: '#fff',
    canvasLineWidth: 2,
    quarterNoteColor: '#DB2828',
    eighthNoteColor: '#2185D0',
    sixteenthNoteColor: '#eee',

    getInitialState: function getInitialState() {
        return {
            tempo: 110.0,

            noteResolution: 4,
            isPlaying: false,
            signature: '4/4'
        };
    },

    init: function init() {
        var scheduler = this.scheduler,
            AudioContext = window.AudioContext || window.webkitAudioContext || false;

        this.canvas = this.refs.canvas.getDOMNode();
        this.canvasContext = this.canvas.getContext('2d');
        this.canvasContext.strokeStyle = this.canvasStrokeStyle;
        this.canvasContext.lineWidth = this.canvasLineWidth;
        window.onorientationchange = this.resetCanvas;
        window.onresize = this.resetCanvas;
        this.resetCanvas();

        if (AudioContext) {
            this.audioContext = new AudioContext();
        } else {
            alert("Sorry, but the Web Audio API is not supported by your browser. " + "Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox");
            return;
        }

        this.timerWorker = new Worker("assets/metronome/metronomeworker.js");
        this.timerWorker.onmessage = function (e) {
            if (e.data == "tick") {
                scheduler();
            } else {
                console.log("message: " + e.data);
            }
        };
        this.timerWorker.postMessage({ "interval": this.lookahead });

        requestAnimationFrame(this.draw);
    },

    play: function play() {
        this.setState({ isPlaying: !this.state.isPlaying }, function () {
            if (this.state.isPlaying) {
                this.current16thNote = -1;
                this.nextNoteTime = this.audioContext.currentTime;
                this.timerWorker.postMessage("start");
            } else {
                this.timerWorker.postMessage("stop");
            }
        });
    },

    startOver: function startOver() {
        if (this.state.isPlaying) {
            this.play();
            this.play();
        }
    },

    draw: function draw() {
        var currentNote = this.last16thNoteDrawn,
            currentTime = this.audioContext.currentTime,
            segments = this.state.signature === '4/4' ? 16 : 9,
            quarter = this.state.signature === '4/4' ? 4 : 3,
            x = Math.floor(this.canvas.width / (segments + 2));

        while (this.notesInQueue.length && this.notesInQueue[0].time < currentTime) {
            currentNote = this.notesInQueue[0].note;
            this.notesInQueue.splice(0, 1);
        }

        if (this.last16thNoteDrawn != currentNote) {
            this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (var i = 0; i < segments; i++) {
                this.canvasContext.fillStyle = currentNote == i ? currentNote % quarter === 0 ? this.quarterNoteColor : this.eighthNoteColor : this.sixteenthNoteColor;
                this.canvasContext.fillRect(x * (i + 1) + 7, 30, x - 1, x * 3);
            }
            this.last16thNoteDrawn = currentNote;
        }

        requestAnimationFrame(this.draw);
    },

    resetCanvas: function resetCanvas() {
        this.canvas.width = $(this.refs.card.getDOMNode()).width();
        this.canvas.height = this.canvasHeight;
    },

    scheduler: function scheduler() {
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
            this.scheduleNote(this.current16thNote, this.nextNoteTime);
            this.nextNote();
        }
    },

    nextNote: function nextNote() {
        var secondsPerBeat = 60.0 / this.state.tempo,
            lastNote = this.state.signature === '4/4' ? 16 : 9,
            multiplier = this.state.signature === '4/4' ? 0.25 : 0.33;

        this.nextNoteTime += secondsPerBeat * multiplier;

        this.current16thNote++;
        if (this.current16thNote == lastNote) {
            this.current16thNote = 0;
        }
    },

    scheduleNote: function scheduleNote(beatNumber, time) {
        var osc = this.audioContext.createOscillator(),
            quarter = this.state.signature === '4/4' ? 4 : 3;

        this.notesInQueue.push({ note: beatNumber, time: time });

        if (this.state.noteResolution == 16 && this.state.signature === '3/4') {
            if ([1, 4, 7, 10].indexOf(beatNumber) > -1) {
                return;
            }
        }

        if (this.state.noteResolution == 8) {
            if (this.state.signature === '4/4' && beatNumber % 2) {
                return;
            }
            if (this.state.signature === '3/4') {}
        }
        if (this.state.noteResolution == 4) {
            if (this.state.signature === '4/4' && beatNumber % 4) {
                return;
            }
            if (this.state.signature === '3/4' && beatNumber % 3) {
                return;
            }
        }

        osc.connect(this.audioContext.destination);
        if (beatNumber === 0) {
            osc.frequency.value = 880.0;
        } else if (beatNumber % quarter === 0) {
            osc.frequency.value = 440.0;
        } else {
            osc.frequency.value = 220.0;
        }

        osc.start(time);
        osc.stop(time + this.noteLength);
    },

    changeTempo: function changeTempo(event) {
        this.setState({ tempo: event.target.value });
        this.startOver();
    },

    changeResolution: function changeResolution(value) {
        this.setState({ noteResolution: value });
        this.startOver();
    },

    changeSignature: function changeSignature(value) {
        this.setState({ signature: value });
        this.startOver();
    },

    componentDidMount: function componentDidMount() {
        var changeResolution = this.changeResolution,
            changeSignature = this.changeSignature;
        this.init();
        $('.ui.resolution.radio.checkbox').checkbox({
            onChange: function onChange() {
                changeResolution(this.value);
            }
        }).first().checkbox('check');
        $('.ui.signature.radio.checkbox').checkbox({
            onChange: function onChange() {
                changeSignature(this.value);
            }
        }).first().checkbox('check');
    },

    render: function render() {
        var playButtonText = this.state.isPlaying ? 'stop' : 'play',
            playButtonIcon = this.state.isPlaying ? 'red stop icon' : 'blue play icon',
            sixteenthResolutionText = this.state.signature === '4/4' ? '16th' : 'Shuffle';
        return React.createElement(
            'div',
            { className: 'metronome' },
            React.createElement(
                'div',
                { className: 'ui centered card' },
                React.createElement(
                    'div',
                    { className: 'content', ref: 'card' },
                    React.createElement(
                        'canvas',
                        { ref: 'canvas', className: 'canvas' },
                        'Canvas not supported!'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'extra content ui form' },
                    React.createElement(
                        'div',
                        { id: 'controls' },
                        React.createElement(
                            'div',
                            { id: 'tempoBox' },
                            'Tempo: ',
                            React.createElement(
                                'span',
                                { id: 'showTempo' },
                                this.state.tempo
                            ),
                            React.createElement('br', null),
                            React.createElement('input', {
                                id: 'tempo',
                                type: 'range',
                                min: this.minTempo,
                                max: this.maxTempo,
                                value: this.state.tempo,
                                onChange: this.changeTempo,
                                className: 'metronome__slider'
                            })
                        ),
                        React.createElement('div', { className: 'ui divider' }),
                        React.createElement(
                            'div',
                            { className: 'inline fields' },
                            React.createElement(
                                'div',
                                { className: 'field' },
                                React.createElement(
                                    'div',
                                    { className: 'ui resolution radio checkbox' },
                                    React.createElement('input', { type: 'radio',
                                        name: 'resolution',
                                        value: '4',
                                        tabindex: '0',
                                        className: 'hidden' }),
                                    React.createElement(
                                        'label',
                                        null,
                                        'Quarter'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'field' },
                                React.createElement(
                                    'div',
                                    { className: 'ui resolution radio checkbox' },
                                    React.createElement('input', { type: 'radio',
                                        name: 'resolution',
                                        value: '8',
                                        tabindex: '0',
                                        className: 'hidden' }),
                                    React.createElement(
                                        'label',
                                        null,
                                        '8th'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'field' },
                                React.createElement(
                                    'div',
                                    { className: 'ui resolution radio checkbox' },
                                    React.createElement('input', { type: 'radio',
                                        name: 'resolution',
                                        value: '16',
                                        tabindex: '0',
                                        className: 'hidden' }),
                                    React.createElement(
                                        'label',
                                        null,
                                        sixteenthResolutionText
                                    )
                                )
                            )
                        ),
                        React.createElement('div', { className: 'ui divider' }),
                        React.createElement(
                            'div',
                            { className: 'inline fields' },
                            React.createElement(
                                'div',
                                { className: 'field' },
                                React.createElement(
                                    'div',
                                    { className: 'ui signature radio checkbox' },
                                    React.createElement('input', { type: 'radio',
                                        name: 'signature',
                                        value: '4/4',
                                        tabindex: '0',
                                        className: 'hidden' }),
                                    React.createElement(
                                        'label',
                                        null,
                                        '4/4'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'field' },
                                React.createElement(
                                    'div',
                                    { className: 'ui signature radio checkbox' },
                                    React.createElement('input', { type: 'radio',
                                        name: 'signature',
                                        value: '3/4',
                                        tabindex: '0',
                                        className: 'hidden' }),
                                    React.createElement(
                                        'label',
                                        null,
                                        '3/4'
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'ui bottom attached button', onClick: this.play },
                    React.createElement('i', { className: playButtonIcon }),
                    playButtonText
                )
            )
        );
    }
});

module.exports = Metronome;

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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
                text: 'Страны, которые я посетил.'
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

        $.getJSON('assets/places.json', function (data) {
            renderMap(data);
        });
    },
    render: function render() {
        return React.createElement('div', { ref: 'mapContainer', className: 'map' });
    }
});

module.exports = ReactMap;

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}]},{},[1]);
