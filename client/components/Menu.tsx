import React, {ReactElement} from 'react';
import {Menu as SemanticMenu} from 'semantic-ui-react';

interface IMenuItem {
    active: boolean;
    url: string;
    title: string;
    external: boolean;
}

interface IMenuProps {
    current: string;
    items: IMenuItem[];
}

export const Menu = (props: IMenuProps): ReactElement => {
    const items = props.items.map((itemProps, index) => {
        let active = props.current === itemProps.url;

        if (itemProps.url === '/index.html' && props.current === '/') {
            active = true;
        }

        const external = itemProps.external
                ? <i className="external icon"/>
                : null,
            item = active
                ? <span className="header">{itemProps.title}{external}</span>
                : <a className="header" href={itemProps.url}>{itemProps.title}{external}</a>;

        return <SemanticMenu.Item key={index}>{item}</SemanticMenu.Item>;
    });

    return <SemanticMenu text>{items}</SemanticMenu>;
};

export default Menu;
