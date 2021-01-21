/* eslint no-sync: 0 */
import * as TensorFlow from '@tensorflow/tfjs';
import {Tensor2D} from '@tensorflow/tfjs-core';
import carsData from '../data/cars-data.json';
import {IFitCallbackHandlers} from '../TensorFlowComponent';

export interface ICarData {
    Acceleration: number;
    Cylinders: number;
    Displacement: number;
    Horsepower: number;
    // eslint-disable-next-line camelcase
    Miles_per_Gallon: number;
    Name: string;
    Origin: string;
    // eslint-disable-next-line camelcase
    Weight_in_lbs: number;
    Year: string;
}

export interface ITensorContainerObject {
    inputs: TensorFlow.Tensor<TensorFlow.Rank>;
    labels: TensorFlow.Tensor<TensorFlow.Rank>;
    inputMax: TensorFlow.Tensor<TensorFlow.Rank>;
    inputMin: TensorFlow.Tensor<TensorFlow.Rank>;
    labelMax: TensorFlow.Tensor<TensorFlow.Rank>;
    labelMin: TensorFlow.Tensor<TensorFlow.Rank>;
}

/**
 * ('constant'|'glorotNormal'|'glorotUniform'|'heNormal'|'heUniform'|'identity'| 'leCunNormal'|'leCunUniform'|'ones'
 * |'orthogonal'|'randomNormal'| 'randomUniform'|'truncatedNormal'|'varianceScaling'|'zeros'|string|
 */
export function createModel(): TensorFlow.Sequential {
    const model = TensorFlow.sequential();

    // Each input is a single digit, first layer will produce 1 output
    model.add(TensorFlow.layers.dense({inputShape: [1], units: 1, useBias: true}));
    // This layer will produce 50 variants to the given input using Rectified linear activation function.
    // Variants will be generated with heUniform initializer, these two give good results leCunUniform or heUniform
    model.add(TensorFlow.layers.dense({units: 100, activation: 'relu', kernelInitializer: 'heUniform'}));
    // Back to 1 output from 50
    model.add(TensorFlow.layers.dense({units: 1}));

    model.compile({
        optimizer: TensorFlow.train.adam(),
        loss: TensorFlow.losses.meanSquaredError,
        metrics: ['mse']
    });

    return model;
}

export function convertToTensor(data: ICarData[]): ITensorContainerObject {
    return TensorFlow.tidy(() => {
        TensorFlow.util.shuffle(data);

        const inputs = data.map(item => item.Horsepower);
        const labels = data.map(item => item.Miles_per_Gallon);

        const inputTensor = TensorFlow.tensor2d(inputs, [inputs.length, 1]);
        const labelTensor = TensorFlow.tensor2d(labels, [labels.length, 1]);

        const inputMax = inputTensor.max();
        const inputMin = inputTensor.min();
        const labelMax = labelTensor.max();
        const labelMin = labelTensor.min();

        const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
        const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

        return {
            inputs: normalizedInputs,
            labels: normalizedLabels,
            inputMax,
            inputMin,
            labelMax,
            labelMin
        };
    });
}

export function trainModel(
    model: TensorFlow.Sequential,
    inputs: Tensor2D,
    labels: Tensor2D,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    callbacks: IFitCallbackHandlers
): Promise<TensorFlow.History> {
    const batchSize = 32;
    const epochs = 50;

    return model.fit(inputs, labels, {
        batchSize,
        epochs,
        callbacks
        // validationData: [inputs, labels]
    });
}

export function testModel(
    model: TensorFlow.Sequential,
    originalInputData: ICarData[],
    normalizationData: ITensorContainerObject
): any {
    const [xs, ys] = TensorFlow.tidy(() => {
        const {inputMax, inputMin, labelMax, labelMin} = normalizationData;
        const minHorsepower: number = (carsData as ICarData[]).reduce((accumulator, car) => {
            if (!accumulator || car.Horsepower < accumulator) {
                return car.Horsepower;
            }
            return accumulator;
        }, 0);

        // eslint-disable-next-line no-sync
        const inputMaxValue = inputMax.arraySync() as number;
        const generatedTestedXs = TensorFlow.linspace(minHorsepower, inputMaxValue, 100);
        const normalizedTestXs = generatedTestedXs.sub(inputMin).div(inputMax.sub(inputMin));
        const predictions = model.predict(normalizedTestXs.reshape([100, 1]));

        const unNormalizedXs = normalizedTestXs.mul(inputMax.sub(inputMin)).add(inputMin);
        const unNormalizedPredictions = (predictions as any).mul(labelMax.sub(labelMin)).add(labelMin);

        const unNormalizedXsData = unNormalizedXs.dataSync();
        const unNormalizedPredictionsData = unNormalizedPredictions.dataSync();

        return [unNormalizedXsData as any, unNormalizedPredictionsData];
    });

    const predictedPoints = [...xs].map((value, index) => ({
        x: value, y: ys[index]
    }));

    const originalPoints = originalInputData.map(car => ({
        x: car.Horsepower, y: car.Miles_per_Gallon
    }));

    // console.log(TensorFlow.memory());
    return [predictedPoints, originalPoints];
}
