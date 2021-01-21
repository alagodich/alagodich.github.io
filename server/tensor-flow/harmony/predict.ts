import fs from 'fs';
import * as TensorFlow from '@tensorflow/tfjs';
import {flattenData, prepareData, convertDigitToChord, maxChord, chordToPrintString} from './data';
import {convertToTensor} from './tensor';
import path from 'path';
export const modelSavePath = path.resolve(__dirname, './data/harmony-model');

const numberOfPredictions = 50;
const predictedChords: string[] = [];

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

async function printSliceAsChordString(testSlice: TensorFlow.Tensor) {
    const testSliceUnNormalized = testSlice.mul(maxChord);
    const testSliceUnNormalizedArray = await testSliceUnNormalized.array() as number[][];
    const chord = convertDigitToChord(testSliceUnNormalizedArray[0][0]);

    predictedChords.push(chordToPrintString(chord));
}

async function predict() {
    const modelIsSaved = await isModelSaved();

    if (!modelIsSaved) {
        throw new Error('Train first');
    }

    const rawData = prepareData();
    const flatData = flattenData(rawData);
    const tensor = convertToTensor(flatData);
    const randomIndex = parseInt((Math.random() * flatData.length).toString(), 10);
    let testSlice = tensor.from.slice([randomIndex], [1]);
console.log(randomIndex);
    await printSliceAsChordString(testSlice);
    const model = await TensorFlow.loadLayersModel(`file://${modelSavePath}/model.json`) as TensorFlow.Sequential;

    for (let i = 0; i < numberOfPredictions; i++) {
        const predicted: TensorFlow.Tensor = model.predict(testSlice) as TensorFlow.Tensor;

        testSlice = predicted;

        // console.log('TEST SLICE', await testSlice.array());
        // eslint-disable-next-line no-await-in-loop
        await printSliceAsChordString(testSlice);
    }
    console.log(predictedChords.join(' -> '));
}

predict();
