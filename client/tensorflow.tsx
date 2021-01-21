import React from 'react';
import {render} from 'react-dom';
import {TensorFlowHarmonyComponent} from './components/tensor-flow/TensorFlowHarmonyComponent';
const tensorFlowContainer = document.getElementById('tensorFlowContainer');

if (tensorFlowContainer) {
    render(<TensorFlowHarmonyComponent />, tensorFlowContainer);
}
