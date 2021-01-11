/* eslint no-console: 0 */
/* eslint react/no-set-state: 0 */

import React, {PureComponent} from 'react';
import Chart from './Chart.jsx';
import ChartList from './ChartList.jsx';
import IRealProUrlParser from './IRealProUrlParser';
import IRealProChartModel from './IRealProChartModel';
import {Menu, Input, Header, Icon} from 'semantic-ui-react';
import {default as _escapeRegExp} from 'lodash/escapeRegExp';
import {default as _filter} from 'lodash/filter';

function getPlaylist(name) {
    // eslint-disable-next-line no-inline-comments
    return import(/* webpackChunkName: "[request]" */ `./playlists/${name}.js`)
        .then(data => data.default);
}

const title = 'Real Book';

class RealBook extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            header: title,
            subHeader: null,
            chart: null,
            loading: true,
            library: [],
            searchFilter: '',
            filteredSongs: []
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
    componentDidMount() {
        document.addEventListener('keyup', this.handleKeyPress, false);
        window.addEventListener('hashchange', this.handleHashChange, false);

        this.loadLibrary();
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.handleKeyPress, false);
        window.removeEventListener('hashchange', this.handleHashChange, false);
    }

    handleKeyPress(event) {
        if (event.key === 'Escape') {
            event.preventDefault();
            this.handleChartClose();
        }
    }

    loadLibrary() {
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
            const jazzStandards = [];

            data.forEach(url => {
                jazzStandards.push(...parser.parse(url));
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

    loadChart(id) {
        const chartProps = this.state.library[id];

        if (!chartProps) {
            throw new Error('Incorrect chart props');
        }

        const chart = new IRealProChartModel(chartProps);

        this.setState({
            chart,
            header: chart.title,
            subHeader: chart.author
        });
    }

    handleHashChange() {
        const hash = decodeURI(window.location.hash).split('#')[1];
        const id = parseInt(hash, 10);

        if (hash && hash !== '' && id.toString() === hash) {
            if (this.state.library[id]) {
                this.loadChart(id);
            }
        }
    }

    updateHash(hash) {
        if (history && history.pushState) {
            history.pushState(null, null, hash);
        } else {
            location.hash = hash;
        }
    }

    handleChartChange(id) {
        const chartId = parseInt(id, 10);

        if (chartId !== id) {
            throw new Error('Invalid chart id');
        }
        if (!this.state.library[chartId]) {
            throw new Error('Song does not exists');
        }
        this.updateHash(`#${chartId}`);
        this.loadChart(chartId);
    }

    handleSearchFilterChange() {
        return (event, {value}) => {
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
                const isMatch = item => regExp.test(item.title + item.author);

                return this.setState({
                    loading: false,
                    filteredSongs: _filter(this.state.library, isMatch)
                });
            }, 300);
        };
    }

    handleClearFilter() {
        return () => this.setState({
            searchFilter: '',
            filteredSongs: this.state.library,
            loading: false
        });
    }

    handleChartClose() {
        this.updateHash('#');

        this.setState({
            header: title,
            subHeader: null,
            chart: null
        });
    }

    render() {
        const content = this.state.chart
                ? <Chart model={this.state.chart} />
                : <ChartList charts={this.state.filteredSongs} onClick={this.handleChartChange} />,
            closeChartButton = this.state.chart
                ? (
                    <a onClick={this.handleChartClose}>
                        <i className="angle blue double left icon" style={{cursor: 'pointer'}}/>
                    </a>
                )
                : null,
            align = this.state.chart ? 'right' : 'left';

        const rightMenu = this.state.chart
            ? (
                <Menu.Menu position="right">
                    <Header as="h2" textAlign="right">
                        <Header.Content>
                            {closeChartButton} {this.state.header}
                            <Header.Subheader>
                                {this.state.subHeader}
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                </Menu.Menu>
            )
            : (
                <Menu.Menu position="right">
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
                    <Header.Content>
                        {this.state.header}
                    </Header.Content>
                </Header>
            );

        return (
            <div className="realbook">
                <Menu secondary pointing position={align}>
                    {leftHeader}
                    {rightMenu}
                </Menu>
                {this.state.loading
                    ? <div>{'...loading'}</div>
                    : <div className="ui basic segment">{content}</div>
                }
            </div>
        );
    }
}

export default RealBook;
