import React, {PropTypes, Component} from 'react';
import MenuItem from './MenuItem.jsx';

const propTypes = {
    current: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
};

class Menu extends Component {

    render() {
        const items = this.props.items.map((item, index) => {
            let active = this.props.current === item.url;
            if (item.url === '/index.html' && this.props.current === '/') {
                active = true;
            }
            return <MenuItem key={index} {...item} active={active} />;
        });

        return (<div className="ui text menu">{items}</div>);
    }

}

Menu.propTypes = propTypes;

export default Menu;