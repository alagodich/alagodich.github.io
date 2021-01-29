import React, {ReactElement, useState} from 'react';
import {Menu, Sidebar, Icon} from 'semantic-ui-react';
import {useMediaQuery} from 'react-responsive';

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

const Desktop = ({children}: any) => {
    const isDesktop = useMediaQuery({minWidth: 768});

    return isDesktop ? children : null;
};

const Mobile = ({children}: any) => {
    const isMobile = useMediaQuery({maxWidth: 767});

    return isMobile ? children : null;
};

export const MainMenu = React.memo((props: IMenuProps): ReactElement => {
    const [visible, setVisible] = useState(false);

    const items = props.items.map((itemProps, index) => {
        let active = props.current === itemProps.url;

        if (itemProps.url === '/index.html' && props.current === '/') {
            active = true;
        }

        const external = itemProps.external
            ? <i className="external icon"/>
            : null;
        const item = active
            ? <span className="header">{itemProps.title}{external}</span>
            : <a className="header" href={itemProps.url}>{itemProps.title}{external}</a>;

        return <Menu.Item key={index}>{item}</Menu.Item>;
    });

    function handleSetVisible(visibility: boolean) {
        return () => setVisible(visibility);
    }

    return (
        <>
            <Desktop>
                <Menu stackable text>
                    {items}
                </Menu>
            </Desktop>
            <Mobile>
                <Menu pointing secondary size="large">
                    {visible
                        ? null
                        : (
                            <Menu.Item onClick={handleSetVisible(true)}>
                                <Icon name="sidebar" />
                            </Menu.Item>
                        )
                    }
                </Menu>
                <Sidebar
                    as={Menu}
                    inverted
                    onHide={handleSetVisible(false)}
                    vertical
                    visible={visible}
                    direction="left"
                >
                    {items}
                </Sidebar>
            </Mobile>
        </>
    );
});
