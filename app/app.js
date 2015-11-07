'use strict';

var Youtube = require('./Youtube'),
    Image = require('./Image'),
    Profile = require('./Profile'),
    TODOs = require('./TODOs'),
    Menu = require('./Menu'),
    ReactMap = require('./ReactMap');

// Render youtube frames
$('.post__video').each(function () {
    var id = $(this).data('id');
    if (typeof id === 'undefined') {
        return;
    }
    React.render(<Youtube id={id}></Youtube>, this);
});

// Render images
$('.post__image').each(function () {
    var id = $(this).data('id');
    if (typeof id === 'undefined') {
        return;
    }
    React.render(<Image id={id}></Image>, this);
});

// Render profile
$('.blog__profile').each(function () {
    var self = $(this),
        name = self.data('name'),
        avatar = self.data('avatar'),
        description = self.data('description');
    React.render(<Profile name={name} avatar={avatar} description={description}></Profile>, this);
});

// Render menu
$('.menu--react').each(function () {
    var self = $(this);
    React.render(<Menu current={self.data('current')} items={self.data('items')}></Menu>, this);
});

// Render todos
$('TODOs').each(function () {
    var items = $(this).data('items');
    React.render(<TODOs items={items}></TODOs>, this);
});

// Render map
var mapContainer = document.getElementById('mapContainer');
if (mapContainer) {
    React.render(<ReactMap></ReactMap>, mapContainer);
}

// Init semantic popup
$('.popup').popup({
    transition: 'vertical flip'
});
