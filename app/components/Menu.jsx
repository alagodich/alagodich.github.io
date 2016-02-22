import React, {PropTypes, Component} from 'react';
import MenuItem from './MenuItem.jsx';

const propTypes = {
    current: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
};

class Menu extends Component {

    render() {
        const items = this.props.items.map((item, index) => (
            <MenuItem key={index} {...item} current={this.props.current} />
        ));

        return (<div className="ui text menu">{items}</div>);
    }

}

Menu.propTypes = propTypes;

export default Menu;
