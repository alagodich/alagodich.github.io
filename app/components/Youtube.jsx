import React, {PropTypes, Component} from 'react';

const propTypes = {
    id: PropTypes.string.isRequired
};

class Youtube extends Component {

    componentDidMount() {
        $(this.container).embed({
            id: this.props.id,
            source: 'youtube',
            placeholder: '',
            autoplay: false
        });
    }

    render() {
        return <div ref={c => (this.container = c)} className="ui embed" style={{marginBottom: '1em'}} />;
    }

}

Youtube.propTypes = propTypes;

export default Youtube;
