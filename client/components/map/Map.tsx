import React, {PureComponent, ReactElement} from 'react';
import Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
import mapData from './world-highres3.geo.json';

const cities = [{
    id: 'Ufa',
    lat: 54.7388,
    lon: 55.9721
}, {
    id: 'Saint Petersburg',
    lat: 59.9343,
    lon: 30.3351
}, {
    id: 'Moscow',
    lat: 55.7558,
    lon: 37.6173
}, {
    id: 'Vilnius',
    lat: 54.6872,
    lon: 25.2797
}, {
    id: 'Paris',
    lat: 48.8566,
    lon: 2.3522
}, {
    id: 'Stockholm',
    lat: 59.3293,
    lon: 18.0686
}, {
    id: 'Herräng',
    lat: 60.1294,
    lon: 18.6466
}, {
    id: 'London',
    lat: 51.5074,
    lon: 0.1278
}, {
    id: 'Cologne',
    lat: 50.9375,
    lon: 6.9603
}, {
    id: 'Barcelona',
    lat: 41.3851,
    lon: 2.1734
}, {
    id: 'Helsinki',
    lat: 60.1699,
    lon: 24.9384
}, {
    id: 'New York',
    lat: 40.7128,
    lon: -74.0059
}, {
    id: 'Boston',
    lat: 42.3601,
    lon: -71.0589
}, {
    id: 'Miami',
    lat: 25.7617,
    lon: -80.1918
}, {
    id: 'Barbados',
    lat: 13.1939,
    lon: -59.5432
}, {
    id: 'Rio de Janeiro',
    lat: -22.9068,
    lon: -43.1729
}, {
    id: 'Foz do Iguaçu',
    lat: -25.5162,
    lon: -54.5854
}];

/**
 * TODO find out how to put mappoint on world map, it is not displaying currently
 * @site https://github.com/highcharts/highcharts-react
 */
class Map extends PureComponent {

    public getOptions(): Highcharts.Options {
        return {
            chart: {
                type: 'map',
                animation: false,
                map: 'custom/world',
                height: 700,
                borderWidth: 0
            },
            plotOptions: {
                mappoint: {
                    marker: {
                        fillColor: '#FFFFFF',
                        lineWidth: 2,
                        lineColor: (Highcharts.getOptions() as any).colors[1]
                    }
                }
            },
            tooltip: {
                formatter() {
                    const point: any = this.point;

                    return point.id + (
                        point.lat
                            ? `<br>Lat: ${point.lat} Lon: ${point.lon}`
                            : ''
                    );
                }
            },
            mapNavigation: {
                enabled: false
            },
            series: [
                {
                    mapData: mapData as any,
                    name: 'Basemap',
                    borderColor: '#707070',
                    nullColor: 'rgba(200, 200, 200, 0.3)',
                    showInLegend: false
                } as Highcharts.SeriesTilemapOptions,
                {
                    // Specify cities using lat/lon
                    type: 'mappoint',
                    name: 'Cities',
                    dataLabels: {
                        format: '{point.id}'
                    },
                    // Use id instead of name to allow for referencing points later using
                    data: cities
                }]
        };
    }

    public render(): ReactElement {
        return (
            <div style={{width: '100%', height: '800px'}}>
                <HighchartsReact
                    highcharts={Highcharts}
                    constructionType={'mapChart'}
                    options={this.getOptions()}
                    allowChartUpdate={false}
                    immutable
                />
            </div>
        );
    }
}

export default Map;
