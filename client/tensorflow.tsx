import React from 'react';
import {render} from 'react-dom';
import {TensorFlowHarmonyComponent} from './components/tensor-flow/TensorFlowHarmonyComponent';
// import {TensorFlowComponent} from './components/tensor-flow/TensorFlowComponent';
const tensorFlowContainer = document.getElementById('tensorFlowContainer');

if (tensorFlowContainer) {
    render(<TensorFlowHarmonyComponent />, tensorFlowContainer);
}
