import React from 'react';
import {render} from 'react-dom';
import {TensorFlowComponent} from './components/tensor-flow/TensorFlowComponent';
const tensorFlowContainer = document.getElementById('tensorFlowContainer');

if (tensorFlowContainer) {
    render(<TensorFlowComponent />, tensorFlowContainer);
}
