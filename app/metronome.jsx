import React from 'react';
import {render} from 'react-dom';
import Metronome from './components/Metronome.jsx';
const $metronomeContainer = document.getElementById('metronomeContainer');

if ($metronomeContainer) {
    render(<Metronome />, $metronomeContainer);
}
