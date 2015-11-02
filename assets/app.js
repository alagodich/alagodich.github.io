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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
'use strict';

var Youtube = require('./Youtube'),
    Image = require('./Image'),
    Profile = require('./Profile'),
    TODOs = require('./TODOs');

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
    var self = $(this);
    var name = self.data('name');
    var avatar = self.data('avatar');
    var description = self.data('description');
    React.render(React.createElement(Profile, { name: name, avatar: avatar, description: description }), this);
});

$('TODOs').each(function () {
    var items = $(this).data('items');
    React.render(React.createElement(TODOs, { items: items }), this);
});

$('.popup').popup({
    transition: 'vertical flip'
});

},{"./Image":1,"./Profile":2,"./TODOs":3,"./Youtube":4}]},{},[5]);
