/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-await-in-loop: 0 */

import fs from 'fs';
import * as TensorFlow from '@tensorflow/tfjs-node-gpu';
import {flattenData, prepareData, convertDigitToChord, maxChord, chordToPrintString, maxChordNumeric} from './data';
import {convertToClassificationTensor, convertToTensor} from './tensor';
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

async function printSliceAsChordString(testSlice: TensorFlow.Tensor, maxValue: number) {
    const testSliceUnNormalized = testSlice.mul(maxValue);
    const testSliceUnNormalizedArray = await testSliceUnNormalized.array() as number[][];
    const chord = convertDigitToChord(testSliceUnNormalizedArray[0][0]);

    testSliceUnNormalized.print();
    console.log(chordToPrintString(chord));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function predict() {
    const modelIsSaved = await isModelSaved();

    if (!modelIsSaved) {
        throw new Error('Train first');
    }

    const rawData = prepareData();
    const flatData = flattenData(rawData);
    const tensor = convertToTensor(flatData, maxChord);
    const randomIndex = parseInt((Math.random() * flatData.length).toString(), 10);
    let testSlice = tensor.from.slice([randomIndex], [10]);

    await printSliceAsChordString(testSlice, maxChord);
    const model = await TensorFlow.loadLayersModel(`file://${modelSavePath}/model.json`) as TensorFlow.Sequential;

    for (let i = 0; i < numberOfPredictions; i++) {
        testSlice = model.predict(testSlice) as TensorFlow.Tensor;

        // eslint-disable-next-line no-await-in-loop
        await printSliceAsChordString(testSlice, maxChord);
    }
}

async function predictClassification() {
    const modelIsSaved = await isModelSaved();

    if (!modelIsSaved) {
        throw new Error('Train first');
    }

    const rawData = prepareData();
    const flatData = flattenData(rawData, ['numeric']);
    const tensor = convertToClassificationTensor(flatData, maxChordNumeric);
    const model = await TensorFlow.loadLayersModel(`file://${modelSavePath}/model.json`) as TensorFlow.Sequential;

    for (let i = 0; i < numberOfPredictions; i++) {
        const randomIndex = parseInt((Math.random() * flatData.length).toString(), 10);
        const testSlice = tensor.from.slice([randomIndex], [1]);
        const prediction = model.predict(testSlice) as TensorFlow.Tensor;

        const unNormalizedTestSliceFloat = testSlice.mul(maxChordNumeric);
        const unNormalizedTestSliceInt = TensorFlow.cast(unNormalizedTestSliceFloat, 'int32');
        const unNormalizedTestSliceIntArray = await unNormalizedTestSliceInt.array();
        const predictionPercent = prediction.mul(100);
        const predictionPercentArray = await predictionPercent.array() as number[][];

        console.log(unNormalizedTestSliceIntArray[0]);
        console.log(predictionPercentArray[0].map((value: number) => `${value.toPrecision(2)}%`).join(' | '));
    }
}

predictClassification();
