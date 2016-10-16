/* eslint no-console: 0 */
/* eslint react/no-set-state: 0 */

import React, {Component} from 'react';
import {parseString} from 'xml2js';
import Chart from './Chart.jsx';
import ChartPicker from './ChartPicker.jsx';

const defaultState = {
        header: 'Real Book',
        subHeader: null,
        chart: null
    },
    charts = require('./../../assets/charts/list.js');

class RealBook extends Component {

    constructor() {
        super();
        this.state = defaultState;

        this.handleChartChange = this.handleChartChange.bind(this);
        this.handleChartClose = this.handleChartClose.bind(this);
    }

    loadChart(file) {
        $.get(`/assets/charts/${file}`, response => {
            const xml = new XMLSerializer().serializeToString(response);
            parseString(xml, {trim: true}, (error, parsed) => {
                if (error) {
                    console.log(error);
                    return;
                }
                const chart = parsed['score-partwise'].part[0],
                    header = parsed['score-partwise']['movement-title'][0],
                    composer = parsed['score-partwise'].identification[0].creator[0]._,
                    style = parsed['score-partwise'].identification[0].creator[1]._,
                    subHeader = `${composer}, ${style}`;

                this.setState({chart, header, subHeader});
            });
        });
    }

    handleChartChange(chart) {
        if (charts.indexOf(chart) === -1) {
            return;
        }
        this.loadChart(chart.file);
    }

    handleChartClose() {
        this.setState({chart: null, header: defaultState.header, subHeader: defaultState.subHeader});
    }

    render() {
        const content = this.state.chart
            ? <Chart data={this.state.chart} />
            : <ChartPicker charts={charts} onClick={this.handleChartChange} />,
            closeChartButton = this.state.chart
                ? <a onClick={this.handleChartClose}>
                    <i className="angle blue double left icon" style={{cursor: 'pointer'}}/>
                </a>
                : '',
            align = this.state.chart ? 'right' : 'left';

        return (
            <div className="realbook">
                <div>
                    <h2 className={`ui dividing ${align} aligned header`}>
                        <div className="content">
                            {closeChartButton} {this.state.header}
                            <div className="sub header">
                                {this.state.subHeader}
                            </div>
                        </div>
                    </h2>
                </div>
                <div className="ui basic segment">{content}</div>
            </div>
        );
    }
}

export default RealBook;
