import React from 'react';
import {render} from 'react-dom';
import CSoundComponent from './components/csound/CSoundComponent.jsx';
const $cSoundContainer = document.getElementById('cSoundContainer');

if ($cSoundContainer) {
    render(<React.StrictMode><CSoundComponent /></React.StrictMode>, $cSoundContainer);
}
