(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Youtube = require('./components/Youtube'),
    Photo = require('./components/Photo'),
    Profile = require('./components/Profile'),
    Menu = require('./components/Menu'),
    ReactMap = require('./components/ReactMap'),
    Carousel = require('./components/Carousel'),
    Metronome = require('./components/Metronome');

$('youtube').each(function () {
    var id = $(this).data('id');
    if (typeof id === 'undefined') {
        return;
    }
    React.render(React.createElement(Youtube, { id: id }), this);
});

$('google-photo').each(function () {
    var id = $(this).data('id');

    if (typeof id === 'undefined') {
        return;
    }
    React.render(React.createElement(Photo, { id: id }), this);
});

$('carousel').each(function () {
    var self = $(this);
    React.render(React.createElement(Carousel, { items: self.data('items') }), this);
});

$('profile').each(function () {
    var self = $(this),
        name = self.data('name'),
        avatar = self.data('avatar'),
        description = self.data('description');
    React.render(React.createElement(Profile, { name: name, avatar: avatar, description: description }), this);
});

$('react-menu').each(function () {
    var self = $(this);
    React.render(React.createElement(Menu, { current: self.data('current'), items: self.data('items') }), this);
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

},{"./components/Carousel":2,"./components/Menu":3,"./components/Metronome":5,"./components/Photo":6,"./components/Profile":7,"./components/ReactMap":8,"./components/Youtube":9}],2:[function(require,module,exports){
'use strict';

var Carousel = React.createClass({
    displayName: 'Carousel',

    googlePhotoUrl: 'https://lh3.googleusercontent.com/',
    componentDidMount: function componentDidMount() {
        $(this.refs.container.getDOMNode()).owlCarousel({
            loop: true,
            items: 1,
            margin: 0,
            nav: false,
            dots: false,
            lazyLoad: true,
            center: true,
            autoHeight: true
        });
    },
    renderItem: function renderItem(item) {
        if (typeof item === 'object') {
            return '';
        }
        if (typeof item === 'string') {
            return React.createElement('img', {
                className: 'owl-lazy ui image',
                'data-src': this.googlePhotoUrl + item,
                alt: ''
            });
        }
        return '';
    },
    render: function render() {
        var items = [];
        this.props.items.forEach((function (item) {
            items.push(this.renderItem(item));
        }).bind(this));
        return React.createElement(
            'div',
            { className: 'ui blue piled segment', style: { 'margin-bottom': '1em' } },
            React.createElement(
                'div',
                { className: 'owl-carousel', ref: 'container' },
                items
            )
        );
    }
});

module.exports = Carousel;

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
    maxTempo: 200,
    minVolume: 0,
    maxVolume: 100,
    audioContext: null,
    timeWorker: null,
    lookAhead: 25.0,
    current16thNote: 0.0,

    scheduleAheadTime: 0.1,

    nextNoteTime: 0.0,
    noteLength: 0.05,

    last16thNoteDrawn: -1,
    notesInQueue: [],
    quartersQuantity: null,
    sixteenthQuantity: null,
    nextNoteMultiplier: null,

    svg: null,
    svgWidth: null,
    svgHeight: 50,
    svgPadding: 4,
    pointer: null,
    rulerLineWidth: 1,
    quarterSerifHeight: 14,
    eightSerifHeight: 7,
    spacing: null,

    rulerColor: '#979797',
    stressedNoteColor: '#DB2828',
    noteColor: '#2185D0',
    emptyNoteColor: '#EEE',

    unlocked: false,
    decodedBeatSound: null,
    playButton: null,

    browserCompatible: true,

    getInitialState: function getInitialState() {
        return {
            tempo: 101.0,
            noteResolution: '4',
            isPlaying: false,
            signature: '4/4',
            accentFirstBeat: false,
            volume: 0.5,
            useOscillator: true
        };
    },

    init: function init() {
        var AudioContext = window.AudioContext || window.webkitAudioContext || false;

        this.playButton = $(this.refs.playButton.getDOMNode());
        this.playButton.focus();

        this.initSvg();

        if (AudioContext) {
            this.audioContext = new AudioContext();
        } else {
            alert("Sorry, but the Web Audio API is not supported by your browser. " + "Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox");
            return;
        }

        this.loadBeatData().then((function (buffer) {
            this.decodedBeatSound = buffer;
        }).bind(this), function (error) {
            console.log('Cannot load beat sound.', error);
        });

        this.timerWorker = new Worker("assets/metronome/metronomeworker.js");
        this.timerWorker.onmessage = (function (message) {
            if (message.data == "tick") {
                this.scheduler();
            }
        }).bind(this);
        this.timerWorker.postMessage({ "interval": this.lookAhead });
    },

    initSvg: function initSvg() {
        var svgNode = this.refs.svg.getDOMNode(),
            cardWidth = $(this.refs.card.getDOMNode()).width();

        $(svgNode).width(cardWidth).height(50);
        $(this.refs.card.getDOMNode()).width();
        this.svg = Snap(svgNode);
        this.svgWidth = this.svg.node.width.baseVal.value - this.svgPadding * 2;

        this.drawRuler();
        this.drawPointer();
    },

    drawRuler: function drawRuler() {
        var ruler = this.svg.select('#ruler');

        if (ruler) {
            ruler.remove();
        }
        this.initParams();
        this.spacing = (this.svgWidth - this.sixteenthQuantity * this.rulerLineWidth) / this.sixteenthQuantity;

        ruler = this.svg.group(this.svg.line(this.svgPadding / 2, this.svgHeight, this.svgWidth + this.svgPadding, this.svgHeight));
        for (var i = 0; i <= this.sixteenthQuantity; i++) {
            var x = this.spacing * i + i * this.rulerLineWidth + this.svgPadding,
                y = i % this.quartersQuantity === 0 ? this.quarterSerifHeight : this.eightSerifHeight;

            ruler.add(this.svg.line(x, this.svgHeight, x, this.svgHeight - y));
        }
        ruler.attr({
            stroke: this.rulerColor,
            strokeWidth: this.rulerLineWidth,
            id: 'ruler'
        });
    },

    drawPointer: function drawPointer() {
        this.pointer = this.svg.polygon([this.svgPadding, this.svgHeight - this.quarterSerifHeight, this.svgPadding + 3, this.svgHeight - 38, this.svgPadding - 3, this.svgHeight - 38, this.svgPadding, this.svgHeight - this.quarterSerifHeight]).attr({
            fill: '#FFF'
        });
    },

    movePointer: function movePointer() {
        var animationSpeed = 1 / this.state.tempo * 1500,
            x = this.spacing * this.current16thNote + this.current16thNote,
            color;

        if (this.state.accentFirstBeat && this.current16thNote === 0) {
            color = this.stressedNoteColor;
        } else {
            color = this.current16thNote % this.quartersQuantity === 0 ? this.noteColor : this.emptyNoteColor;
        }

        this.pointer.animate({
            transform: 't' + x + ',0',
            fill: color
        }, animationSpeed);
    },

    initParams: function initParams() {
        if (this.state.signature === '4/4') {
            this.sixteenthQuantity = this.state.noteResolution === '12' ? 12 : 16;
        }
        if (this.state.signature === '3/4') {
            this.sixteenthQuantity = this.state.noteResolution === '12' ? 9 : 12;
        }
        this.quartersQuantity = this.state.noteResolution === '12' ? 3 : 4;
        this.nextNoteMultiplier = this.state.noteResolution === '12' ? 0.33 : 0.25;
    },

    loadBeatData: function loadBeatData() {
        return new Promise((function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.open('get', 'assets/metronome/beat.mp3', true);
            request.responseType = 'arraybuffer';
            request.onload = (function () {
                var audioData = request.response;
                this.audioContext.decodeAudioData(audioData, function (buffer) {
                    resolve(buffer);
                }, function (error) {
                    console.log('Error with decoding audio data. ' + error.err);
                    reject(error.err);
                });
            }).bind(this);
            request.send();
        }).bind(this));
    },

    play: function play() {
        this.unlock();
        this.setState({ isPlaying: !this.state.isPlaying }, function () {
            if (this.state.isPlaying) {
                this.initParams();
                this.current16thNote = -1;
                this.nextNoteTime = this.audioContext.currentTime;
                this.timerWorker.postMessage("start");
            } else {
                this.timerWorker.postMessage("stop");
            }
        });
        this.playButton.focus();
    },

    startOver: function startOver() {
        if (this.state.isPlaying) {
            this.timerWorker.postMessage("stop");
            this.initParams();
            this.current16thNote = -1;
            this.nextNoteTime = this.audioContext.currentTime;
            this.timerWorker.postMessage("start");
        }
        this.playButton.focus();
    },

    scheduler: function scheduler() {
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
            this.scheduleNote(this.current16thNote, this.nextNoteTime);
            this.nextNote();
        }
    },

    nextNote: function nextNote() {
        var secondsPerBeat = 60.0 / this.state.tempo;
        this.nextNoteTime += secondsPerBeat * this.nextNoteMultiplier;

        this.current16thNote++;
        if (this.current16thNote == this.sixteenthQuantity) {
            this.current16thNote = 0;
        }
    },

    scheduleNote: function scheduleNote(beatNumber, time) {
        var source;

        this.notesInQueue.push({ note: beatNumber, time: time });
        this.movePointer();
        if (!this.noteShouldBePlayed(beatNumber)) {
            return;
        }

        source = this.getAudioSource(beatNumber);
        source.start(time);
        source.stop(time + this.noteLength);
    },

    getAudioSource: function getAudioSource(beatNumber) {
        var source,
            gainNode = this.audioContext.createGain();

        if (this.state.useOscillator) {
            source = this.audioContext.createOscillator();
            if (beatNumber === 0) {
                source.frequency.value = this.state.accentFirstBeat ? 880.0 : 440.0;
            } else if (beatNumber % this.quartersQuantity === 0) {
                source.frequency.value = 440.0;
            } else {
                source.frequency.value = 220.0;
            }
        } else {
            source = this.audioContext.createBufferSource();
            source.buffer = this.decodedBeatSound;
        }

        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        gainNode.gain.value = this.state.volume;
        return source;
    },

    unlock: function unlock() {
        if (!this.iOS() || this.unlocked) {
            return;
        }

        var source = this.audioContext.createBufferSource();
        source.buffer = this.audioContext.createBuffer(1, 1, 22050);
        source.connect(this.audioContext.destination);
        source.noteOn(0);

        setTimeout(function () {
            if (source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE) {
                this.unlocked = true;
            }
        }, 0);
    },

    iOS: function iOS() {
        var iDevices = ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'];

        while (iDevices.length) {
            if (navigator.platform === iDevices.pop()) {
                return true;
            }
        }

        return false;
    },

    detectIE: function detectIE() {
        var userAgent = window.navigator.userAgent,
            msie = userAgent.indexOf('MSIE '),
            trident,
            edge;

        if (msie > 0) {
            return parseInt(userAgent.substring(msie + 5, userAgent.indexOf('.', msie)), 10);
        }

        trident = userAgent.indexOf('Trident/');
        if (trident > 0) {
            var rv = userAgent.indexOf('rv:');
            return parseInt(userAgent.substring(rv + 3, userAgent.indexOf('.', rv)), 10);
        }

        edge = userAgent.indexOf('Edge/');
        if (edge > 0) {
            return parseInt(userAgent.substring(edge + 5, userAgent.indexOf('.', edge)), 10);
        }

        return false;
    },

    noteShouldBePlayed: function noteShouldBePlayed(beatNumber) {
        if (this.state.noteResolution === '4') {
            if (beatNumber % 4) {
                return false;
            }
        }

        if (this.state.noteResolution === '12') {
            if ([1, 4, 7, 10].indexOf(beatNumber) > -1) {
                return false;
            }
        }

        if (this.state.noteResolution === '8') {
            if (beatNumber % 2) {
                return false;
            }
        }
        return true;
    },

    changeTempo: function changeTempo(event) {
        this.setState({ tempo: event.target.value }, this.startOver);
    },

    changeResolution: function changeResolution(value) {
        this.setState({ noteResolution: value }, function () {
            this.drawRuler();
            this.startOver();
        });
    },

    changeSignature: function changeSignature(value) {
        this.setState({ signature: value }, function () {
            this.drawRuler();
            this.startOver();
        });
    },

    changeVolume: function changeVolume(event) {
        this.setState({ volume: event.target.value / 100 });
    },

    toggleAccentFirstBeat: function toggleAccentFirstBeat() {
        this.setState({ accentFirstBeat: !this.state.accentFirstBeat }, this.startOver);
    },

    toggleUseOscillator: function toggleUseOscillator() {
        this.setState({ useOscillator: !this.state.useOscillator }, this.startOver);
    },

    popups: function popups() {
        $('.blue.question.icon').popup({
            transition: 'vertical flip',
            inline: true,
            hoverable: true,
            delay: {
                show: 300,
                hide: 800
            }
        });
    },

    componentDidMount: function componentDidMount() {
        var self = this;
        if (this.detectIE()) {
            this.popups();
            return;
        }
        this.init();
        $('.ui.resolution.radio.checkbox').checkbox({
            onChange: function onChange() {
                self.changeResolution(this.value);
            }
        });
        $('.ui.signature.radio.checkbox').checkbox({
            onChange: function onChange() {
                self.changeSignature(this.value);
            }
        });
    },

    componentDidUpdate: function componentDidUpdate() {},

    render: function render() {
        var playButtonText = this.state.isPlaying ? 'stop' : 'play',
            playButtonIcon = this.state.isPlaying ? 'red stop icon' : 'white play icon',
            volume = parseInt(this.state.volume * 100),
            IEVersion;

        if (IEVersion = this.detectIE()) {
            return React.createElement(
                'div',
                { className: 'ui negative message' },
                React.createElement(
                    'div',
                    { className: 'header' },
                    'Sorry internet explorer is not supported.'
                ),
                'Please install another browser (chrome, firefox, safari, opera etc).',
                React.createElement('i', { ref: 'notSupported', className: 'blue question icon' }),
                React.createElement(
                    'div',
                    { className: 'ui popup' },
                    'Unfortunately Internet explorer ',
                    IEVersion,
                    ' ',
                    React.createElement(
                        'a',
                        {
                            href: 'https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/currentTime',
                            target: '_blank' },
                        'does not support'
                    ),
                    ' currentTime property of audio context, and it is required to calculate actual time properly, without delays.'
                )
            );
        }
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
                        'a',
                        { href: 'https://github.com/alagodich/alagodich.github.io/blob/master/app/components/Metronome.js',
                            target: '_blank',
                            className: 'ui right corner blue label' },
                        React.createElement('i', { ref: 'notSupported', className: 'white github icon', style: { 'text-decoration': 'none', cursor: 'pointer' } })
                    ),
                    React.createElement('svg', { ref: 'svg' })
                ),
                React.createElement(
                    'div',
                    { className: 'extra content ui form' },
                    React.createElement(
                        'div',
                        { id: 'controls' },
                        React.createElement(
                            'div',
                            { id: 'tempo' },
                            'Tempo: ',
                            React.createElement(
                                'span',
                                null,
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
                        React.createElement(
                            'div',
                            { id: 'volume' },
                            'Volume: ',
                            React.createElement(
                                'span',
                                null,
                                volume,
                                '%'
                            ),
                            React.createElement('br', null),
                            React.createElement('input', {
                                id: 'volume',
                                type: 'range',
                                min: this.minVolume,
                                max: this.maxVolume,
                                value: volume,
                                onChange: this.changeVolume,
                                className: 'metronome__slider'
                            })
                        ),
                        React.createElement(
                            'div',
                            { style: { display: this.iOS() ? 'none' : 'block' } },
                            React.createElement('div', { className: 'ui divider' }),
                            React.createElement(
                                'div',
                                { className: 'ui oscillator toggle checked checkbox' },
                                React.createElement('input', {
                                    type: 'checkbox',
                                    tabindex: '0',
                                    'class': 'hidden',
                                    name: 'oscillator',
                                    checked: this.state.useOscillator,
                                    onChange: this.toggleUseOscillator }),
                                React.createElement(
                                    'label',
                                    null,
                                    'Digital sound'
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
                                    { className: 'ui resolution radio checkbox' },
                                    React.createElement('input', { type: 'radio',
                                        name: 'resolution',
                                        value: '4',
                                        tabindex: '0',
                                        className: 'hidden',
                                        checked: this.state.noteResolution === '4'
                                    }),
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
                                        className: 'hidden',
                                        checked: this.state.noteResolution === '8'
                                    }),
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
                                        value: '12',
                                        tabindex: '0',
                                        className: 'hidden',
                                        checked: this.state.noteResolution === '12'
                                    }),
                                    React.createElement(
                                        'label',
                                        null,
                                        'Shuffle'
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
                                        className: 'hidden',
                                        checked: this.state.signature === '4/4'
                                    }),
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
                                        className: 'hidden',
                                        checked: this.state.signature === '3/4'
                                    }),
                                    React.createElement(
                                        'label',
                                        null,
                                        '3/4'
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { style: { display: this.state.useOscillator ? 'block' : 'none' } },
                            React.createElement('div', { className: 'ui divider' }),
                            React.createElement(
                                'div',
                                { className: 'ui accent toggle checked checkbox' },
                                React.createElement('input', {
                                    type: 'checkbox',
                                    tabindex: '0',
                                    'class': 'hidden',
                                    name: 'accent',
                                    checked: this.state.accentFirstBeat,
                                    onChange: this.toggleAccentFirstBeat }),
                                React.createElement(
                                    'label',
                                    null,
                                    'Accent the first beat'
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'button',
                    { className: 'ui bottom primary attached button', onClick: this.play, ref: 'playButton' },
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

var Photo = React.createClass({
    displayName: 'Photo',

    googlePhotoUrl: 'https://lh3.googleusercontent.com/',
    render: function render() {
        var src = this.googlePhotoUrl + this.props.id;

        return React.createElement('img', { className: 'ui image', src: src, style: { 'max-height': 1000, 'margin-bottom': '1em' } });
    }
});

module.exports = Photo;

},{}],7:[function(require,module,exports){
'use strict';

var Profile = React.createClass({
    displayName: 'Profile',

    render: function render() {
        var items = [],
            images = [];
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
        this.props.avatar.forEach(function (imageUrl) {
            var className = images.length > 0 ? 'hidden content' : 'visible content';
            images.push(React.createElement('img', { src: imageUrl, className: className }));
        });
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'ui card' },
                React.createElement(
                    'div',
                    { className: 'ui slide masked reveal image' },
                    images
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

},{}],8:[function(require,module,exports){
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
        return React.createElement('div', { ref: 'youtubeContainer', className: 'ui embed', style: { 'margin-bottom': '1em' } });
    }
});

module.exports = Youtube;

},{}]},{},[1]);
