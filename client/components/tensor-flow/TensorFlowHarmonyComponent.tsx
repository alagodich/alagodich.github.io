import React, {ReactElement, useEffect, useRef, useState} from 'react';
import * as TensorFlow from '@tensorflow/tfjs';
import * as TensorFlowVis from '@tensorflow/tfjs-vis';
import {Menu, Divider, List, Grid} from 'semantic-ui-react';
import {default as CSound} from '@kunstmusik/csound';

import {
    prepareData,
    flattenData,
    maxChord,
    convertDigitToChord,
    chordToPrintString
} from '../../../server/tensor-flow/harmony/data';
import {convertToTensor} from '../../../server/tensor-flow/harmony/tensor';
import CsdGenerator from '../csound/CsdGenerator';
import {IIRealProChord} from '../real-book/types';

const rawData = prepareData();
const flatData = flattenData(rawData);
const tensor = convertToTensor(flatData);

async function printSliceAsChordString(testSlice: TensorFlow.Tensor) {
    const testSliceUnNormalized = testSlice.mul(maxChord);
    const testSliceUnNormalizedArray = await testSliceUnNormalized.array() as number[][];
    const chord = convertDigitToChord(testSliceUnNormalizedArray[0][0]);

    return [chordToPrintString(chord), chord];
}

interface IPredictedStep {
    x: string;
    y: string;
}

export const TensorFlowHarmonyComponent: React.FunctionComponent = (): ReactElement => {
    const trainRef = useRef(null);
    const [modelStatus, setModelStatus] = useState(null as string | null);
    const [predictedSteps, setPredictedSteps] = useState([] as IPredictedStep[]);
    const [predictedChords, setPredictedChords] = useState([] as IIRealProChord[]);
    const [cSoundMessages, setCSoundMessages] = useState([] as string[]);
    const [cSoundStatus, setCsoundStatus] = useState(null as string | null);
    const [cSound, setCsound] = useState(null as any);
    const [model, setModel] = useState(null as TensorFlow.LayersModel | null);

    useEffect(() => {
        loadAndDisplayModel();
        loadCSound();
    });

    useEffect(() => {
        if (model) {
            setModelStatus('loaded');

            TensorFlowVis.show.modelSummary(trainRef.current as any, model);
        }
    }, [model]);

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.addEventListener('beforeunload', handleBeforeUnload);
        };
    }, [cSound]);

    function loadAndDisplayModel() {
        if (!model && modelStatus === null) {
            setModelStatus('loading');
            TensorFlow.loadLayersModel('http://localhost:3000/assets/harmony-model/model.json').then(modelInstance => {
                setModel(modelInstance);
            });
        }
    }

    function loadCSound() {
        if (!cSound && cSoundStatus === null) {
            setCsoundStatus('initializing');
            CSound.initialize().then(() => {
                const cSoundInstance = new CSound();

                cSoundInstance.setMessageCallback(handleCSoundMessage);
                setCsound(cSoundInstance);
                setCsoundStatus('ready');
            });
        }
    }

    function handleCSoundMessage(message: string) {
        setCSoundMessages([message, ...cSoundMessages]);
    }

    function handleBeforeUnload() {
        cSound?.stop();
        cSound?.reset();
        cSound?.destroy();
    }

    async function handleTest() {
        if (!model || modelStatus !== 'loaded') {
            return;
        }

        const randomIndex = parseInt((Math.random() * flatData.length).toString(), 10);
        const testSlice = tensor.from.slice([randomIndex], [1]);
        const [x, testChord] = await printSliceAsChordString(testSlice);
        const predicted: TensorFlow.Tensor = model.predict(testSlice) as TensorFlow.Tensor;
        const [y, predictedChord] = await printSliceAsChordString(predicted);

        setPredictedSteps([{x: x as string, y: y as string}, ...predictedSteps]);
        setPredictedChords([...[testChord as IIRealProChord, predictedChord as IIRealProChord], ...predictedChords]);
    }

    function handleGenerateOrchestra() {
        const csdGenerator = new CsdGenerator();

        // TODO maybe we should set the key instead, but major/minor should be enough too
        csdGenerator.setIsMajor(true);
        csdGenerator.useDefaultInstruments();

        predictedChords.forEach((chord, key) => {
            csdGenerator.addChord(chord, key, 1);
        });

        const orchestra = csdGenerator.compile();

        handleCSoundMessage(orchestra);
        cSound.compileCSD(orchestra);
    }

    function handleUnloadOrchestra() {
        cSound.stop();
        cSound.reset();
    }

    function handleCSoundPlay() {
        cSound.setOption('-+msg_color=false');
        cSound.start();
        cSound.audioContext.resume();
        if (CSound.CSOUND_AUDIO_CONTEXT.state === 'suspended') {
            CSound.CSOUND_AUDIO_CONTEXT.resume().then(() => {
                // console.log('CSound.CSOUND_AUDIO_CONTEXT.resume() DONE');
            });
        }
        setCsoundStatus('playing');
    }

    function handleCSoundStop() {
        if (CSound.CSOUND_AUDIO_CONTEXT.state === 'running') {
            CSound.CSOUND_AUDIO_CONTEXT.suspend().then(() => {
                // console.log('CSound.CSOUND_AUDIO_CONTEXT.suspend() DONE');
            });
        }
        setCsoundStatus('paused');
    }

    return (
        <React.Fragment>
            <Menu secondary pointing stackable>
                <Menu.Item header content={'Tensor Flow Harmony'} />
                <Menu.Item content={'Predict'} disabled={modelStatus !== 'loaded'} onClick={handleTest} />
                <Menu.Item
                    content={'Generate Orchestra'}
                    disabled={cSoundStatus !== 'ready'}
                    onClick={handleGenerateOrchestra}
                />
                <Menu.Item
                    content={'Unload Orchestra'}
                    disabled={cSoundStatus !== 'ready'}
                    onClick={handleUnloadOrchestra}
                />
                <Menu.Item
                    content={'Play'}
                    disabled={cSoundStatus !== 'ready'}
                    onClick={handleCSoundPlay}
                />
                <Menu.Item
                    content={'Stop'}
                    disabled={cSoundStatus !== 'playing'}
                    onClick={handleCSoundStop}
                />
            </Menu>
            <div ref={trainRef} />
            <Divider />
            <Grid columns={2}>
                <Grid.Column>
                    <List>{predictedSteps.map((step: IPredictedStep, key: number) =>
                        <List.Item key={key}>{`${step.x} -> ${step.y}`}</List.Item>)
                    }</List>
                </Grid.Column>
                <Grid.Column>
                    <List>{cSoundMessages.map((message: string, key) =>
                        <List.Item key={key}>{message}</List.Item>)
                    }</List>
                </Grid.Column>
            </Grid>

        </React.Fragment>
    );
};
