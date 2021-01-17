import React from 'react';
import {render} from 'react-dom';
import RealBookProvider from './components/real-book/RealBookProvider';
const realBookContainer = document.getElementById('realBookContainer');

if (realBookContainer) {
    render(<React.StrictMode><RealBookProvider /></React.StrictMode>, realBookContainer);
}
