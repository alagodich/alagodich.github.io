import React, {ReactElement, useEffect, useRef, useState} from 'react';
import * as TensorFlow from '@tensorflow/tfjs';
import * as TensorFlowVis from '@tensorflow/tfjs-vis';

import {prepareData, flattenData} from '../../../server/tensor-flow/harmony/data';
import {convertToTensor} from '../../../server/tensor-flow/harmony/tensor';
import {createModel} from '../../../server/tensor-flow/harmony/model';

const rawData = prepareData();
const flatData = flattenData(rawData);
const tensor = convertToTensor(flatData);

// async function train() {
//     const model = createModel();
//     const rawData = prepareData();
//     const flatData = flattenData(rawData);
//     const tensor = convertToTensor(flatData);
//
//     await model.fit(tensor.from, tensor.to, {epochs: 100});
//
//     await model.save(`file://${modelSavePath}`);
// }

import {Menu, Divider} from 'semantic-ui-react';

let model = createModel();

export const TensorFlowHarmonyComponent: React.FunctionComponent = (): ReactElement => {
    const trainRef = useRef(null);
    const testRef = useRef(null);
    const [modelTrained, setModelTrained] = useState(false);

    useEffect(() => {
        displayModel();
    });

    function displayModel() {
        TensorFlowVis.show.modelSummary(trainRef.current as any, model);
    }

    function handleTrain() {
        const fitCallbacks = TensorFlowVis.show.fitCallbacks(
            trainRef.current as any,
            ['loss', 'mse'],
            {height: 200, callbacks: ['onEpochEnd']}
        );

        setModelTrained(false);

        // model.fit(tensor.from, tensor.to, {epochs: 10, callbacks: fitCallbacks}).then(result => {
        //     console.log('train complete', result);
        //     setModelTrained(true);
        // });

        // train(model, tensor.inputs as Tensor2D, tensor.labels as Tensor2D, fitCallbacks)
        //     .then(result => {
        //         // eslint-disable-next-line no-console
        //         console.log('train complete', result);
        //         setModelTrained(true);
        //     });
    }

    function handleTest() {
        if (!modelTrained) {
            return;
        }
        // const resultSet = testModel(model, data, tensor as ITensorContainerObject);
        // const [predictedPoints, originalPoints] = resultSet;
        //
        // // eslint-disable-next-line no-console
        // console.log('testModel', predictedPoints, originalPoints);
        //
        // TensorFlowVis.render.scatterplot(
        //     testRef.current as any,
        //     {values: [originalPoints, predictedPoints], series: ['original', 'predicted']},
        //     {
        //         xLabel: 'Horsepower',
        //         yLabel: 'Miles per Gallon',
        //         height: 200
        //     }
        // );
    }

    function handleSave() {
        model.save('localstorage://harmony-model').then(savedResults => {
            // eslint-disable-next-line no-console
            console.log('harmony model saved', savedResults);
        });
    }

    function handleLoad() {
        TensorFlow.loadLayersModel('localstorage://harmony-model').then(modelInstance => {
            // eslint-disable-next-line no-console
            model = modelInstance as TensorFlow.Sequential;
            setModelTrained(true);
        });
    }

    return (
        <React.Fragment>
            <Menu secondary pointing stackable>
                <Menu.Item header content={'Tensor Flow Harmony'} />
                <Menu.Item content={'Train'} onClick={handleTrain} />
                <Menu.Item content={'Save'} disabled={!modelTrained} onClick={handleSave} />
                <Menu.Item content={'Load'} onClick={handleLoad} />
                <Menu.Item content={'Test'} disabled={!modelTrained} onClick={handleTest} />
            </Menu>
            <div ref={testRef}>{modelTrained ? '' : 'model not trained'}</div>
            <Divider />
            <div ref={trainRef} />
        </React.Fragment>
    );
};
