import React, {ReactElement, useEffect, useRef, useState} from 'react';
import * as TensorFlow from '@tensorflow/tfjs';
import * as TensorFlowVis from '@tensorflow/tfjs-vis';
import carsData from './data/cars-data.json';
import {
    createModel as createCarModel,
    convertToTensor as convertCarsDataToTensor,
    trainModel as trainCarsModel,
    testModel as testCarsModel,
    ICarData,
    ITensorContainerObject
} from './models/cars';
import {Tensor2D} from '@tensorflow/tfjs-core';
import {Menu, Divider} from 'semantic-ui-react';
import {MnistData} from './data/mnist-data';
import {
    IMAGE_HEIGHT,
    IMAGE_WIDTH,
    createModel as createDigitsModel,
    trainModel as trainDigitsModel
} from './models/handwritten-digits';
import {Logs} from '@tensorflow/tfjs-layers';

export interface IFitCallbackHandlers {
    [key: string]: (iteration: number, log: Logs) => Promise<void>;
}

let carModel = createCarModel();
const carTensorSet = convertCarsDataToTensor(carsData as ICarData[]) as ITensorContainerObject;

const classNames = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const mnistData = new MnistData();
let digitsModel = createDigitsModel();

export const TensorFlowComponent: React.FunctionComponent = (): ReactElement => {
    const carsTrainRef = useRef(null);
    const carsTestRef = useRef(null);
    const [carsTrained, setCarsTrained] = useState(false);

    const digitsTrainRef = useRef(null);
    const digitsAccuracyRef = useRef(null);
    const digitsConfusionRef = useRef(null);
    const digitsExamplesRef = useRef(null);
    const [digitsLoading, setDigitsLoading] = useState(true);
    const [digitsTrained, setDigitsTrained] = useState(false);

    useEffect(() => {
        displayCarsModel();
        loadAndDisplayDigitsModel();
    });

    function displayCarsModel() {
        TensorFlowVis.show.modelSummary(carsTrainRef.current as any, carModel);
    }

    function handleTrainCars() {
        const fitCallbacks = TensorFlowVis.show.fitCallbacks(
            carsTrainRef.current as any,
            ['loss', 'mse'],
            {height: 200, callbacks: ['onEpochEnd']}
        );

        setCarsTrained(false);
        trainCarsModel(carModel, carTensorSet.inputs as Tensor2D, carTensorSet.labels as Tensor2D, fitCallbacks)
            .then(result => {
                // eslint-disable-next-line no-console
                console.log('train complete', result);
                setCarsTrained(true);
            });
    }

    function handleTestCars() {
        if (!carsTrained) {
            return;
        }
        const resultSet = testCarsModel(carModel, carsData as ICarData[], carTensorSet as ITensorContainerObject);
        const [predictedPoints, originalPoints] = resultSet;

        // eslint-disable-next-line no-console
        console.log('testCarsModel', predictedPoints, originalPoints);

        TensorFlowVis.render.scatterplot(
            carsTestRef.current as any,
            {values: [originalPoints, predictedPoints], series: ['original', 'predicted']},
            {
                xLabel: 'Horsepower',
                yLabel: 'Miles per Gallon',
                height: 200
            }
        );
    }

    function handleSaveCars() {
        carModel.save('localstorage://cars-model').then(savedResults => {
            // eslint-disable-next-line no-console
            console.log('cars model saved', savedResults);
        });
    }

    function handleLoadCars() {
        TensorFlow.loadLayersModel('localstorage://cars-model').then(model => {
            // eslint-disable-next-line no-console
            carModel = model as TensorFlow.Sequential;
            setCarsTrained(true);
        });
    }

    function loadAndDisplayDigitsModel() {
        mnistData.load().then(() => {
            setDigitsLoading(false);
            const examples = mnistData.nextTestBatch(20);
            const numExamples = examples.xs.shape[0];

            // console.log(examples.xs);

            for (let i = 0; i < numExamples; i++) {
                const imageTensor: Tensor2D = TensorFlow.tidy(() =>
                    examples.xs
                        .slice([i, 0], [1, examples.xs.shape[1]])
                        // Reshape image to 28x28
                        .reshape([IMAGE_WIDTH, IMAGE_HEIGHT, 1])
                );

                const canvas = document.createElement('canvas');

                canvas.width = IMAGE_WIDTH;
                canvas.height = IMAGE_HEIGHT;
                canvas.style.cssText = 'margin: 4px;';
                TensorFlow.browser.toPixels(imageTensor, canvas).then(() => {
                    (digitsExamplesRef.current as any).appendChild(canvas);
                });

                imageTensor.dispose();
            }

            TensorFlowVis.show.modelSummary(digitsTrainRef.current as any, digitsModel);
        });
    }

    function handleTrainDigits() {
        const fitCallbacks = TensorFlowVis.show.fitCallbacks(
            digitsTrainRef.current as any,
            ['loss', 'val_loss', 'acc', 'val_acc'],
            {height: 200}
        );

        trainDigitsModel(digitsModel, mnistData, fitCallbacks).then(() => {
            setDigitsTrained(true);
        });
    }

    function handleSaveDigits() {
        digitsModel.save('localstorage://digits-model').then(savedResults => {
            // eslint-disable-next-line no-console
            console.log('digits model saved', savedResults);
        });
    }
    function handleLoadDigits() {
        TensorFlow.loadLayersModel('localstorage://digits-model').then(model => {
            // eslint-disable-next-line no-console
            digitsModel = model as TensorFlow.Sequential;
            setDigitsTrained(true);
        });
    }

    function handleTestDigits() {
        function predict(model: TensorFlow.Sequential, testDataSize = 500) {
            const testData = mnistData.nextTestBatch(testDataSize);
            const testXs = testData.xs.reshape([testDataSize, IMAGE_WIDTH, IMAGE_HEIGHT, 1]);
            const labels = testData.labels.argMax(-1);
            const predictions = (model.predict(testXs) as any).argMax(-1);

            testXs.dispose();

            return [predictions, labels];
        }

        async function showAccuracy(model: TensorFlow.Sequential) {
            const [predictions, labels] = predict(model);
            const classAccuracy = await TensorFlowVis.metrics.perClassAccuracy(labels, predictions);

            TensorFlowVis.show.perClassAccuracy(
                digitsAccuracyRef.current as any,
                classAccuracy,
                classNames
            );
            labels.dispose();
            // predictions.dispose();
        }

        async function showConfusion(model: TensorFlow.Sequential) {
            const [predictions, labels] = predict(model);
            const confusionMatrix = await TensorFlowVis.metrics.confusionMatrix(labels, predictions);

            TensorFlowVis.render.confusionMatrix(
                digitsConfusionRef.current as any,
                {values: confusionMatrix, tickLabels: classNames}
            );

            labels.dispose();
            // predictions.dispose();
        }

        showAccuracy(digitsModel);
        showConfusion(digitsModel);
    }

    return (
        <React.Fragment>
            <Menu secondary pointing stackable>
                <Menu.Item header content={'Tensor Flow Cars'} />
                <Menu.Item content={'Train'} onClick={handleTrainCars} />
                <Menu.Item content={'Save'} disabled={!carsTrained} onClick={handleSaveCars} />
                <Menu.Item content={'Load'} onClick={handleLoadCars} />
                <Menu.Item content={'Test'} disabled={!carsTrained} onClick={handleTestCars} />
            </Menu>
            <div ref={carsTestRef}>{carsTrained ? '' : 'model not trained'}</div>
            <Divider />
            <div ref={carsTrainRef} />

            <Menu secondary pointing stackable>
                <Menu.Item header content={'Tensor Flow Handwritten digits'} />
                <Menu.Item content={'Train'} onClick={handleTrainDigits} disabled={digitsLoading} />
                <Menu.Item content={'Save'} disabled={!digitsTrained} onClick={handleSaveDigits} />
                <Menu.Item content={'Load'} onClick={handleLoadDigits} />
                <Menu.Item content={'Test'} disabled={!digitsTrained} onClick={handleTestDigits} />
            </Menu>
            <div ref={digitsTrainRef} />
            <Divider />
            <div ref={digitsAccuracyRef}>{digitsTrained ? '' : 'model not trained'}</div>
            <Divider />
            <div ref={digitsConfusionRef} />
            <div ref={digitsExamplesRef} />
        </React.Fragment>
    );
};
