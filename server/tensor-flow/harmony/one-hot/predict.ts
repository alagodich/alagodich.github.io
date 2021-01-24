/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint no-await-in-loop: 0 */

import fs from 'fs';
import * as TensorFlow from '@tensorflow/tfjs-node-gpu';
import {flattenData, prepareData} from '../data';
import {convertToTensor, maxFeatureDepth} from './tensor';
import {modelSavePath} from './train';

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
    const model = await TensorFlow.loadLayersModel(`file://${modelSavePath}/model.json`) as TensorFlow.Sequential;

    for (let i = 0; i < 50; i++) {
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

if (require.main === module) {
    predict();
}
