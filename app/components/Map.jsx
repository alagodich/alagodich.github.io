/* eslint max-len: 0 */
'use strict';

import React, {Component} from 'react';
import 'ammap3/ammap/ammap.js';
import 'ammap3/ammap/maps/js/worldLow.js';
import 'ammap3/ammap/lang/ru.js';

const visitedCountryColor = '#CC0000',
    // notVisitedCountryColor = '#8DD9EF',
    cityColor = '#585869',
    lineColor = '#585869',
    targetSVG = 'M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z',
    countries = [
        {id: 'RU'},
        {id: 'US'},
        {id: 'FR'},
        {id: 'DE'},
        {id: 'BR'},
        {id: 'LT'},
        {id: 'SE'},
        {id: 'GB'},
        {id: 'ES'},
        {id: 'FI'},
        {id: 'BB'}
    ],
    cities = [{
        title: 'Уфа',
        latitude: 54.7388,
        longitude: 55.9721
    }, {
        title: 'Санкт-Петербург',
        latitude: 59.9343,
        longitude: 30.3351
    }, {
        title: 'Москва',
        latitude: 55.7558,
        longitude: 37.6173
    }, {
        title: 'Вильнюс',
        latitude: 54.6872,
        longitude: 25.2797
    }, {
        title: 'Париж',
        latitude: 48.8566,
        longitude: 2.3522
    }, {
        title: 'Стокгольм',
        latitude: 59.3293,
        longitude: 18.0686
    }, {
        title: 'Херранг',
        latitude: 60.1294,
        longitude: 18.6466
    }, {
        title: 'Лондон',
        latitude: 51.5074,
        longitude: 0.1278
    }, {
        title: 'Кёльн',
        latitude: 50.9375,
        longitude: 6.9603
    }, {
        title: 'Барселона',
        latitude: 41.3851,
        longitude: 2.1734
    }, {
        title: 'Хельсинки',
        latitude: 60.1699,
        longitude: 24.9384
    }, {
        title: 'Нью Йорк',
        latitude: 40.7128,
        longitude: -74.0059
    }, {
        title: 'Бостон',
        latitude: 42.3601,
        longitude: -71.0589
    }, {
        title: 'Майями',
        latitude: 25.7617,
        longitude: -80.1918
    }, {
        title: 'Майями',
        latitude: 25.7617,
        longitude: -80.1918
    }, {
        title: 'Барбадос',
        latitude: 13.1939,
        longitude: -59.5432
    }, {
        title: 'Рио-де-Жанейро',
        latitude: -22.9068,
        longitude: -43.1729
    }, {
        title: 'Фос-ду-Игуасу',
        latitude: -25.5162,
        longitude: -54.5854
    }];

class Map extends Component {
    componentDidMount() {
        window.AmCharts.makeChart(this.container, {
            type: 'map',
            dataProvider: {
                map: 'worldLow',
                areas: countries,
                images: cities.map(city => ({
                    svgPath: targetSVG,
                    title: city.title,
                    latitude: city.latitude,
                    longitude: city.longitude
                }))
            },
            areasSettings: {
                autoZoom: false,
                selectedColor: visitedCountryColor
                // unlistedAreasColor: notVisitedCountryColor
            },
            imagesSettings: {
                color: cityColor,
                rollOverColor: cityColor,
                selectedColor: cityColor,
                pauseDuration: 0.2,
                animationDuration: 2.5,
                adjustAnimationSpeed: true
            },
            linesSettings: {
                color: lineColor,
                alpha: 0.4
            },
            smallMap: false,
            // zoomControl: {
                // zoomControlEnabled: false,
                // homeButtonEnabled: false,
                // maxZoomLevel: 1
            // },
            // dragMap: false,
            mouseWheelZoomEnabled: false,
            preventDragOut: true,
            // zoomOnDoubleClick: false,
            language: 'ru'
        });
    }

    render() {
        return (
            <div>
                <div
                    ref={c => (this.container = c)}
                    style={{width: '100%', height: 500}}
                >
                    {'Loading...'}
                </div>
            </div>
        );
    }
}

export default Map;
