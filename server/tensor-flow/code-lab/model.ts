/* eslint camelcase: 0 */
import path from 'path';
// const TensorFlow = require('@tensorflow/tfjs');
import * as TensorFlow from '@tensorflow/tfjs';
import {Tensor} from '@tensorflow/tfjs-core';
// https://storage.googleapis.com/mlb-pitch-data/pitch_type_training_data.csv
const trainingDataPath = path.resolve(__dirname, './data/pitch_type_training_data.csv');
// https://storage.googleapis.com/mlb-pitch-data/pitch_type_test_data.csv
const testDataPath = path.resolve(__dirname, './data/pitch_type_test_data.csv');

interface IPitchDataRowCsv {
    xs: {
        vx0: number;
        vy0: number;
        vz0: number;
        ax: number;
        ay: number;
        az: number;
        start_speed: number;
        left_handed_pitcher: number;
    };
    ys: {
        pitch_code: number;
    };
}
interface IPitchDataRow {
    // 7 digits
    xs: number[];
    // pitch_code
    ys: number;
}

interface IEvaluationResult {
    [pitchType: string]: {
        training: number;
        validation?: number;
    };
}

// Constants from training data
const csvConfig = {columnConfigs: {pitch_code: {isLabel: true}}};
const VX0_MIN = -18.885;
const VX0_MAX = 18.065;
const VY0_MIN = -152.463;
const VY0_MAX = -86.374;
const VZ0_MIN = -15.5146078412997;
const VZ0_MAX = 9.974;
const AX_MIN = -48.0287647107959;
const AX_MAX = 30.592;
const AY_MIN = 9.397;
const AY_MAX = 49.18;
const AZ_MIN = -49.339;
const AZ_MAX = 2.95522851438373;
const START_SPEED_MIN = 59;
const START_SPEED_MAX = 104.4;

const NUM_PITCH_CLASSES = 7;
const TRAINING_DATA_LENGTH = 7000;
const TEST_DATA_LENGTH = 700;

function normalize(value: number, min: number, max: number): number {
    return min === undefined || max === undefined
        ? value
        : (value - min) / (max - min);
}

function csvTransform({xs, ys}: IPitchDataRowCsv) {
    const values = [
        normalize(xs.vx0, VX0_MIN, VX0_MAX),
        normalize(xs.vy0, VY0_MIN, VY0_MAX),
        normalize(xs.vz0, VZ0_MIN, VZ0_MAX),
        normalize(xs.ax, AX_MIN, AX_MAX),
        normalize(xs.ay, AY_MIN, AY_MAX),
        normalize(xs.az, AZ_MIN, AZ_MAX),
        normalize(xs.start_speed, START_SPEED_MIN, START_SPEED_MAX),
        xs.left_handed_pitcher
    ];

    return {xs: values, ys: ys.pitch_code};
}

export const trainingData = TensorFlow.data.csv(`file://${trainingDataPath}`, csvConfig)
    .map(csvTransform as any)
    .shuffle(TRAINING_DATA_LENGTH)
    .batch(100);
const trainingValidationData = TensorFlow.data.csv(`file://${trainingDataPath}`, csvConfig)
    .map(csvTransform as any)
    // Batch converts raw data to array of tensors with the given size
    .batch(TRAINING_DATA_LENGTH);
const testValidationData = TensorFlow.data.csv(`file://${testDataPath}`, csvConfig)
    .map(csvTransform as any)
    .batch(TEST_DATA_LENGTH);

export function createModel(): TensorFlow.Sequential {
    const model = TensorFlow.sequential();

    model.add(TensorFlow.layers.dense({inputShape: [8], units: 250, activation: 'relu'}));
    model.add(TensorFlow.layers.dense({units: 175, activation: 'relu'}));
    model.add(TensorFlow.layers.dense({units: 150, activation: 'relu'}));
    model.add(TensorFlow.layers.dense({units: NUM_PITCH_CLASSES, activation: 'softmax'}));

    model.compile({
        optimizer: TensorFlow.train.adam(),
        loss: 'sparseCategoricalCrossentropy',
        metrics: ['accuracy']
    });

    return model;
}

export async function getRandomSample(seed: string): Promise<IPitchDataRow> {
    const testValidationSample = TensorFlow.data.csv(`file://${testDataPath}`, csvConfig)
        .map(csvTransform as any)
        .shuffle(TEST_DATA_LENGTH, seed);
    const samples: IPitchDataRow[] = [];

    await testValidationSample.forEachAsync((sample: any) => {
        if (!samples.length) {
            samples.push(sample as IPitchDataRow);
        }
    });

    return samples[0];
}

export async function evaluate(model: TensorFlow.Sequential, useTestData: boolean): Promise<IEvaluationResult> {
    const results: IEvaluationResult = {};

    await trainingValidationData.forEachAsync((pitchTypeBatch: any) => {
        const tensor: Tensor = model.predict(pitchTypeBatch.xs) as Tensor;
        // eslint-disable-next-line no-sync
        const values = tensor.dataSync() as Float32Array;
        const classSize = TRAINING_DATA_LENGTH / NUM_PITCH_CLASSES;

        for (let i = 0; i < NUM_PITCH_CLASSES; i++) {
            results[pitchFromClassNum(i)] = {
                training: calcPitchClassEvaluation(i, classSize, values)
            };
        }
    });

    if (useTestData) {
        await testValidationData.forEachAsync((pitchTypeBatch: any) => {
            const tensor: Tensor = model.predict(pitchTypeBatch.xs) as Tensor;
            // eslint-disable-next-line no-sync
            const values = tensor.dataSync() as Float32Array;
            const classSize = TEST_DATA_LENGTH / NUM_PITCH_CLASSES;

            for (let i = 0; i < NUM_PITCH_CLASSES; i++) {
                results[pitchFromClassNum(i)].validation = calcPitchClassEvaluation(i, classSize, values);
            }
        });
    }

    return results;
}

/**
 /**
 * Predict a single sample
 * @param sample, array of 8 digits - 1 line from csv
 * @param model
 *
 * Returns final evaluation
 */
export async function predictSample(model: TensorFlow.Sequential, sample: number[]): Promise<string> {
    // results is an array of one evaluation row
    const tensor: Tensor = model.predict(TensorFlow.tensor(sample, [1, sample.length])) as Tensor;
    const results: number[][] = await tensor.array() as number[][];

    let maxValue = 0;
    let predictPitch = 7;

    for (let i = 0; i < NUM_PITCH_CLASSES; i++) {
        if (results[0][i] > maxValue) {
            predictPitch = i;
            maxValue = results[0][i];
        }
    }

    return pitchFromClassNum(predictPitch);
}

/**
 * Determine accuracy evaluation for each class of pitch
 */
function calcPitchClassEvaluation(pitchIndex: number, classSize: number, values: Float32Array): number {
    let index = (pitchIndex * classSize * NUM_PITCH_CLASSES) + pitchIndex;
    let total = 0;

    for (let i = 0; i < classSize; i++) {
        total += values[index];
        index += NUM_PITCH_CLASSES;
    }

    return total / classSize;
}

// Returns the string value for Baseball pitch labels
export function pitchFromClassNum(classNum: number): string {
    switch (classNum) {
        case 0:
            return 'Fastball (2-seam)';
        case 1:
            return 'Fastball (4-seam)';
        case 2:
            return 'Fastball (sinker)';
        case 3:
            return 'Fastball (cutter)';
        case 4:
            return 'Slider';
        case 5:
            return 'Changeup';
        case 6:
            return 'Curveball';
        default:
            return 'Unknown';
    }
}
