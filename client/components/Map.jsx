import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React, {Component} from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import GeoDataWorldLow from '@amcharts/amcharts4-geodata/worldLow';
import AnimatedTheme from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(AnimatedTheme);

const cities = [{
    title: 'Ufa',
    latitude: 54.7388,
    longitude: 55.9721
}, {
    title: 'Saint Petersburg',
    latitude: 59.9343,
    longitude: 30.3351
}, {
    title: 'Moscow',
    latitude: 55.7558,
    longitude: 37.6173
}, {
    title: 'Vilnius',
    latitude: 54.6872,
    longitude: 25.2797
}, {
    title: 'Paris',
    latitude: 48.8566,
    longitude: 2.3522
}, {
    title: 'Stockholm',
    latitude: 59.3293,
    longitude: 18.0686
}, {
    title: 'Herräng',
    latitude: 60.1294,
    longitude: 18.6466
}, {
    title: 'London',
    latitude: 51.5074,
    longitude: 0.1278
}, {
    title: 'Cologne',
    latitude: 50.9375,
    longitude: 6.9603
}, {
    title: 'Barcelona',
    latitude: 41.3851,
    longitude: 2.1734
}, {
    title: 'Helsinki',
    latitude: 60.1699,
    longitude: 24.9384
}, {
    title: 'New York',
    latitude: 40.7128,
    longitude: -74.0059
}, {
    title: 'Boston',
    latitude: 42.3601,
    longitude: -71.0589
}, {
    title: 'Miami',
    latitude: 25.7617,
    longitude: -80.1918
}, {
    title: 'Barbados',
    latitude: 13.1939,
    longitude: -59.5432
}, {
    title: 'Rio de Janeiro',
    latitude: -22.9068,
    longitude: -43.1729
}, {
    title: 'Foz do Iguaçu',
    latitude: -25.5162,
    longitude: -54.5854
}];

const colorSet = new am4core.ColorSet();

/**
 * @site https://www.amcharts.com/demos/#maps
 */
class Map extends Component {

    componentDidMount() {
        // Create map instanc
        const chart = am4core.create('chartdiv', am4maps.MapChart);

        // Set map definition
        chart.geodata = GeoDataWorldLow;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Create map polygon series
        const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        // Exclude Antartic
        polygonSeries.exclude = ['AQ'];

        // Make map load polygon (like country names) data from GeoJSO
        polygonSeries.useGeodata = true;

        // Configure series
        const polygonTemplate = polygonSeries.mapPolygons.template;

        polygonTemplate.tooltipText = '{name}';
        polygonTemplate.polygon.fillOpacity = 0.6;

        // Create hover state and set alternative fill colo
        const hs = polygonTemplate.states.create('hover');

        hs.properties.fill = chart.colors.getIndex(0);

        // Add image series
        const imageSeries = chart.series.push(new am4maps.MapImageSeries());

        imageSeries.mapImages.template.propertyFields.longitude = 'longitude';
        imageSeries.mapImages.template.propertyFields.latitude = 'latitude';
        imageSeries.mapImages.template.tooltipText = '{title}';
        imageSeries.mapImages.template.propertyFields.url = 'url';

        const circle = imageSeries.mapImages.template.createChild(am4core.Circle);

        circle.radius = 3;
        circle.propertyFields.fill = 'color';

        const circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);

        circle2.radius = 3;
        circle2.propertyFields.fill = 'color';
        circle2.events.on('inited', event => {
            animateBullet(event.target);
        });

        function animateBullet(circle) {
            const animation = circle.animate([{property: 'scale', from: 1, to: 5}, {
                property: 'opacity',
                from: 1,
                to: 0
            }], 1000, am4core.ease.circleOut);

            animation.events.on('animationended', event => {
                animateBullet(event.target.object);
            });
        }

        imageSeries.data = cities.map(city => {
            city.color = colorSet.next();
            return city;
        });

        this.chart = chart;
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        return <div id="chartdiv" style={{width: '100%', height: '500px'}} />;
    }
}

export default Map;
