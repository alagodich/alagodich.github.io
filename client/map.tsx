import React from 'react';
import {render} from 'react-dom';
import Map from './components/map/Map';
const mapContainer = document.getElementById('mapContainer');

if (mapContainer) {
    render(<React.StrictMode><Map /></React.StrictMode>, mapContainer);
}
