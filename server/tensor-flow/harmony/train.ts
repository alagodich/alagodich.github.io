/* eslint no-unused-vars: 0 */

import '@tensorflow/tfjs-node';
import * as TensorFlow from '@tensorflow/tfjs';
import {prepareData, flattenData, maxChord, maxChordNumeric} from './data';
import {convertToClassificationTensor, convertToTensor} from './tensor';
import {createModel, createClassificationModel} from './model';
import path from 'path';
export const modelSavePath = path.resolve(__dirname, './data/harmony-model');


// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function train() {
    const model = createModel();
    const rawData = prepareData();
    const flatData = flattenData(rawData);
    const tensor = convertToTensor(flatData, maxChord);

    await model.fit(tensor.from, tensor.to, {epochs: 100});

    // await model.save(`file://${modelSavePath}`);
}

async function trainClassificationModel() {
    const model = createClassificationModel();
    const rawData = prepareData();
    const flatData = flattenData(rawData, ['numeric']);
    const tensor = convertToClassificationTensor(flatData, maxChordNumeric);

    for (let i = 0; i < 10; i++) {
        // eslint-disable-next-line no-await-in-loop
        await model.fit(tensor.from, tensor.to, {epochs: 1});

        const randomIndex = parseInt((Math.random() * flatData.length).toString(), 10);
        const testSlice = tensor.from.slice([randomIndex], [10]);
        const prediction = model.predict(testSlice) as TensorFlow.Tensor;

        testSlice.mul(maxChordNumeric).print();
        prediction.mul(100).print();
    }

    // await model.save(`file://${modelSavePath}`);
}

trainClassificationModel();
