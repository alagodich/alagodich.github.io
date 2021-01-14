import React, {PureComponent, ReactElement} from 'react';
import {Table} from 'semantic-ui-react';
import Chord from './Chord';
import IRealProChartModel, {IIRealProChartBar, IIRealProChartSegment} from './IRealProChartModel';

interface IChartProps {
    model: IRealProChartModel;
}

const styles = {
    table: {
        fontWeight: 500,
        fontSize: 20
    },
    sectionHeader: {
        fontWeight: 900,
        fontSize: 35
    }
};

class Chart extends PureComponent<IChartProps, never> {
    public processLines(segment: IIRealProChartSegment): IIRealProChartSegment {
        if (!segment || !segment.data) {
            return segment;
        }
        segment.lines = [] as IIRealProChartBar[][];

        let line: IIRealProChartBar[] = [];

        // eslint-disable-next-line complexity
        segment.data.forEach(barData => {
            const bar = Object.assign({}, barData);

            // Not rendering dividers for now
            if (bar.divider || !segment.lines) {
                return;
            }

            if (line.length < 4) {
                // If it is a last bar in line, and has no closing line, add default
                if (line.length === 3 && !bar.closingLine) {
                    bar.closingLine = '|';
                    barData.closingLine = '|';
                }

                line.push(bar);

                // If current closing bar line is not regular and current line is not and ending line, break the line
                if (bar.closingLine && bar.closingLine !== '|' && line[0] && !line[0].ending) {
                    segment.lines.push(line);
                    line = [];
                }
            } else {
                segment.lines.push(line);
                line = [bar];
            }
        });
        if (line.length) {
            // If the last line is less than 4 bars and it is an ending line, fill it to the size of 4
            if (line.length < 4 && line[0].ending) {
                const filler = new Array(4 - line.length).fill({empty: true});

                line = [...filler, ...line];
            }
            segment.lines.push(line);
        }

        return segment;
    }

    public renderChart(): ReactElement {
        const tableRows: ReactElement[] = [];
        const segments = this.props.model.segments
            .map(segment => this.processLines(segment));

        segments.forEach((segment, segmentKey) => {
            const headerCell = (
                <Table.Cell
                    width={1}
                    verticalAlign="top"
                    style={styles.sectionHeader}
                    className="chart__bar"
                >
                    {segment.name}
                </Table.Cell>
            );

            if (!segment.lines) {
                return;
            }

            segment.lines.forEach((line, key) => {
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
                style={styles.table}
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
