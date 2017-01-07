import React from 'react';
import {render} from 'react-dom';
import Menu from './components/Menu.jsx';
import Youtube from './components/Youtube.jsx';
import Photo from './components/Photo.jsx';
import Carousel from './components/Carousel.jsx';
import Profile from './components/Profile.jsx';
import {Popup} from 'semantic-ui-react';
import $ from 'jquery';

import './tags.jsx';

$('.component--menu').each(function () {
    const props = $(this).data();
    render(<Menu {...props} />, this);
});

$('youtube').each(function () {
    const id = $(this).data('id');
    if (typeof id === 'undefined') {
        return;
    }
    render(<Youtube id={id} />, this);
});

$('photo').each(function () {
    const src = $(this).data('src');
    if (typeof src === 'undefined') {
        return;
    }
    render(<Photo src={src} />, this);
});

$('carousel').each(function () {
    const items = $(this).data('items');
    render(<Carousel items={items} />, this);
});

$('profile').each(function () {
    const props = $(this).data();

    render(<Profile {...props} />, this);
});

// Init semantic popup
$('.popup').each(function () {
    const props = $(this).data();

    render(<Popup  trigger={<span>{this.innerHTML}</span>} content={props.content} />, this);
});
