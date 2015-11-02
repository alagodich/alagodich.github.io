'use strict';

var Youtube = require('./Youtube'),
    Image = require('./Image'),
    Profile = require('./Profile'),
    TODOs = require('./TODOs');

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
    var self = $(this);
    var name = self.data('name');
    var avatar = self.data('avatar');
    var description = self.data('description');
    React.render(<Profile name={name} avatar={avatar} description={description}></Profile>, this);
});

// Render todos
$('TODOs').each(function () {
    var items = $(this).data('items');
    React.render(<TODOs items={items}></TODOs>, this);
});

$('.popup').popup({
    transition: 'vertical flip'
});