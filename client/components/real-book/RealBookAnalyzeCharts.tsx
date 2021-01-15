import React, {PureComponent, ReactElement} from 'react';
import {IIRealProChartModelProps} from './types';
import {default as _groupBy} from 'lodash/groupBy';
import {Divider} from 'semantic-ui-react';

interface IRealBookAnalyzeChartsProps {
    songs: IIRealProChartModelProps[];
}

interface IChartSeriesItem {
    name: string;
    value?: number;
    children?: IChartSeriesItem[];
}

class RealBookAnalyzeCharts extends PureComponent<IRealBookAnalyzeChartsProps, never> {
    public getStyleToKeysSeries(): IChartSeriesItem[] {
        const stylesToKeys: IChartSeriesItem[] = [];
        const byStyles = _groupBy(this.props.songs, 'style');

        Object.getOwnPropertyNames(byStyles).forEach((styleName: string) => {
            const style: IChartSeriesItem = {
                name: styleName,
                children: []
            };

            const byKey = _groupBy(byStyles[styleName], 'key');

            Object.getOwnPropertyNames(byKey).forEach((key: string) => {
                style.children?.push({name: key, value: byKey[key].length});
            });

            stylesToKeys.push(style);
        });

        return stylesToKeys;
    }

    public renderSeries(): ReactElement {
        return (
            <div>
                {this.getStyleToKeysSeries().map(style => (
                    <div key={style.name}>
                        <span style={{textDecoration: 'underline'}}>
                            {`${style.name} [${style.children?.reduce((counter: number, key: IChartSeriesItem) =>
                                counter + (key && key.value ? key.value : 0), 0)}]`}
                        </span>
                        <br />
                        {style.children?.map(key => `${key.name}[${key.value}]`).join(' / ')}
                        <Divider />
                    </div>
                ))}
            </div>
        );
    }

    public render(): ReactElement {
        return (
            <div>{this.renderSeries()}</div>
        );
    }

}

export default RealBookAnalyzeCharts;
