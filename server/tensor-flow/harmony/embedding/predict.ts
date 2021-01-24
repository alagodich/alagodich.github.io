/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint no-await-in-loop: 0 */

import fs from 'fs';
import * as TensorFlow from '@tensorflow/tfjs-node-gpu';
import {flattenData, prepareData} from '../data';
import {convertToTensor} from './tensor';
import {modelSavePath} from './train';

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

async function predict() {
    const modelIsSaved = await isModelSaved();

    if (!modelIsSaved) {
        throw new Error('Train first');
    }

    const rawData = prepareData();
    const flatData = flattenData(rawData);
    const tensor = convertToTensor(flatData);
    const model = await TensorFlow.loadLayersModel(
        `file://${modelSavePath}/model.json`
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

if (require.main === module) {
    predict();
}

