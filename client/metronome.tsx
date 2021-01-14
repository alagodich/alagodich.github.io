import React from 'react';
import {render} from 'react-dom';
import Metronome from './components/metronome/Metronome';
const $metronomeContainer = document.getElementById('metronomeContainer');

if ($metronomeContainer) {
    render(<React.StrictMode><Metronome /></React.StrictMode>, $metronomeContainer);
}
