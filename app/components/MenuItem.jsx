import React, {Component, PropTypes} from 'react';

const propTypes = {
    active: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

class MenuItem extends Component {
    render() {
        const external = this.props.external
                ? <i className="external icon"></i>
                : null,
            item = this.props.active
                ? <span className="header">{this.props.title}{external}</span>
                : <a className="header" href={this.props.url}>{this.props.title}{external}</a>;
        return (
            <div className="item">{item}</div>
        );
    }
}

MenuItem.propTypes = propTypes;

export default MenuItem;