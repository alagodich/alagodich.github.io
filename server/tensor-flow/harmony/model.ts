import * as TensorFlow from '@tensorflow/tfjs';
import {oneHotTensorLabelLength} from './tensor';

/**
 * @deprecated
 *
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

export function createClassificationModel(): TensorFlow.Sequential {
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

export function createEmbeddingClassificationModel(): TensorFlow.LayersModel {
    const numericInput = TensorFlow.input({name: 'numericInput', shape: [1]});
    const numericEmbedding = TensorFlow.layers.embedding({
        name: 'numericEmbedding',
        inputDim: 7,
        outputDim: 2,
        inputLength: 1
    }).apply(numericInput);

    const shiftInput = TensorFlow.input({name: 'shiftInput', shape: [1]});
    const shiftEmbedding = TensorFlow.layers.embedding({
        name: 'shiftEmbedding',
        inputDim: 3,
        outputDim: 2,
        inputLength: 1
    }).apply(shiftInput);

    const qualityInput = TensorFlow.input({name: 'qualityInput', shape: [1]});
    const qualityEmbedding = TensorFlow.layers.embedding({
        name: 'qualityEmbedding',
        inputDim: 15,
        outputDim: 4,
        inputLength: 1
    }).apply(qualityInput);

    const inputs = [
        numericInput,
        shiftInput,
        qualityInput
    ];

    const sharedInputLayer = TensorFlow.layers.concatenate().apply([
        TensorFlow.layers.flatten().apply(numericEmbedding),
        TensorFlow.layers.flatten().apply(shiftEmbedding),
        TensorFlow.layers.flatten().apply(qualityEmbedding)
    ] as TensorFlow.SymbolicTensor[]);

    const sharedHiddenLayer = TensorFlow.layers.dense({units: 200, activation: 'relu'}).apply(sharedInputLayer);

    const outputs = [
        TensorFlow.layers.dense({name: 'numericOutput', units: 7, activation: 'softmax'}).apply(sharedHiddenLayer),
        TensorFlow.layers.dense({name: 'shiftOutput', units: 3, activation: 'softmax'}).apply(sharedHiddenLayer),
        TensorFlow.layers.dense({name: 'qualityOutput', units: 15, activation: 'softmax'}).apply(sharedHiddenLayer)
    ] as TensorFlow.SymbolicTensor[];

    const model = TensorFlow.model({inputs, outputs});

    model.summary();
    model.compile({
        optimizer: TensorFlow.train.adam(),
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
    });

    return model;
}
