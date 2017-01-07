import React, {PropTypes, Component} from 'react';
import {Embed} from 'semantic-ui-react';

const propTypes = {
    id: PropTypes.string.isRequired
};

class Youtube extends Component {

    render() {
        return <Embed
            id={this.props.id}
            source="youtube"
            style={{marginBottom: '1em'}}
            autoplay={false}
            defaultActive={true}
        />;
    }

}

Youtube.propTypes = propTypes;

export default Youtube;
