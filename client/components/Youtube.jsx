import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Embed} from 'semantic-ui-react';

const propTypes = {
    id: PropTypes.string.isRequired
};

class Youtube extends Component {

    render() {
        return (
            <Embed
                id={this.props.id}
                source="youtube"
                style={{marginBottom: '1em'}}
                autoplay={false}
                defaultActive
            />
        );
    }

}

Youtube.propTypes = propTypes;

export default Youtube;