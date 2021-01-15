/* eslint react/no-set-state: 0 */

import React, {Component, ReactElement} from 'react';
import Chart from './Chart';
import {ChartList} from './ChartList';
import IRealProUrlParser from './IRealProUrlParser';
import IRealProChartModel from './IRealProChartModel';
import {IIRealProChartModelProps} from './types';
import {Menu, Input, Header, Icon, Grid} from 'semantic-ui-react';
import {default as _escapeRegExp} from 'lodash/escapeRegExp';
import {default as _filter} from 'lodash/filter';
import RealBookAnalyzeCharts from './RealBookAnalyzeCharts';

interface IRealBookState {
    header: string;
    subHeader: string;
    chart: IRealProChartModel | null;
    loading: boolean;
    library: IIRealProChartModelProps[];
    searchFilter: string;
    filteredSongs: IIRealProChartModelProps[];
    analyzeCharts: boolean;
}

function getPlaylist(name: string): Promise<any> {
    // eslint-disable-next-line no-inline-comments
    return import(/* webpackChunkName: "[request]" */ `./playlists/${name}.ts`)
        .then(data => data.default);
}

function updateHash(hash: string): void {
    if (history && history.pushState) {
        history.pushState(null, '', hash);
    } else {
        location.hash = hash;
    }
}

const title = 'Real Book';

class RealBook extends Component<Record<string, unknown>, IRealBookState> {
    constructor(props: Record<string, unknown>) {
        super(props);

        this.state = {
            header: title,
            subHeader: '',
            chart: null,
            loading: true,
            library: [],
            searchFilter: '',
            filteredSongs: [],
            analyzeCharts: false
        };

        this.handleChartChange = this.handleChartChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleHashChange = this.handleHashChange.bind(this);
        this.handleChartClose = this.handleChartClose.bind(this);
    }

    /**
     * Init metronome after the component is mounted
     * Init checkboxes
     */
    public componentDidMount(): void {
        document.addEventListener('keyup', this.handleKeyPress as any, false);
        window.addEventListener('hashchange', this.handleHashChange, false);

        this.loadLibrary();
    }

    public componentWillUnmount(): void {
        document.removeEventListener('keyup', this.handleKeyPress as any, false);
        window.removeEventListener('hashchange', this.handleHashChange, false);
    }

    public handleKeyPress(event: React.KeyboardEvent): void {
        if (event.key === 'Escape') {
            event.preventDefault();
            this.handleChartClose();
        } else if (this.state.chart && event.key === 'ArrowLeft') {
            const hash = decodeURI(window.location.hash).split('#')[1];
            const id = parseInt(hash, 10);

            if (this.state.library[id - 1]) {
                this.handleChartChange(id - 1);
            }
        } else if (this.state.chart && event.key === 'ArrowRight') {
            const hash = decodeURI(window.location.hash).split('#')[1];
            const id = parseInt(hash, 10);

            if (this.state.library[id + 1]) {
                this.handleChartChange(id + 1);
            }
        }
    }

    private loadLibrary(): void {
        // getPlaylist('latin').then(data => {
        //     const parser = new IRealProUrlParser();
        //     const latinSongs = [];
        //
        //     data.forEach(playlist => {
        //         latinSongs.push(...parser.parse(playlist.url));
        //     });
        //     this.setState({loading: false, library: latinSongs});
        // });

        getPlaylist('jazz').then(data => {
            const parser = new IRealProUrlParser();
            const jazzStandards: IIRealProChartModelProps[] = [];

            data.forEach((url: string) => {
                jazzStandards.push(...parser.parse(url) as any);
            });

            const mappedSongs = jazzStandards.map((song, index) => {
                song.id = index;
                return song;
            });

            this.setState({loading: false, library: mappedSongs, filteredSongs: mappedSongs});
            // Initial hash read on page load (component mount)
            this.handleHashChange();
        });
    }

    private loadChart(id: number) {
        const chartProps = this.state.library[id];

        if (!chartProps) {
            throw new Error('Incorrect chart props');
        }

        const chart = new IRealProChartModel(chartProps);

        this.setState({
            chart,
            header: chart.title,
            subHeader: `${chart.author} // ${chart.style} // ${chart.key}`
        });
    }

    private handleHashChange() {
        const hash = decodeURI(window.location.hash).split('#')[1];
        const id = parseInt(hash, 10);

        if (hash && hash !== '' && id.toString() === hash) {
            if (this.state.library[id]) {
                this.loadChart(id);
            }
        }
    }

    private handleChartChange(id: number): void {
        if (!this.state.library[id]) {
            throw new Error('Song does not exists');
        }
        updateHash(`#${id}`);
        this.loadChart(id);
    }

    private handleSearchFilterChange() {
        return (event: React.ChangeEvent, {value}: {value: string}) => {
            this.setState({searchFilter: value, loading: true});

            setTimeout(() => {
                if (this.state.searchFilter.length < 1) {
                    return this.setState({
                        searchFilter: '',
                        filteredSongs: this.state.library,
                        loading: false
                    });
                }

                const regExp = new RegExp(_escapeRegExp(this.state.searchFilter), 'i');
                const isMatch = (item: IIRealProChartModelProps) => regExp.test(item.title + item.author);

                return this.setState({
                    loading: false,
                    filteredSongs: _filter(this.state.library, isMatch)
                });
            }, 300);
        };
    }

    private handleClearFilter() {
        return () => this.setState({
            searchFilter: '',
            filteredSongs: this.state.library,
            loading: false,
            chart: null
        });
    }

    private handleChartClose() {
        updateHash('#');

        this.setState({
            header: '',
            subHeader: '',
            chart: null
        });
    }

    private handleToggleAnalyzeCharts() {
        return () => {
            this.setState({analyzeCharts: !this.state.analyzeCharts, chart: null});
        };
    }

    private renderMenu(): ReactElement {
        const rightMenu = this.state.chart
            ? (
                <Menu.Menu position="right">
                    <Header as="h2" textAlign="right">
                        <Header.Content>
                            {this.state.chart
                                ? (
                                    <a onClick={this.handleChartClose} title="You can press Esc to close the chart.">
                                        <Icon name="angle double left" color="blue" style={{cursor: 'pointer'}} />
                                    </a>
                                )
                                : null}
                            {this.state.header}
                            <Header.Subheader>
                                {this.state.subHeader}
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                </Menu.Menu>
            )
            : (
                <Menu.Menu position="right">
                    {<Menu.Item>
                        <Icon
                            name="chart line"
                            style={{cursor: 'pointer'}}
                            title="Analyze data"
                            onClick={this.handleToggleAnalyzeCharts()}
                            color={this.state.analyzeCharts ? 'blue' : 'grey'}
                        />
                    </Menu.Item>}
                    {
                        this.state.searchFilter && this.state.searchFilter.trim() !== ''
                            ? (
                                <Menu.Item>
                                    <Icon
                                        name="delete"
                                        color="red"
                                        title="Clear filter"
                                        onClick={this.handleClearFilter()}
                                    />
                                </Menu.Item>
                            )
                            : null
                    }
                    <Input
                        icon="search"
                        transparent
                        placeholder="Search..."
                        value={this.state.searchFilter}
                        onChange={this.handleSearchFilterChange()}
                    />
                </Menu.Menu>
            );
        const leftHeader = this.state.chart
            ? null
            : (
                <Header as="h2" style={{marginBottom: 0}}>
                    <Header.Content>{title}</Header.Content>
                </Header>
            );

        return (
            <Menu secondary text pointing>
                {leftHeader}
                {rightMenu}
            </Menu>
        );
    }

    public render(): ReactElement {
        const content = this.state.chart
            ? <Chart model={this.state.chart} />
            : (
                <Grid columns={2} stackable>
                    <Grid.Column>
                        <ChartList charts={this.state.filteredSongs} onClick={this.handleChartChange} />
                    </Grid.Column>
                    <Grid.Column>
                        {this.state.analyzeCharts
                            ? <RealBookAnalyzeCharts songs={this.state.filteredSongs} />
                            : null
                        }
                    </Grid.Column>
                </Grid>
            );

        return (
            <div className="realbook">
                {this.renderMenu()}
                {this.state.loading
                    ? <div>{'...loading'}</div>
                    : <div className="ui basic segment">{content}</div>
                }
            </div>
        );
    }
}

export default RealBook;
