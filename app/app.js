'use strict';

var Image = require('./Image');

// Render all images
$('.react-image').each(function() {
    var url = $(this).attr('data-url');
    if (typeof url === 'undefined') {
        return;
    }
    React.render(<Image url={url}></Image>, this);
});