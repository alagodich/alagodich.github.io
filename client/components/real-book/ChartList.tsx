import React, {ReactElement} from 'react';
import {List, Icon} from 'semantic-ui-react';
import {IIRealProChartModelProps} from './IRealProChartModel';

interface IChartListProps {
    onClick: (chartId: number) => void;
    charts: IIRealProChartModelProps[];
}

export const ChartList = (props: IChartListProps): ReactElement => {

    function handleChartClick(chartId: number | undefined): () => void {
        return () => {
            if (chartId !== undefined) {
                props.onClick(chartId);
            }
        };
    }

    if (!props.charts || !props.charts.length) {
        return <div>{'Nothing found, try different search criteria.'}</div>;
    }

    const charts = props.charts.slice(0, 50).map(chart => (
        <List.Item key={chart.id}>
            <Icon name="options"/>
            <List.Content>
                <a onClick={handleChartClick(chart.id)}>
                    {chart.title} <span style={{opacity: 0.5}}>{`--[${chart.author}]`}</span>
                </a>
            </List.Content>
        </List.Item>
    ));

    return (
        <List className="chart-list">
            {charts}
            {props.charts.length > 50
                ? (
                    <p style={{marginTop: '1em'}}>
                        {`... ${props.charts.length} songs found, try narrowing the search.`}
                    </p>
                )
                : null}
        </List>
    );
};
