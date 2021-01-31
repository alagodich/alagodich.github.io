import React, {ReactElement, useEffect} from 'react';
import {Segment, Grid} from 'semantic-ui-react';
// import {ChartBar} from './ChartBar';
import {SvgChartBar} from './SvgChartBar';
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

/**
 * If the ending line is less than 4 bars, fill it to the size of 4
 *
 * @param line
 * @param lineLength
 */
function fillEndingLineToSize4WithEmptyBars(line: IIRealProChartBar[], lineLength = 4) {
    if (line.length < lineLength && line[0].ending) {
        const filler = new Array(lineLength - line.length).fill({empty: true});

        return [...filler, ...line];
    }

    return line;
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

        // Not rendering dividers for now, but it should break the line
        if (bar.divider) {
            if (line.length) {
                lines.push(fillEndingLineToSize4WithEmptyBars(line, lines[lines.length - 1]?.length));
                line = [];
            }
            return;
        }

        if (line.length < 4) {
            // If it is a last bar in line, and has no closing line, add default
            if (line.length === 3 && !bar.close) {
                bar.close = '|';
            }

            // If current closing bar line is not regular and current line is not and ending line, break the line
            if (bar.close && bar.close !== '|' && line[0] && !line[0].ending) {
                // Fix closing bar lines, if it has opening sign for some reason
                if (bar.close && ['[', '}'].includes(bar.close)) {
                    bar.close = bar.close === '['
                        ? ']'
                        : '}';
                }
                line.push(bar);
                lines.push(line);
                line = [];
            } else {
                line.push(bar);
            }
        } else {
            lines.push(line);
            line = [bar];
        }
    });

    if (line.length) {
        // If the last line is less than 4 bars and it is an ending line, fill it to the size of 4
        lines.push(fillEndingLineToSize4WithEmptyBars(line, lines[lines.length - 1]?.length));
    }

    return lines;
}

export const Chart = React.memo((props: RouteComponentProps<IChartProps>): ReactElement | null => {
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
    const {notation} = useSelector((state: RootState) => state.chart);

    useEffect(() => {
        dispatch(loadSong(playlist, parseInt(songId, 10)));
    }, [playlist, songId]);

    useEffect(() => {
        // eslint-disable-next-line complexity
        function handleKeyPress(event: React.KeyboardEvent): void {
            if ((!activeSong && activeSong !== 0) || displayType !== 'chart') {
                return;
            }

            if (event.key === 'Escape' || event.key === 'q') {
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
        const segments: ReactElement[] = [];

        if (!activeSong && activeSong !== 0) {
            return null;
        }
        const shouldSuppressTuneAdjective = notation === 'berklee';
        const model = new IRealProChartModel(songs[activeSong], shouldSuppressTuneAdjective);

        model.segments.forEach((segment, segmentKey) => {
            const lines = processLines(segment);
            const gridRows: ReactElement[] = [];

            if (!lines) {
                return;
            }

            lines.forEach((line: IIRealProChartBar[], key) => {
                gridRows.push(
                    <Grid.Row key={key}>
                        {line.map((bar, barKey) => (
                            <Grid.Column width={4} key={barKey}>
                                <SvgChartBar {...bar} notation={notation} />
                            </Grid.Column>
                        ))}
                    </Grid.Row>
                );
            });

            segments.push(
                <Grid columns={16} className="chart" key={segmentKey}>
                    <Grid.Column width={1} className="chart__section-header">
                        {segment.name ?? ' '}
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <Grid columns={4}>
                            {gridRows}
                        </Grid>
                    </Grid.Column>
                </Grid>
            );
        });

        return (
            <>
                {model.errors.length
                    ? model.errors.map((modelError: string, key) => (
                        <Segment basic inverted key={key}>{`Error: ${modelError}`}</Segment>
                    ))
                    : null
                }
                {segments}
            </>
        );
    }

    return error
        ? <div>{error} <Link to={`/${playlist}`}>{'Back to playlist'}</Link></div>
        : (activeSong || activeSong === 0) ? renderChart() : null;
});

export default Chart;
