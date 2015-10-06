'use strict';

var Youtube = require('./Youtube');
var Image = require('./Image');

// Render youtube frames
$('.post__video').each(function() {
    var id = $(this).attr('data-id');
    if (typeof id === 'undefined') {
        return;
    }
    React.render(<Youtube id={id}></Youtube>, this);
});

// Render images
$('.post__image').each(function() {
    var id = $(this).attr('data-id');
    if (typeof id === 'undefined') {
        return;
    }
    React.render(<Image id={id}></Image>, this);
});