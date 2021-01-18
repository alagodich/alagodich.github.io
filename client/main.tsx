import React from 'react';
import {render} from 'react-dom';
import {MainMenu} from './components/MainMenu';
import {Youtube} from './components/Youtube';
import {Photo} from './components/Photo';
import {Carousel} from './components/Carousel';
import {Profile} from './components/Profile';
import {Popup} from 'semantic-ui-react';

import '../semantic/dist/semantic.css';
import './style.less';

import './tags.ts';

const menuContainer: HTMLDivElement = document.getElementById('react--component--menu') as HTMLDivElement;

render(
    <React.StrictMode>
        <MainMenu
            current={menuContainer.dataset.current as string}
            items={JSON.parse(menuContainer.dataset.items as string)}
        />
    </React.StrictMode>,
    menuContainer
);

[...document.getElementsByTagName('youtube') as any].forEach(element => {
    const id = element.dataset.id;

    if (!id || id === '') {
        return;
    }
    render(<React.StrictMode><Youtube id={id} /></React.StrictMode>, element);
});

[...document.getElementsByTagName('photo') as any].forEach(element => {
    const src = element.dataset.src;

    if (!src || src === '') {
        return;
    }
    render(<React.StrictMode><Photo src={src} /></React.StrictMode>, element);
});

[...document.getElementsByTagName('carousel') as any].forEach(element => {
    const items = JSON.parse(element.dataset.items);

    if (!items) {
        return;
    }

    render(<React.StrictMode><Carousel items={items} /></React.StrictMode>, element);
});

[...document.getElementsByTagName('profile') as any].forEach(element => {
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

[...document.getElementsByClassName('popup') as any].forEach(element => {
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
