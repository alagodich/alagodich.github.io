/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint no-await-in-loop: 0 */

import '@tensorflow/tfjs-node-gpu';
import * as TensorFlow from '@tensorflow/tfjs';
import {prepareData, flattenData} from '../data';
import {convertToTensor} from './tensor';
import {createModel} from './model';
import path from 'path';
export const modelSavePath = path.resolve(__dirname, './trained');

const epochs = 15;
const iterations = 15;

/**
 * Embedding model with 3 separate inputs and outputs
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
        const testSlice = [
            tensor.xs[0].slice([randomIndex], [1]),
            tensor.xs[1].slice([randomIndex], [1]),
            tensor.xs[2].slice([randomIndex], [1])
        ];
        const prediction = model.predict(testSlice) as TensorFlow.Tensor[];

        testSlice.forEach(xsTensor => xsTensor.print());
        prediction.forEach(ysTensor => ysTensor.print());
    }

    await model.save(`file://${modelSavePath}`);
}

if (require.main === module) {
    train();
}

