import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    src: PropTypes.string.isRequired
};

class Photo extends Component {
    render() {
        const src = `/images/${this.props.src}`;

        return <img alt="" className="ui image" src={src} style={{maxHeight: 750, marginBottom: '1em'}} />;
    }
}

Photo.propTypes = propTypes;

export default Photo;
