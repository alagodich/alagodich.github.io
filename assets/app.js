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

},{}],3:[function(require,module,exports){
'use strict';

var Youtube = require('./Youtube');
var Image = require('./Image');

$('.post__video').each(function () {
    var id = $(this).attr('data-id');
    if (typeof id === 'undefined') {
        return;
    }
    React.render(React.createElement(Youtube, { id: id }), this);
});

$('.post__image').each(function () {
    var id = $(this).attr('data-id');
    if (typeof id === 'undefined') {
        return;
    }
    React.render(React.createElement(Image, { id: id }), this);
});

},{"./Image":1,"./Youtube":2}]},{},[3]);
