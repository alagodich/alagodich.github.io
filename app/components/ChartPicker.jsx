import React, {Component, PropTypes} from 'react';

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
                    <i className="music icon"></i>
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
