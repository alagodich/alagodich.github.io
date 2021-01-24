/* eslint no-await-in-loop: 0 */
/* eslint no-console: 0 */

import '@tensorflow/tfjs-node-gpu';
import path from 'path';
import {
    createModel,
    trainingData,
    evaluate,
    predictSample,
    getRandomSample,
    pitchFromClassNum
} from './model';

export const modelSavePath = path.resolve(__dirname, './data/pitch-type-model');
const TIMEOUT_BETWEEN_EPOCHS_MS = 500;

function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function train() {
    const numTrainingIterations = 10;
    const model = createModel();

    for (let i = 0; i < numTrainingIterations; i++) {
        console.log(`Training iteration ${i + 1} / ${numTrainingIterations}`);
        const sample = await getRandomSample(i.toString());

        // console.log(sample.xs, pitchFromClassNum(sample.ys));
        await model.fitDataset(trainingData, {epochs: 1});

        console.log('accuracyPerClass', await evaluate(model, true));
        console.log('Predict sample');
        console.log('---PREDICTION', await predictSample(model, sample.xs));
        console.log('---REAL', pitchFromClassNum(sample.ys));

        await sleep(TIMEOUT_BETWEEN_EPOCHS_MS);
    }

    await model.save(`file://${modelSavePath}`);
}

train();
