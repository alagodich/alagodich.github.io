import {IPredictedStep} from './TensorFlowHarmonyComponent';
import {List} from 'semantic-ui-react';
import React, {ReactElement} from 'react';
import {IChordFeatureProbability} from '../../../server/tensor-flow/harmony/embedding/tensor';

interface IChordPredictionProps {
    predictions: IPredictedStep[];
}

export const ChordPredictionComponent = React.memo((props: IChordPredictionProps): ReactElement => {

    function renderProbabilities(list: IChordFeatureProbability[], itemsNum: number) {
        return (
            <List.Description>
                {
                    list
                        .slice(0, itemsNum)
                        .map(({label, probability}, key) => (
                            <React.Fragment key={key}>
                                <strong>{label}</strong>
                                <span>{`: ${probability} |`}</span>
                            </React.Fragment>
                        ))
                }
            </List.Description>
        );
    }

    return (
        <List divided>{props.predictions.map((step: IPredictedStep, key: number) =>
            <List.Item key={key}>
                <List.Header>{`${step.chordString} -> `}</List.Header>
                <List.List>
                    {renderProbabilities(step.probabilities.numeric, 3)}
                    {renderProbabilities(step.probabilities.shift, 3)}
                    {renderProbabilities(step.probabilities.quality, 5)}
                </List.List>
            </List.Item>)
        }</List>
    );
});
