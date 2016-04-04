import React, {Component} from 'react';
import {parseString} from 'xml2js';
import Chart from './Chart.jsx';
import ChartPicker from './ChartPicker.jsx';

const defaultState = {
        header: 'Real Book',
        chart: null
    },
    charts = [
        {
            title: 'Agua De Beber',
            file: 'Agua-De-Beber.xml'
        },
        {
            title: 'Blue Bossa',
            file: 'Blue-Bossa.xml'
        },
        {
            title: 'Corcovado',
            file: 'Corcovado.xml'
        },
        {
            title: 'Fever',
            file: 'Fever.xml'
        },
        {
            title: 'Fly Me To The Moon',
            file: 'Fly-Me-To-The-Moon.xml'
        },
        {
            title: 'How High The Moon',
            file: 'How-High-The-Moon.xml'
        },
        {
            title: 'I Could Write A Book',
            file: 'I-Could-Write-A-Book.xml'
        },
        {
            title: 'The Christmas Song',
            file: 'The-Christmas-Song.xml'
        },
        {
            title: 'The Girl From Ipanema',
            file: 'The-Girl-From-Ipanema.xml'
        },
        {
            title: 'There Will Never Be Another You',
            file: 'There-Will-Never-Be-Another-You.xml'
        }
    ];

class RealBook extends Component {

    constructor() {
        super();
        this.state = defaultState;

        this.handleChartChange = this.handleChartChange.bind(this);
        this.handleChartClose = this.handleChartClose.bind(this);
    }

    // componentWillMount() {
    //     this.loadChart('The-Girl-From-Ipanema.xml');
    // }

    loadChart(file) {
        $.get(`/assets/charts/${file}`, response => {
            const xml = new XMLSerializer().serializeToString(response);
            parseString(xml, {trim: true}, (error, parsed) => {
                if (error) {
                    console.log(error);
                    return;
                }
                const chart = parsed['score-partwise'].part[0],
                    header = parsed['score-partwise']['movement-title'][0];

                this.setState({chart, header});
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
        this.setState({chart: null, header: defaultState.header});
    }

    render() {
        const content = this.state.chart
            ? <Chart data={this.state.chart} />
            : <ChartPicker charts={charts} onClick={this.handleChartChange} />,
            closeChartButton = this.state.chart
                ? <a onClick={this.handleChartClose}><i className="angle blue double left icon"></i></a>
                : '';

        return (
            <div className="">
                <div className="header"><h2>{closeChartButton} {this.state.header}</h2></div>
                <div className="ui basic segment">{content}</div>
            </div>
        );
    }
}

export default RealBook;
