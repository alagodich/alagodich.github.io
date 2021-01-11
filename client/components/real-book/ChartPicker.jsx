import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    charts: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        file: PropTypes.string
    })),
    onClick: PropTypes.func
};

class ChartPicker extends PureComponent {

    handleChartClick(chartIndex) {
        return () => {
            this.props.onClick(chartIndex);
        };
    }

    render() {
        const charts = this.props.charts.map((chart, index) => (
            <div key={index} className="item">
                <i className="options icon"/>
                <a className="content" onClick={this.handleChartClick(index)}>
                    {chart.title}
                </a>
            </div>
        ));

        return <div className="ui list">{charts}</div>;
    }
}

ChartPicker.propTypes = propTypes;

export default ChartPicker;
