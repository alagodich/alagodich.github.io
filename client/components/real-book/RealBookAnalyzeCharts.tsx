import React, {ReactElement} from 'react';
import {default as _groupBy} from 'lodash/groupBy';
import {Divider, Segment} from 'semantic-ui-react';
import {useSelector} from 'react-redux';
import {RootState} from './store/reducer';

interface IChartSeriesItem {
    name: string;
    value?: number;
    children?: IChartSeriesItem[];
}

export const RealBookAnalyzeCharts = (): ReactElement => {
    const {songs} = useSelector((state: RootState) => state.library);

    function getStyleToKeysSeries(): IChartSeriesItem[] {
        const stylesToKeys: IChartSeriesItem[] = [];
        const byStyles = _groupBy(songs, 'style');

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

    function renderSeries(): ReactElement {
        return (
            <div>
                {getStyleToKeysSeries().map(style => (
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

    return (
        <Segment basic>
            {renderSeries()}
        </Segment>
    );
};

