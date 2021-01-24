/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint no-await-in-loop: 0 */

import '@tensorflow/tfjs-node-gpu';
import {prepareData, flattenData} from '../data';
import {convertToTensor} from './tensor';
import {createModel} from './model';
import path from 'path';
export const modelSavePath = path.resolve(__dirname, './trained');

const epochs = 100;

/**
 * This didn't work out, giving only one number is useless
 */
async function train() {
    const model = createModel();
    const rawData = prepareData();
    const flatData = flattenData(rawData);
    const tensor = convertToTensor(flatData);

    await model.fit(tensor.xs, tensor.ys, {epochs});

    await model.save(`file://${modelSavePath}`);
}

if (require.main === module) {
    train();
}

