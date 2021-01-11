/* eslint no-console: 0 */
/* eslint react/no-set-state: 0 */

import React, {PureComponent} from 'react';
import Chart from './Chart.jsx';
import ChartPicker from './ChartPicker.jsx';
import IRealProUrlParser from './IRealProUrlParser';
import IRealProChartModel from './IRealProChartModel';
import {Menu, Input, Header} from 'semantic-ui-react';

const defaultState = {
        header: 'Real Book',
        subHeader: null,
        chart: null
    },
    charts = require('./playlists/songs.js');

class RealBook extends PureComponent {
    constructor(props) {
        super(props);
        this.state = defaultState;

        this.handleChartChange = this.handleChartChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChartClose = this.handleChartClose.bind(this);
    }

    /**
     * Init metronome after the component is mounted
     * Init checkboxes
     */
    componentDidMount() {
        document.addEventListener('keyup', this.handleKeyPress, false);

        // TODO REMOVE
        // this.loadChart(0);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.handleKeyPress, false);
    }

    handleKeyPress(event) {
        if (event.key === 'Escape') {
            event.preventDefault();
            // $('.toggle.checkbox input').blur();
            this.handleChartClose();
        }
    }

    loadChart(index) {
        const parser = new IRealProUrlParser();
        const chartProps = parser.parse(charts[index].url);

        if (!chartProps || chartProps.length !== 1 || !chartProps[0]) {
            throw new Error('Incorrect chart props');
        }

        const chart = new IRealProChartModel(chartProps[0]);

        this.setState({
            chart,
            header: chart.title,
            subHeader: chart.author
        });
    }

    handleChartChange(index) {
        if (!charts[index]) {
            return;
        }
        this.loadChart(index);
    }

    handleChartClose() {
        this.setState(defaultState);
    }

    render() {
        const content = this.state.chart
                ? <Chart model={this.state.chart} />
                : <ChartPicker charts={charts} onClick={this.handleChartChange} />,
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
            // TODO implement filter
            : (
                <Menu.Menu position="right">
                    <Input
                        icon="search"
                        transparent
                        placeholder="Filter..."
                        // value={this.props.searchFilter}
                        // onChange={this.handleSearchFilterChange()}
                    />
                </Menu.Menu>
            );
        const leftHeader = this.state.chart
            ? null
            : (
                <Header as="h2">
                    <Header.Content>
                        {closeChartButton} {this.state.header}
                        <Header.Subheader>
                            {this.state.subHeader}
                        </Header.Subheader>
                    </Header.Content>
                </Header>
            );

        return (
            <div className="realbook">
                <Menu secondary pointing position={align}>
                    {leftHeader}
                    {rightMenu}
                </Menu>
                <div className="ui basic segment">{content}</div>
            </div>
        );
    }
}

export default RealBook;
