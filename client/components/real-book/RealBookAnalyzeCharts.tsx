import React, {PureComponent, ReactElement} from 'react';
import {IIRealProChartModelProps} from './IRealProChartModel';

interface IRealBookAnalyzeChartsProps {
    songs: IIRealProChartModelProps[];
}

interface IRealBookAnalyzeChartsState {
    keysChart: {data: IChartSeriesItem[]};
}

interface IChartSeriesItem {
    name: string;
    value?: number;
    children?: IChartSeriesItem[];
}

class RealBookAnalyzeCharts extends PureComponent<IRealBookAnalyzeChartsProps, IRealBookAnalyzeChartsState> {
    constructor(props: IRealBookAnalyzeChartsProps) {
        super(props);

        this.state = {
            keysChart: {data: []}
        };
    }

    public componentDidMount(): void {
        this.loadKeysChartData();
    }

    public loadKeysChartData(): void {
        const keysChart: {data: IChartSeriesItem[]} = {
            data: [
                {
                    name: 'Keys',
                    children: []
                }
            ]
        };
        const keys: {[key: string]: number} = {};

        this.props.songs.forEach(song => {
            if (!keys[song.key]) {
                keys[song.key] = 1;
            } else {
                keys[song.key]++;
            }
        });

        Object.getOwnPropertyNames(keys).forEach(key => {
            const children: IChartSeriesItem[] = [];
            const styles: {[style: string]: number} = {};

            this.props.songs.filter(song => song.key === key).forEach(song => {
                if (!styles[song.style]) {
                    styles[song.style] = 1;
                } else {
                    styles[song.style]++;
                }
            });
            Object.getOwnPropertyNames(styles).forEach(style => {
                children.push({name: style, value: styles[style]});
            });

            if (keysChart.data[0].children) {
                keysChart.data[0].children.push({name: key, value: keys[key], children});
            }
        });
        this.setState({keysChart});
    }

    public render(): ReactElement {
        return (
            <div>{JSON.stringify(this.state.keysChart)}</div>
        );
    }

}

export default RealBookAnalyzeCharts;
