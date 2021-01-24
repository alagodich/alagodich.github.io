import * as TensorFlow from '@tensorflow/tfjs';
import {oneHotTensorLabelLength} from './tensor';

/**
 * Input: 2d cord array [[0,0,0] ... [6,2,14]]
 * Output: 25 length one hot, 3 features concatenated
 */
export function createModel(): TensorFlow.Sequential {
    const model = TensorFlow.sequential();

    model.add(TensorFlow.layers.dense({inputShape: [3], units: 1}));
    model.add(TensorFlow.layers.dense({units: 200, activation: 'relu'}));
    model.add(TensorFlow.layers.dense({
        units: oneHotTensorLabelLength,
        activation: 'softmax',
        kernelInitializer: 'varianceScaling'
    }));

    model.summary();
    model.compile({
        optimizer: TensorFlow.train.adam(),
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
    });

    return model;
}
