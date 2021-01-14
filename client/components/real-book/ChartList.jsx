import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {List, Icon} from 'semantic-ui-react';

const propTypes = {
    charts: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    })),
    onClick: PropTypes.func
};

class ChartList extends PureComponent {

    handleChartClick(chartId) {
        return () => {
            this.props.onClick(chartId);
        };
    }

    render() {
        if (!this.props.charts || !this.props.charts.length) {
            return <div>{'Nothing found, try different search criteria.'}</div>;
        }

        const charts = this.props.charts.slice(0, 50).map(chart => (
            <List.Item key={chart.id}>
                <Icon name="options" />
                <List.Content>
                    <a onClick={this.handleChartClick(chart.id)}>
                        {chart.title} <span style={{opacity: 0.5}}>{`--[${chart.author}]`}</span>
                    </a>
                </List.Content>
            </List.Item>
        ));

        return (
            <List className="chart-list">
                {charts}
                {this.props.charts.length > 50
                    ? (
                        <p style={{marginTop: '1em'}}>
                            {`... ${this.props.charts.length} songs found, try narrowing the search.`}
                        </p>
                    )
                    : null}
            </List>
        );
    }
}

ChartList.propTypes = propTypes;

export default ChartList;
