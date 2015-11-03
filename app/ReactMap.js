var ReactMap = React.createClass({
    getContainer() {
        return this.refs.mapContainer.getDOMNode();
    },
    getDefaultSettings() {
        return {
            chart: {
                borderWidth: 1
            },
            title: {
                text: 'Здесь был я'
            },
            subtitle: {
                text: 'Страны и города которые я посетил'
            },
            legend: {
                enabled: false
            },
            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },
            credits: {
                enabled: false
            }
        }
    },
    renderMap(data) {
        var living = data.living,
            vacation = data.vacation,
            mapData = Highcharts.geojson(Highcharts.maps['custom/world']),
            settings = this.getDefaultSettings(),
            container = this.getContainer();

        settings.series = [{
            name: 'Countries',
            mapData: mapData,
            color: ['#E0E0E0'],
            enableMouseTracking: false
        }, {
            type: 'mapbubble',
            mapData: mapData,
            name: 'Не отпуск',
            joinBy: ['iso-a2', 'code'],
            data: living,
            minSize: 20,
            maxSize: '12%',
            tooltip: {
                pointFormat: '{point.city}'
            }
        }, {
            type: 'mapbubble',
            color: '#00CCCC',
            mapData: mapData,
            name: 'Отпуск',
            joinBy: ['iso-a2', 'code'],
            data: vacation,
            minSize: 10,
            maxSize: '12%',
            tooltip: {
                pointFormat: '{point.city}'
            }
        }];

        $(container).highcharts('Map', settings);
    },
    componentDidMount() {
        var renderMap = this.renderMap;

        $.getJSON('assets/map/places.json', function (data) {
            renderMap(data);
        });
    },
    render() {
        return(
            <div ref="mapContainer" className="map"></div>
        );
    }
});

module.exports = ReactMap;