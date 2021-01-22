import '@tensorflow/tfjs-node-gpu';
import {prepareData, flattenData} from './data';
import {convertToTensor} from './tensor';
import {createModel} from './model';
import path from 'path';
export const modelSavePath = path.resolve(__dirname, './data/harmony-model');

async function train() {
    const model = createModel();
    const rawData = prepareData();
    const flatData = flattenData(rawData);
    const tensor = convertToTensor(flatData);

    await model.fit(tensor.from, tensor.to, {epochs: 100});

    await model.save(`file://${modelSavePath}`);
}

train();
