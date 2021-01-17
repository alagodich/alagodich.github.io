import React, {ReactElement, useEffect} from 'react';
import {Table} from 'semantic-ui-react';
import Chord from './Chord';
import {RouteComponentProps, Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {loadSong} from './store/library-slice';
import IRealProChartModel from './IRealProChartModel';
import {IIRealProChartBar, IIRealProChartSegment} from './types';
import {RootState} from './store/reducer';

interface IChartProps {
    playlist: string;
    songId: string;
}

export function processLines(segment: IIRealProChartSegment): IIRealProChartBar[][] {
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

export const Chart = (props: RouteComponentProps<IChartProps>): ReactElement | null => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {playlist, songId} = props.match.params;
    const {
        songs,
        activePlaylist,
        activeSong,
        error,
        displayType
    } = useSelector((state: RootState) => state.library);

    useEffect(() => {
        dispatch(loadSong(playlist, parseInt(songId, 10)));
    }, [playlist, songId]);

    useEffect(() => {
        // eslint-disable-next-line complexity
        function handleKeyPress(event: React.KeyboardEvent): void {
            if ((!activeSong && activeSong !== 0) || displayType !== 'chart') {
                return;
            }

            if (event.key === 'Escape' || event.key === 'c') {
                history.push(`/${activePlaylist}`);
            } else if (event.key === 'ArrowLeft') {
                if (songs[activeSong - 1]) {
                    history.push(`/${activePlaylist}/${activeSong - 1}`);
                }
            } else if (event.key === 'ArrowRight') {
                if (songs[activeSong + 1]) {
                    history.push(`/${activePlaylist}/${activeSong + 1}`);
                }
            }
        }

        document.addEventListener('keyup', handleKeyPress as any, false);
        return function cleanUp() {
            document.removeEventListener('keyup', handleKeyPress as any, false);
        };
    });

    function renderChart(): ReactElement | null {
        const tableRows: ReactElement[] = [];

        if (!activeSong && activeSong !== 0) {
            return null;
        }

        const model = new IRealProChartModel(songs[activeSong]);

        model.segments.forEach((segment, segmentKey) => {
            const headerCell = (
                <Table.Cell
                    width={1}
                    className="chart__section-header"
                >
                    {segment.name}
                </Table.Cell>
            );
            const lines = processLines(segment);

            if (!lines) {
                return;
            }

            lines.forEach((line: IIRealProChartBar[], key) => {
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

    return error
        ? <div>{error} <Link to={`/${playlist}`}>{'Back to playlist'}</Link></div>
        : (activeSong || activeSong === 0) ? renderChart() : null;
};

export default Chart;
