import React, {ReactElement, useEffect, useRef, useState} from 'react';
import * as TensorFlow from '@tensorflow/tfjs';
import * as TensorFlowVis from '@tensorflow/tfjs-vis';
import {Menu, Divider, List, Grid} from 'semantic-ui-react';
import {default as CSound} from '@kunstmusik/csound';
import {chordToString} from '../real-book/IRealProChartModel';

import {
    convertEmbeddingXsTensorToChord,
    convertEmbeddingYsTensorToPredictionObject, IEmbeddingPrediction
} from '../../../server/tensor-flow/harmony/tensor';
import CsdGenerator from '../csound/CsdGenerator';
import {ChordPredictionComponent} from './ChordPredictionComponent';
import {IIRealProChord} from '../real-book/types';

export interface IPredictedStep {
    chordString: string;
    chord: IIRealProChord;
    digits: number[];
    probabilities: IEmbeddingPrediction;
}

const predictionPull = 8;

export const TensorFlowHarmonyComponent: React.FunctionComponent = (): ReactElement => {
    const modelSummaryRef = useRef(null);
    const [modelStatus, setModelStatus] = useState(null as string | null);
    const [predictedChords, setPredictedChords] = useState([] as IPredictedStep[]);
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

            TensorFlowVis.show.modelSummary(modelSummaryRef.current as any, model);
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
            const modelUrl = `http://${window.location.host}/assets/harmony-model/model.json`;

            setModelStatus('loading');
            TensorFlow.loadLayersModel(modelUrl).then(modelInstance => setModel(modelInstance));
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

    function makeTestTensor(chord: number[]): Array<TensorFlow.Tensor<TensorFlow.Rank>> {
        return [
            TensorFlow.tensor2d([[chord[0]]]),
            TensorFlow.tensor2d([[chord[1]]]),
            TensorFlow.tensor2d([[chord[2]]])
        ];
    }

    function getNextProbablePredictedChord(random: boolean): number[] {
        if (predictedChords.length) {
            const lastChord = predictedChords[0];

            // Get random predicted chords from the first 3
            if (random) {
                const randomIndex = () => Math.floor(Math.random() * Math.floor(3));

                return [
                    lastChord.probabilities.numeric[randomIndex()].index,
                    lastChord.probabilities.shift[0].index,
                    lastChord.probabilities.quality[0].index
                ];
            }

            // Get random not the same chord
            const numeric = lastChord.digits[0] === lastChord.probabilities.numeric[0].index
                ? lastChord.probabilities.numeric[1].index
                : lastChord.probabilities.numeric[0].index;

            return [
                numeric,
                lastChord.probabilities.shift[0].index,
                lastChord.probabilities.quality[0].index
            ];
        }

        // Get first stem major
        return [1, 0, 10];
    }

    async function handleTest() {
        if (!model || modelStatus !== 'loaded') {
            return;
        }

        const nextTestChord = getNextProbablePredictedChord(false);
        const testTensor = makeTestTensor(nextTestChord);
        const predictionTensorSet = model.predict(testTensor) as TensorFlow.Tensor[];
        const testChord = await convertEmbeddingXsTensorToChord(testTensor);
        const prediction = await convertEmbeddingYsTensorToPredictionObject(predictionTensorSet);

        setPredictedChords([
            {
                chordString: chordToString(testChord.chord),
                chord: testChord.chord,
                digits: testChord.digits,
                probabilities: prediction
            },
            ...predictedChords.slice(0, predictionPull)
        ]);
    }

    function handleGenerateOrchestra() {
        const csdGenerator = new CsdGenerator();

        // TODO maybe we should set the key instead, but major/minor should be enough too
        csdGenerator.setIsMajor(true);
        csdGenerator.useDefaultInstruments();

        predictedChords.reverse().forEach((prediction, key) => {
            csdGenerator.addChord(prediction.chord, key, 1);
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
            <Grid columns={2}>
                <Grid.Column>
                    <ChordPredictionComponent predictions={predictedChords} />
                </Grid.Column>
                <Grid.Column>
                    <List>{cSoundMessages.map((message: string, key) =>
                        <List.Item key={key}>{message}</List.Item>)
                    }</List>
                </Grid.Column>
            </Grid>
            <Divider />
            <div ref={modelSummaryRef} />
        </React.Fragment>
    );
};
