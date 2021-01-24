/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint no-await-in-loop: 0 */

import '@tensorflow/tfjs-node-gpu';
import * as TensorFlow from '@tensorflow/tfjs';
import {prepareData, flattenData} from '../data';
import {convertToTensor, maxFeatureDepth} from './tensor';
import {createModel} from './model';
import path from 'path';
export const modelSavePath = path.resolve(__dirname, './trained');

const epochs = 10;
const iterations = 15;

/**
 * Classification with 25 length one hot labels
 */
async function train() {
    const model = createModel();
    const rawData = prepareData();
    const flatData = flattenData(rawData);
    const tensor = convertToTensor(flatData);

    for (let i = 0; i < iterations; i++) {
        await model.fit(tensor.xs, tensor.ys, {
            verbose: 2,
            epochs,
            shuffle: true
        });

        const randomIndex = parseInt((Math.random() * flatData.length).toString(), 10);
        const testSlice = tensor.xs.slice([randomIndex], [10]);
        const prediction = model.predict(testSlice) as TensorFlow.Tensor;

        testSlice.mul(maxFeatureDepth).print();
        prediction.mul(100).print();
    }

    await model.save(`file://${modelSavePath}`);
}

if (require.main === module) {
    train();
}
