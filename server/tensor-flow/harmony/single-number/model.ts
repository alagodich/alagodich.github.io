import * as TensorFlow from '@tensorflow/tfjs';

/**
 * Model for single digit chord tensor
 *
 * Not going to work it seems
 */
export function createModel(): TensorFlow.Sequential {
    const model = TensorFlow.sequential();

    model.add(TensorFlow.layers.dense({inputShape: [1], units: 1}));
    model.add(TensorFlow.layers.dense({units: 200, activation: 'relu'}));
    model.add(TensorFlow.layers.dense({units: 1}));

    model.summary();
    model.compile({
        optimizer: TensorFlow.train.adam(),
        loss: TensorFlow.losses.meanSquaredError,
        metrics: ['mse']
    });

    return model;
}
