import React from 'react';
import {render} from 'react-dom';
import RealBook from './components/RealBook.jsx';
const $realBookContainer = document.getElementById('realBookContainer');

if ($realBookContainer) {
    render(<RealBook />, $realBookContainer);
}
