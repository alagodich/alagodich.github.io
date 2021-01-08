import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    charts: PropTypes.array,
    onClick: PropTypes.func
};

class ChartPicker extends Component {

    render() {
        const items = this.props.charts.map((chart, index) => {
            const pickThisChart = () => this.props.onClick(chart);

            return (
                <div key={index} className="item">
                    <i className="options icon"/>
                    <a className="content" onClick={pickThisChart}>
                        {chart.title}
                    </a>
                </div>
            );
        });
        return (
            <div className="ui list">{items}</div>
        );
    }
}

ChartPicker.propTypes = propTypes;

export default ChartPicker;
