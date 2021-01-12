import React from 'react';
import {render} from 'react-dom';
import RealBook from './components/real-book/RealBook.jsx';
const $realBookContainer = document.getElementById('realBookContainer');

if ($realBookContainer) {
    render(<React.StrictMode><RealBook /></React.StrictMode>, $realBookContainer);
}
