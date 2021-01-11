import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Table} from 'semantic-ui-react';
import Chord from './Chord.jsx';

const propTypes = {
    model: PropTypes.shape({
        title: PropTypes.string,
        author: PropTypes.string,
        style: PropTypes.string,
        key: PropTypes.string,
        chordString: PropTypes.string,
        segments: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            data: PropTypes.arrayOf(PropTypes.shape({
                chords: PropTypes.string,
                openingLine: PropTypes.string,
                closingLine: PropTypes.string,
                ending: PropTypes.string,
                timeSignature: PropTypes.string,
                divider: PropTypes.string,
                coda: PropTypes.bool
            }))
        }))
    })
};

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

class Chart extends PureComponent {
    processLines(segment) {
        if (!segment) {
            return null;
        }
        segment.lines = [];

        let line = [];

        segment.data.forEach(bar => {
            // Not rendering dividers for now
            if (bar.divider) {
                return;
            }

            if (line.length < 4) {
                // If it is a last bar in line, and has no closing line, add default
                if (line.length === 3 && !bar.closingLine) {
                    bar.closingLine = '|';
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

    renderChart() {
        const tableRows = [];
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

            segment.lines.forEach((line, key) => {
                tableRows.push(
                    <Table.Row key={`${segmentKey}-${key}`} className="chart__bar-line">
                        {key === 0 ? headerCell : <Table.Cell className="chart__bar" width={1} />}
                        {line.map((bar, key) => <Chord key={key} {...bar} />)}
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

    render() {
        return <div>{this.props.model ? this.renderChart() : 'Loading...'}</div>;
    }
}

Chart.propTypes = propTypes;

export default Chart;
