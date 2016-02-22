import React from 'react';
import {render} from 'react-dom';
import Menu from './components/Menu.jsx';
import Youtube from './components/Youtube.jsx';
import Photo from './components/Photo.jsx';
import Carousel from './components/Carousel.jsx';
import Profile from './components/Profile.jsx';
import TODOs from './components/TODOs.jsx';

// import './style.less';
// import 'semantic-ui/dist/semantic.css';
// import 'semantic-ui/dist/semantic.js';

$('youtube').each(function () {
    const id = $(this).data('id');
    if (typeof id === 'undefined') {
        return;
    }
    render(<Youtube id={id} />, this);
});

$('.component--menu').each(function () {
    const props = $(this).data();
    render(<Menu {...props} />, this);
});

$('google-photo').each(function () {
    const id = $(this).data('id');
    if (typeof id === 'undefined') {
        return;
    }
    render(<Photo id={id} />, this);
});

$('carousel').each(function () {
    const items = $(this).data('items');
    render(<Carousel items={items} />, this);
});

$('profile').each(function () {
    const props = $(this).data();

    render(<Profile {...props} />, this);
});

// Render todos
$('TODOs').each(function () {
    const items = $(this).data('items');
    render(<TODOs items={items} />, this);
});

// Init semantic popup
$('.popup').popup({
    transition: 'vertical flip'
});

