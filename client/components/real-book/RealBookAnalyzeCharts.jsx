import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
// import * as am4core from '@amcharts/amcharts4/core';
// import * as forceDirected from '@amcharts/amcharts4/plugins/forceDirected';

// import animatedTheme from '@amcharts/amcharts4/themes/animated';

// am4core.useTheme(animatedTheme);

const propTypes = {
    songs: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        author: PropTypes.string,
        style: PropTypes.string,
        key: PropTypes.string,
        chordString: PropTypes.string
    }))
};

class RealBookAnalyzeCharts extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initKeysChart();
        this.loadKeysChartData();
    }

    componentWillUnmount() {
        // if (this.keysChart) {
        //     this.keysChart.dispose();
        // }
    }

    initKeysChart() {
        // this.keysChart = am4core.create('js--keys-chart', forceDirected.ForceDirectedTree);
        // const networkSeries = this.keysChart.series.push(new forceDirected.ForceDirectedSeries());

        // networkSeries.dataFields.value = 'value';
        // networkSeries.dataFields.name = 'name';
        // networkSeries.dataFields.children = 'children';
        // networkSeries.nodes.template.tooltipText = '{name}:{value}';
        // networkSeries.nodes.template.fillOpacity = 1;

        // networkSeries.nodes.template.label.text = '{name}';
        // networkSeries.fontSize = 10;

        // networkSeries.links.template.strokeWidth = 1;

        // const hoverState = networkSeries.links.template.states.create('hover');

        // hoverState.properties.strokeWidth = 3;
        // hoverState.properties.strokeOpacity = 1;

        // networkSeries.nodes.template.events.on('over', event => {
        //     event.target.dataItem.childLinks.each(link => {
        //         link.isHover = true;
        //     });
        //     if (event.target.dataItem.parentLink) {
        //         event.target.dataItem.parentLink.isHover = true;
        //     }
        // });

        // networkSeries.nodes.template.events.on('out', event => {
        //     event.target.dataItem.childLinks.each(link => {
        //         link.isHover = false;
        //     });
        //     if (event.target.dataItem.parentLink) {
        //         event.target.dataItem.parentLink.isHover = false;
        //     }
        // });
    }

    loadKeysChartData() {
        this.keysChart.data = [
            {
                name: 'Keys',
                children: []
            }
        ];
        const keys = {};

        this.props.songs.forEach(song => {
            if (!keys[song.key]) {
                keys[song.key] = 1;
            } else {
                keys[song.key]++;
            }
        });

        Object.getOwnPropertyNames(keys).forEach(key => {
            const children = [];
            const styles = {};

            this.props.songs.filter(song => song.key === key).forEach(song => {
                if (!styles[song.style]) {
                    styles[song.style] = 1;
                } else {
                    styles[song.style]++;
                }
            });
            Object.getOwnPropertyNames(styles).forEach(style => {
                children.push({name: style, value: styles[style]});
            });

            this.keysChart.data[0].children.push({name: key, value: keys[key], children});
        });
    }

    render() {
        return (
            <div id="js--keys-chart" style={{height: 500, width: '100%'}} />

        );
    }

}

RealBookAnalyzeCharts.propTypes = propTypes;

export default RealBookAnalyzeCharts;
