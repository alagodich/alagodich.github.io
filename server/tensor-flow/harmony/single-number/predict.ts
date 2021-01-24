/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint no-await-in-loop: 0 */

import fs from 'fs';
import * as TensorFlow from '@tensorflow/tfjs-node-gpu';
import {flattenData, prepareData} from '../data';
import {convertToTensor, maxChord} from './tensor';
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

/**
 * This model will not provide correct prediction
 */
async function predict() {
    const modelIsSaved = await isModelSaved();

    if (!modelIsSaved) {
        throw new Error('Train first');
    }

    const rawData = prepareData();
    const flatData = flattenData(rawData);
    const tensor = convertToTensor(flatData);
    const randomIndex = parseInt((Math.random() * flatData.length).toString(), 10);
    let testSlice = tensor.xs.slice([randomIndex], [1]);

    let unNormalizedTestSliceFloat = testSlice.mul(maxChord);
    let unNormalizedTestSliceInt = TensorFlow.cast(unNormalizedTestSliceFloat, 'int32');

    console.log(await unNormalizedTestSliceInt.array());
    const model = await TensorFlow.loadLayersModel(`file://${modelSavePath}/model.json`) as TensorFlow.Sequential;

    for (let i = 0; i < 10; i++) {
        testSlice = model.predict(testSlice) as TensorFlow.Tensor;
        unNormalizedTestSliceFloat = testSlice.mul(maxChord);
        unNormalizedTestSliceInt = TensorFlow.cast(unNormalizedTestSliceFloat, 'int32');

        // eslint-disable-next-line no-await-in-loop
        console.log(await unNormalizedTestSliceInt.array());
    }
}

if (require.main === module) {
    predict();
}
