'use strict';

var Youtube = require('./components/Youtube'),
    Photo = require('./components/Photo'),
    Profile = require('./components/Profile'),
    //TODOs = require('./components/TODOs'),
    Menu = require('./components/Menu'),
    ReactMap = require('./components/ReactMap'),
    Carousel = require('./components/Carousel'),
    Metronome = require('./components/Metronome');

// Render youtube frames
$('youtube').each(function () {
    var id = $(this).data('id');
    if (typeof id === 'undefined') {
        return;
    }
    React.render(<Youtube id={id}/>, this);
});

// Render images
$('google-photo').each(function () {
    var id = $(this).data('id');

    if (typeof id === 'undefined') {
        return;
    }
    React.render(<Photo id={id}/>, this);
});

// Render google photo carousel
$('carousel').each(function () {
    var self = $(this);
    React.render(<Carousel items={self.data('items')}/>, this);
});

// Render profile
$('profile').each(function () {
    var self = $(this),
        name = self.data('name'),
        avatar = self.data('avatar'),
        description = self.data('description');
    React.render(<Profile name={name} avatar={avatar} description={description}/>, this);
});

// Render menu
$('react-menu').each(function () {
    var self = $(this);
    React.render(<Menu current={self.data('current')} items={self.data('items')}/>, this);
});

// Render todos
//$('TODOs').each(function () {
//    var items = $(this).data('items');
//    React.render(<TODOs items={items}></TODOs>, this);
//});

// Render map
var mapContainer = document.getElementById('mapContainer');
if (mapContainer) {
    React.render(<ReactMap/>, mapContainer);
}

// Render metronome
var metronomeContainer = document.getElementById('metronomeContainer');
if (metronomeContainer) {
    React.render(<Metronome/>, metronomeContainer);
}

// Init semantic popup
$('.popup').popup({
    transition: 'vertical flip'
});
