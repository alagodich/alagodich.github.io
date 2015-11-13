'use strict';

var Youtube = require('./components/Youtube'),
    Image = require('./components/Image'),
    Profile = require('./components/Profile'),
    TODOs = require('./components/TODOs'),
    Menu = require('./components/Menu'),
    ReactMap = require('./components/ReactMap'),
    Metronome = require('./components/Metronome');

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
    console.log('tes1t');

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

// Render metronome
var metronomeContainer = document.getElementById('metronomeContainer');
if (metronomeContainer) {
    React.render(<Metronome></Metronome>, metronomeContainer);
}

// Init semantic popup
$('.popup').popup({
    transition: 'vertical flip'
});
