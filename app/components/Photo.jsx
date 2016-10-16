import React, {PropTypes, Component} from 'react';

const propTypes = {
    src: PropTypes.string.isRequired
};

class Photo extends Component {
    render() {
        const src = `/images/${this.props.src}`;
        return <img className="ui image" src={src} style={{maxHeight: 1000, marginBottom: '1em'}} />;
    }
}

Photo.propTypes = propTypes;

export default Photo;
