import React, {PropTypes, Component} from 'react';

const propTypes = {
        id: PropTypes.string.isRequired
    },
    googlePhotoUrl = 'https://lh3.googleusercontent.com/';

class Photo extends Component {
    render() {
        const src = googlePhotoUrl + this.props.id;
        return <img className="ui image" src={src} style={{maxHeight: 1000, marginBottom: '1em'}} />;
    }
}

Photo.propTypes = propTypes;

export default Photo;
