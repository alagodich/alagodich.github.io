import React from 'react';
import {render} from 'react-dom';
import Menu from './components/Menu.jsx';
import Youtube from './components/Youtube.jsx';
import Photo from './components/Photo.jsx';
import Carousel from './components/Carousel.jsx';
import Profile from './components/Profile.jsx';
import {Popup} from 'semantic-ui-react';

import '../semantic/dist/semantic.css';
import './style.less';

import './tags.jsx';

const menuContainer = document.getElementById('react--component--menu');

render(
    <Menu
        current={menuContainer.dataset.current}
        items={JSON.parse(menuContainer.dataset.items)}
    />,
    menuContainer
);

[...document.getElementsByTagName('youtube')].forEach(element => {
    const id = element.dataset.id;

    if (!id || id === '') {
        return;
    }
    render(<Youtube id={id} />, element);
});

[...document.getElementsByTagName('photo')].forEach(element => {
    const src = element.dataset.src;

    if (!src || src === '') {
        return;
    }
    render(<Photo src={src} />, element);
});

[...document.getElementsByTagName('carousel')].forEach(element => {
    const items = JSON.parse(element.dataset.items);

    if (!items) {
        return;
    }

    render(<Carousel items={items} />, element);
});

[...document.getElementsByTagName('profile')].forEach(element => {
    const props = {
        name: element.dataset.name,
        avatar: JSON.parse(element.dataset.avatar),
        description: JSON.parse(element.dataset.description)
    };

    if (!props) {
        return;
    }

    render(<Profile {...props} />, element);
});

[...document.getElementsByClassName('popup')].forEach(element => {
    const content = element.dataset.content;

    if (!content || content === '') {
        return;
    }

    render(<Popup trigger={<span>{element.innerHTML}</span>} content={content} />, element);
});
