(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var Image = React.createClass({
    displayName: "Image",

    render: function render() {
        return React.createElement(
            "div",
            { className: "react-image" },
            React.createElement("div", { className: "ui embed", "data-url": this.props.url })
        );
    }
});

module.exports = Image;

},{}],2:[function(require,module,exports){
'use strict';

var Image = require('./Image');

$('.react-image').each(function () {
    var url = $(this).attr('data-url');
    if (typeof url === 'undefined') {
        return;
    }
    React.render(React.createElement(Image, { url: url }), this);
});

},{"./Image":1}]},{},[2]);
