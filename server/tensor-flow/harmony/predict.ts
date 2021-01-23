/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint no-await-in-loop: 0 */

import fs from 'fs';
import * as TensorFlow from '@tensorflow/tfjs-node-gpu';
import {flattenData, prepareData, maxChord, maxFeatureDepth} from './data';
import {convertToClassificationTensor, convertToEmbeddingTensor, convertToSingleNumberTensor} from './tensor';
import path from 'path';
export const modelSavePath = path.resolve(__dirname, './data/harmony-model');

const numberOfPredictions = 50;

function isModelSaved(): Promise<boolean> {
    return new Promise(resolve => {
        fs.access(`${modelSavePath}/model.json`, (error: any) => {
            if (error) {
                resolve(false);
            }
            return resolve(true);
        });
    });
}

/**
 * @deprecated
 *
 * This model will not provide correct prediction
 */
async function predict() {
    const modelIsSaved = await isModelSaved();

    if (!modelIsSaved) {
        throw new Error('Train first');
    }

    const rawData = prepareData();
    const flatData = flattenData(rawData);
    const tensor = convertToSingleNumberTensor(flatData, maxChord);
    const randomIndex = parseInt((Math.random() * flatData.length).toString(), 10);
    let testSlice = tensor.xs.slice([randomIndex], [10]);

    console.log(testSlice, maxChord);
    const model = await TensorFlow.loadLayersModel(`file://${modelSavePath}/model.json`) as TensorFlow.Sequential;

    for (let i = 0; i < numberOfPredictions; i++) {
        testSlice = model.predict(testSlice) as TensorFlow.Tensor;

        // eslint-disable-next-line no-await-in-loop
        console.log(testSlice, maxChord);
    }
}

async function predictClassification() {
    const modelIsSaved = await isModelSaved();

    if (!modelIsSaved) {
        throw new Error('Train first');
    }

    const rawData = prepareData();
    const flatData = flattenData(rawData);
    const tensor = convertToClassificationTensor(flatData, maxFeatureDepth);
    const model = await TensorFlow.loadLayersModel(`file://${modelSavePath}/model.json`) as TensorFlow.Sequential;

    for (let i = 0; i < numberOfPredictions; i++) {
        const randomIndex = parseInt((Math.random() * flatData.length).toString(), 10);
        const testSlice = tensor.xs.slice([randomIndex], [1]);
        const prediction = model.predict(testSlice) as TensorFlow.Tensor;

        const unNormalizedTestSliceFloat = testSlice.mul(maxFeatureDepth);
        const unNormalizedTestSliceInt = TensorFlow.cast(unNormalizedTestSliceFloat, 'int32');
        const unNormalizedTestSliceIntArray = await unNormalizedTestSliceInt.array();
        const predictionPercent = prediction.mul(100);
        const predictionPercentArray = await predictionPercent.array() as number[][];

        console.log(unNormalizedTestSliceIntArray);
        console.log(predictionPercentArray[0].map((value: number) => `${value.toPrecision(2)}%`).join(' | '));
    }
}

async function predictClassificationEmbedding() {
    const modelIsSaved = await isModelSaved();

    if (!modelIsSaved) {
        throw new Error('Train first');
    }

    const rawData = prepareData();
    const flatData = flattenData(rawData);
    const tensor = convertToEmbeddingTensor(flatData);
    const model = await TensorFlow.loadLayersModel(
        `file://${modelSavePath}--embedding/model.json`
    ) as TensorFlow.Sequential;

    for (let i = 0; i < numberOfPredictions; i++) {
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
}

predictClassificationEmbedding();
