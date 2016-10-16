import React, {PropTypes, Component} from 'react';

const propTypes = {
    items: PropTypes.array
};

class TODOs extends Component {

    render() {
        const items = this.props.items.map((item, index) => (
            <div key={index} className="item">
                <i className="settings icon"/>
                <div className="content">
                    {item}
                </div>
            </div>
        ));
        return (
            <div className="ui list">
                <div className="item header">{'TODOs'}</div>
                {items}
            </div>
        );
    }

}

TODOs.propTypes = propTypes;

export default TODOs;
