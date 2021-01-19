import React, {ReactElement, useEffect, useRef, useState} from 'react';
import * as TensorFlow from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import carsData from './data/cars-data.json';
import {createModel, convertToTensor, trainModel, testModel, ICarData, ITensorContainerObject} from './models/cars';
import {Tensor2D} from '@tensorflow/tfjs-core';
import {Menu} from 'semantic-ui-react';

let carModel = createModel();
const tensor = convertToTensor(carsData as ICarData[]) as ITensorContainerObject;

// TODO save models to fs with https://www.tensorflow.org/js/guide/save_load#native_file_system_nodejs_only
// TODO then load with http https://www.tensorflow.org/js/guide/save_load#https

export const TensorFlowComponent: React.FunctionComponent = (): ReactElement => {
    const detailsContainerRef = useRef(null);
    const resultContainerRef = useRef(null);
    const [carsTrained, setCarsTrained] = useState(false);
    const [digitsTrained, setDigitsTrained] = useState(false);


    useEffect(() => {
        tfvis.show.modelSummary(detailsContainerRef.current as any, carModel);
    });

    function handleTrainCars() {
        const visCallbacks = tfvis.show.fitCallbacks(
            detailsContainerRef.current as any,
            ['loss', 'mse'],
            {height: 200, callbacks: ['onEpochEnd']}
        );

        setCarsTrained(false);
        trainModel(carModel, tensor.inputs as Tensor2D, tensor.labels as Tensor2D, visCallbacks).then(result => {
            // eslint-disable-next-line no-console
            console.log('train complete', result);
            setCarsTrained(true);
        });
    }

    function handleTestCars() {
        if (!carsTrained) {
            return;
        }
        testModel(carModel, carsData as ICarData[], tensor as ITensorContainerObject).then(resultSet => {
            const [predictedPoints, originalPoints] = resultSet;

            // eslint-disable-next-line no-console
            console.log('testModel', predictedPoints, originalPoints);

            tfvis.render.scatterplot(
                resultContainerRef.current as any,
                {values: [originalPoints, predictedPoints], series: ['original', 'predicted']},
                {
                    xLabel: 'Horsepower',
                    yLabel: 'Miles per Gallon',
                    height: 300
                }
            );
        });
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
            carModel = model;
            setCarsTrained(true);
        });
    }

    function handleTrainDigits() {

    }
    function handleSaveDigits() {

    }
    function handleLoadDigits() {

    }
    function handleTestDigits() {

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
            <div ref={resultContainerRef}>{'...loading'}</div>
            <div ref={detailsContainerRef} />
            <Menu secondary pointing stackable>
                <Menu.Item header content={'Tensor Flow Handwritten digits'} />
                <Menu.Item content={'Train'} onClick={handleTrainDigits} />
                <Menu.Item content={'Save'} disabled={!digitsTrained} onClick={handleSaveDigits} />
                <Menu.Item content={'Load'} onClick={handleLoadDigits} />
                <Menu.Item content={'Test'} disabled={!digitsTrained} onClick={handleTestDigits} />
            </Menu>
        </React.Fragment>
    );
};
