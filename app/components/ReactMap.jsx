var ReactMap = React.createClass({
    getContainer() {
        return this.refs.mapContainer.getDOMNode();
    },
    getDefaultSettings() {
        return {
            chart: {
                borderWidth: 1,
                events: {
                    drillup: function () {
                        this.setTitle(null, {text: ''});
                    }
                }
            },
            title: {
                text: 'Страны, которые я посетил.'
            },
            //subtitle: {
            //    text: ''
            //},
            legend: {
                enabled: false
            },
            mapNavigation: {
                enabled: true,
                //enableDoubleClickZoomTo: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },
            credits: {
                enabled: false
            }
            // Doesn't work
            //colorAxis: {
            //    min: 1,
            //    type: 'logarithmic',
            //    minColor: '#EEEEFF',
            //    maxColor: '#000022',
            //    stops: [
            //        [0, '#EFEFFF'],
            //        [50, '#4444FF'],
            //        [100, '#000022']
            //    ]
            //}
        }
    },
    renderMap(countries) {
        var worldData = Highcharts.maps['custom/world'],
            settings = this.getDefaultSettings(),
            container = this.getContainer(),
            cities = [];

        countries.forEach(function (country) {
            cities[country.code] = country.cities;
        });

        settings.series = [
            {
                name: 'Countries',
                mapData: worldData,
                color: ['#E0E0E0'],
                enableMouseTracking: false
            },
            {
                type: 'mapbubble',
                mapData: worldData,
                name: 'Страны',
                joinBy: ['iso-a2', 'code'],
                data: countries,
                minSize: 20,
                maxSize: '12%',
                tooltip: {
                    pointFormat: '{point.country}'
                }
            }
        ];
        settings.drilldown = {
            //series: drilldownSeries,
            activeDataLabelStyle: {
                color: '#FFFFFF',
                textDecoration: 'none',
                textShadow: '0 0 3px #000000'
            },
            drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    x: 0,
                    y: 60
                }
            }
        };

        settings.chart.events.drilldown = function (e) {

            if (!e.seriesOptions) {
                var chart = this,
                    countryKey = e.point.drilldown,
                    countryName = e.point.country,
                    mapKey = 'countries/' + countryKey + '/' + countryKey + '-all',
                // Handle error, the timeout is cleared on success
                    fail = setTimeout(function () {
                        if (!Highcharts.maps[mapKey]) {
                            chart.showLoading('<i class="icon-frown"></i> Failed loading ' + e.point.name);

                            fail = setTimeout(function () {
                                chart.hideLoading();
                            }, 1000);
                        }
                    }, 3000);

                var mapData = Highcharts.geojson(Highcharts.maps[mapKey]);

                // Hide loading and add series
                //chart.hideLoading();
                clearTimeout(fail);
                chart.addSeriesAsDrilldown(e.point, {
                    name: e.point.name,
                    mapData: mapData,
                    data: cities[e.point.code],
                    joinBy: 'hasc',
                    tooltip: {
                        pointFormat: '{point.city}'
                    }
                    //dataLabels: {
                    //    enabled: true,
                    //    format: '{point.name}'
                    //}
                });
            }

            this.setTitle(null, {text: countryName});
        };

        $(container).highcharts('Map', settings);
    },
    componentDidMount() {
        var renderMap = this.renderMap;

        $.getJSON('assets/places.json', function (data) {
            renderMap(data);
        });
    },
    render() {
        return (
            <div ref="mapContainer" className="map"></div>
        );
    }
});

module.exports = ReactMap;