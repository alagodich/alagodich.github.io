import * as TensorFlow from '@tensorflow/tfjs';

export function createModel(): TensorFlow.Sequential {
    // TODO find proper setup
    const model = TensorFlow.sequential();

    model.add(TensorFlow.layers.dense({inputShape: [1], units: 1}));
    model.add(TensorFlow.layers.dense({units: 200, activation: 'sigmoid'}));
    model.add(TensorFlow.layers.dense({units: 1}));

    model.compile({
        optimizer: TensorFlow.train.adam(),
        loss: TensorFlow.losses.meanSquaredError,
        metrics: ['mse']
    });

    return model;
}
