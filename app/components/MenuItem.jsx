import React, {Component, PropTypes} from 'react';

const propTypes = {
    current: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

class MenuItem extends Component {
    render() {
        let item;
        if (this.props.current === this.props.url) {
            item = <span className="header">{this.props.title}</span>;
        } else {
            item = <a className="header" href={this.props.url}>{this.props.title}</a>;
        }
        return (
            <div className="item">{item}</div>
        );
    }
}

MenuItem.propTypes = propTypes;

export default MenuItem;
