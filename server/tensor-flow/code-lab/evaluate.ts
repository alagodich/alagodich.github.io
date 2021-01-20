/* eslint no-await-in-loop: 0 */
/* eslint no-console: 0 */

import fs from 'fs';
import * as TensorFlow from '@tensorflow/tfjs-node';
import {
    // trainingData,
    evaluate,
    predictSample,
    getRandomSample,
    pitchFromClassNum
} from './model';
import {modelSavePath} from './train';

function isModelSaved(): Promise<boolean> {
    return new Promise(resolve => {
        fs.access(`${modelSavePath}/model.json`, (error: any) => {
            if (error) {
                console.log('No saved model found.');
                resolve(false);
            }
            return resolve(true);
        });
    });
}

async function train() {
    const numEvaluatingIterations = 10;

    const modelIsSaved = await isModelSaved();

    if (!modelIsSaved) {
        throw new Error('Train first.');
    }

    const model = await TensorFlow.loadLayersModel(`file://${modelSavePath}/model.json`) as TensorFlow.Sequential;

    for (let i = 0; i < numEvaluatingIterations; i++) {
        console.log(`Evaluating iteration ${i + 1} / ${numEvaluatingIterations}`);
        const sample = await getRandomSample(i.toString());

        console.log('accuracyPerClass', await evaluate(model, true));
        console.log('Predict sample');
        console.log('---PREDICTION', await predictSample(model, sample.xs));
        console.log('---REAL', pitchFromClassNum(sample.ys));
    }
}

train();
