import React from 'react';
import {render} from 'react-dom';
import Map from './components/Map.jsx';
const $mapContainer = document.getElementById('mapContainer');

if ($mapContainer) {
    render(<Map />, $mapContainer);
}
