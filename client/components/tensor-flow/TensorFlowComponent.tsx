import React, {ReactElement, useRef, useEffect} from 'react';
import * as tfvis from '@tensorflow/tfjs-vis';
import carsData from './data/cars-data.json';
import {createModel, convertToTensor, trainModel, testModel, ICarData, ITensorContainerObject} from './models/cars';
import {Tensor2D} from '@tensorflow/tfjs-core';

const model = createModel();
const tensor = convertToTensor(carsData as ICarData[]) as ITensorContainerObject;

// TODO save models to fs with https://www.tensorflow.org/js/guide/save_load#native_file_system_nodejs_only
// TODO then load with http https://www.tensorflow.org/js/guide/save_load#https

export const TensorFlowComponent: React.FunctionComponent = (): ReactElement => {
    const detailsContainerRef = useRef(null);
    const resultContainerRef = useRef(null);

    useEffect(() => {
        // TODO Save to local storage
        // const saveResult = await model.save('localstorage://my-model-1');
        // const model = await tf.loadLayersModel('localstorage://my-model-1');

        tfvis.show.modelSummary(detailsContainerRef.current as any, model);
        const visCallbacks = tfvis.show.fitCallbacks(
            detailsContainerRef.current as any,
            ['loss', 'mse'],
            {height: 200, callbacks: ['onEpochEnd']}
        );

        trainModel(model, tensor.inputs as Tensor2D, tensor.labels as Tensor2D, visCallbacks).then(result => {
            // eslint-disable-next-line no-console
            console.log('train complete', result);
            testModel(model, carsData as ICarData[], tensor as ITensorContainerObject).then(resultSet => {
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

        });

    });

    return (
        <React.Fragment>
            {'Tensor Flow'}
            <div ref={resultContainerRef}>{'...loading'}</div>
            <div ref={detailsContainerRef} />
        </React.Fragment>
    );
};
