import React from 'react';
import {render} from 'react-dom';
import CSoundComponent from './components/csound/CSoundComponent';
const cSoundContainer = document.getElementById('cSoundContainer');

if (cSoundContainer) {
    render(<React.StrictMode><CSoundComponent /></React.StrictMode>, cSoundContainer);
}

// eslint-disable-next-line no-console
console.log('csound disabled for now');

