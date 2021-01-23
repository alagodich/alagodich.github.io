/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint no-await-in-loop: 0 */

import '@tensorflow/tfjs-node';
import * as TensorFlow from '@tensorflow/tfjs';
import {prepareData, flattenData, maxChord, maxFeatureDepth} from './data';
import {convertToClassificationTensor, convertToEmbeddingTensor, convertToSingleNumberTensor} from './tensor';
import {createModel, createClassificationModel, createEmbeddingClassificationModel} from './model';
import path from 'path';
export const modelSavePath = path.resolve(__dirname, './data/harmony-model');


/**
 * This didn't work out, giving only one number is useless
 */
async function train() {
    const model = createModel();
    const rawData = prepareData();
    const flatData = flattenData(rawData);
    const tensor = convertToSingleNumberTensor(flatData, maxChord);

    await model.fit(tensor.xs, tensor.ys, {epochs: 100});

    // await model.save(`file://${modelSavePath}`);
}

/**
 * Classification with 25 length one hot labels
 */
async function trainClassificationModel() {
    const model = createClassificationModel();
    const rawData = prepareData();
    const flatData = flattenData(rawData);
    const tensor = convertToClassificationTensor(flatData, maxFeatureDepth);

    for (let i = 0; i < 15; i++) {
        await model.fit(tensor.xs, tensor.ys, {
            verbose: 2,
            epochs: 10,
            shuffle: true
        });

        const randomIndex = parseInt((Math.random() * flatData.length).toString(), 10);
        const testSlice = tensor.xs.slice([randomIndex], [10]);
        const prediction = model.predict(testSlice) as TensorFlow.Tensor;

        testSlice.mul(maxFeatureDepth).print();
        prediction.mul(100).print();
    }

    // await model.save(`file://${modelSavePath}`);
}

/**
 * Embedding model with 3 separate inputs and outputs
 */
async function trainClassificationEmbeddingModel() {
    const model = createEmbeddingClassificationModel();
    const rawData = prepareData();
    const flatData = flattenData(rawData);
    const tensor = convertToEmbeddingTensor(flatData);

    for (let i = 0; i < 15; i++) {
        await model.fit(tensor.xs, tensor.ys, {
            verbose: 2,
            epochs: 10,
            shuffle: true
        });

        const randomIndex = parseInt((Math.random() * flatData.length).toString(), 10);
        const testSlice = [
            tensor.xs[0].slice([randomIndex], [1]),
            tensor.xs[1].slice([randomIndex], [1]),
            tensor.xs[2].slice([randomIndex], [1])
        ];
        const prediction = model.predict(testSlice) as TensorFlow.Tensor[];

        testSlice.forEach(xsTensor => xsTensor.print());
        prediction.forEach(ysTensor => ysTensor.print());
    }

    // await model.save(`file://${modelSavePath}--embedding`);
}

trainClassificationModel();
