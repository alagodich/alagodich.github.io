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
    <React.StrictMode>
        <Menu current={menuContainer.dataset.current} items={JSON.parse(menuContainer.dataset.items)} />
    </React.StrictMode>,
    menuContainer
);

[...document.getElementsByTagName('youtube')].forEach(element => {
    const id = element.dataset.id;

    if (!id || id === '') {
        return;
    }
    render(<React.StrictMode><Youtube id={id} /></React.StrictMode>, element);
});

[...document.getElementsByTagName('photo')].forEach(element => {
    const src = element.dataset.src;

    if (!src || src === '') {
        return;
    }
    render(<React.StrictMode><Photo src={src} /></React.StrictMode>, element);
});

[...document.getElementsByTagName('carousel')].forEach(element => {
    const items = JSON.parse(element.dataset.items);

    if (!items) {
        return;
    }

    render(<React.StrictMode><Carousel items={items} /></React.StrictMode>, element);
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

    render(<React.StrictMode><Profile {...props} /></React.StrictMode>, element);
});

[...document.getElementsByClassName('popup')].forEach(element => {
    const content = element.dataset.content;

    if (!content || content === '') {
        return;
    }

    // Semantic react Popup still uses ref to find a node, gives warnings in Strict Mode
    render(
        <React.StrictMode>
            <Popup trigger={<span>{element.innerHTML}</span>} content={content} />
        </React.StrictMode>,
        element
    );
});
