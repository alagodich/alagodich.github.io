import React, {PureComponent, ReactElement} from 'react';
import {Table} from 'semantic-ui-react';
import Chord from './Chord';
import IRealProChartModel from './IRealProChartModel';
import {IIRealProChartBar, IIRealProChartSegment} from './types';

interface IChartProps {
    model: IRealProChartModel;
}

class Chart extends PureComponent<IChartProps, never> {
    public processLines(segment: IIRealProChartSegment): IIRealProChartBar[][] {
        if (!segment || !segment.data) {
            return [];
        }
        const lines: IIRealProChartBar[][] = [];
        let line: IIRealProChartBar[] = [];

        // eslint-disable-next-line complexity
        segment.data.forEach(barData => {
            const bar = Object.assign({}, barData);

            // Not rendering dividers for now
            if (bar.divider || !lines) {
                return;
            }

            if (line.length < 4) {
                // If it is a last bar in line, and has no closing line, add default
                if (line.length === 3 && !bar.close) {
                    bar.close = '|';
                    barData.close = '|';
                }

                line.push(bar);

                // If current closing bar line is not regular and current line is not and ending line, break the line
                if (bar.close && bar.close !== '|' && line[0] && !line[0].ending) {
                    lines.push(line);
                    line = [];
                }
            } else {
                lines.push(line);
                line = [bar];
            }
        });
        if (line.length) {
            // If the last line is less than 4 bars and it is an ending line, fill it to the size of 4
            if (line.length < 4 && line[0].ending) {
                const filler = new Array(4 - line.length).fill({empty: true});

                line = [...filler, ...line];
            }
            lines.push(line);
        }

        return lines;
    }

    public renderChart(): ReactElement {
        const tableRows: ReactElement[] = [];

        this.props.model.segments.forEach((segment, segmentKey) => {
            const headerCell = (
                <Table.Cell
                    width={1}
                    className="chart__section-header"
                >
                    {segment.name}
                </Table.Cell>
            );
            const lines = this.processLines(segment);

            if (!lines) {
                return;
            }

            lines.forEach((line, key) => {
                tableRows.push(
                    <Table.Row key={`${segmentKey}-${key}`} className="chart__bar-line">
                        {key === 0 ? headerCell : <Table.Cell className="chart__bar" width={1} />}
                        {line.map((bar, barKey) => <Chord key={barKey} {...bar} />)}
                    </Table.Row>
                );
            });
        });

        return (
            <Table
                basic="very"
                singleLine
                fixed
                columns={5}
                className="chart"
                unstackable
                attached="top"
            >
                <Table.Body>
                    {tableRows}
                </Table.Body>
            </Table>
        );
    }

    public render(): ReactElement {
        return <div>{this.props.model ? this.renderChart() : 'Loading...'}</div>;
    }
}

export default Chart;
