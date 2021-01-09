import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem.jsx';

const propTypes = {
    current: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        active: PropTypes.bool,
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        external: PropTypes.bool
    })).isRequired
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

        return <div className="ui text menu">{items}</div>;
    }

}

Menu.propTypes = propTypes;

export default Menu;
