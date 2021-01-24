import * as TensorFlow from '@tensorflow/tfjs';
import {IFlatHarmonyData, convertDigitToChord, rectifiedQualityList} from '../data';
import {IIRealProChord} from '../../../../client/components/real-book/types';

export interface IEmbeddingTensorContainerObject {
    xs: Array<TensorFlow.Tensor<TensorFlow.Rank>>;
    ys: Array<TensorFlow.Tensor<TensorFlow.Rank>>;
}

export interface IEmbeddingPrediction {
    numeric: IChordFeatureProbability[];
    shift: IChordFeatureProbability[];
    quality: IChordFeatureProbability[];
}

export interface IChordFeatureProbability {
    label: string;
    probability: number;
    index: number;
}

export const oneHotTensorLabelLength = 25;

/**
 * Inputs and Labels both divided into 3 2d tensors by feature
 *
 * For example [7, 2, 14]
 * Input:
 * [[7]]
 * [[2]]
 * [[14]]
 *
 * Output:
 * [0, 0, 0, 0, 0, 0, 1]
 * [0, 0, 1]
 * [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
 *
 * @param flatData
 */
export function convertToTensor(flatData: IFlatHarmonyData[]): IEmbeddingTensorContainerObject {
    const xsData = flatData.map(item => item.x);
    const numericXs: number[][] = [];
    const shiftXs: number[][] = [];
    const qualityXs: number[][] = [];

    xsData.forEach((chord: number[]) => {
        numericXs.push([chord[0]]);
        shiftXs.push([chord[1]]);
        qualityXs.push([chord[2]]);
    });
    const xs = [
        TensorFlow.tensor2d(numericXs),
        TensorFlow.tensor2d(shiftXs),
        TensorFlow.tensor2d(qualityXs)
    ];

    const ysData = flatData.map(item => item.y);
    const numericYs: Uint8Array[] = [];
    const shiftYs: Uint8Array[] = [];
    const qualityYs: Uint8Array[] = [];

    ysData.forEach((chord: number[]) => {
        chord.forEach((chordFeature: number, index) => {
            switch (index) {
                case 0: {
                    const chordOneHot = new Uint8Array(7);

                    chordOneHot.set([1], chordFeature);
                    numericYs.push(chordOneHot);
                    break;
                }
                case 1: {
                    const chordOneHot = new Uint8Array(3);

                    chordOneHot.set([1], chordFeature);
                    shiftYs.push(chordOneHot);
                    break;
                }
                case 2: {
                    const chordOneHot = new Uint8Array(15);

                    chordOneHot.set([1], chordFeature);
                    qualityYs.push(chordOneHot);
                    break;
                }
                default: {
                    throw new Error(`Unexpected chord index ${JSON.stringify(chord)}`);
                }
            }
        });
    });

    const ys = [
        TensorFlow.tensor2d(numericYs),
        TensorFlow.tensor2d(shiftYs),
        TensorFlow.tensor2d(qualityYs)
    ];

    return {xs, ys};
}

export function convertEmbeddingXsTensorToChord(
    tensorSet: Array<TensorFlow.Tensor<TensorFlow.Rank>>
): Promise<{chord: IIRealProChord; digits: number[]}> {
    return new Promise(resolve => {
        Promise.all(tensorSet.map(tensor => tensor.array() as Promise<number[][]>))
            .then(dataSet => resolve({
                chord: convertDigitToChord(dataSet.map(feature => feature[0][0])),
                digits: dataSet.map(feature => feature[0][0])
            }));
    });
}

export function convertEmbeddingYsTensorToPredictionObject(
    tensorSet: Array<TensorFlow.Tensor<TensorFlow.Rank>>
): Promise<IEmbeddingPrediction> {
    const formatPrecisionValue = (probabilityValue: number) =>
        parseFloat((probabilityValue).toFixed(2));
    const desc = (a: IChordFeatureProbability, b: IChordFeatureProbability) => {
        if (a.probability > b.probability) {
            return -1;
        } else if (b.probability < a.probability) {
            return 1;
        }
        return 0;
    };

    return new Promise(resolve => {
        Promise.all(tensorSet.map(tensor => tensor.array() as Promise<number[][]>))
            .then(predictionData => {
                const numeric: IChordFeatureProbability[] = [];
                const shift: IChordFeatureProbability[] = [];
                const quality: IChordFeatureProbability[] = [];

                predictionData[0][0].forEach((probability: number, index) => {
                    numeric.push({
                        label: (index + 1).toString(),
                        probability: formatPrecisionValue(probability),
                        index
                    });
                });
                predictionData[1][0].forEach((probability: number, index) => {
                    let shiftLabel: string;

                    switch (index) {
                        case 0: {
                            shiftLabel = '_';
                            break;
                        }
                        case 1: {
                            shiftLabel = 'b';
                            break;
                        }
                        case 2: {
                            shiftLabel = '#';
                            break;
                        }
                        default: {
                            throw new Error('Unexpected shift label');
                        }
                    }
                    shift.push({
                        label: shiftLabel,
                        probability: formatPrecisionValue(probability),
                        index
                    });
                });
                predictionData[2][0].forEach((probability: number, index) => {
                    if (index > 0) {
                        const qualityValue = rectifiedQualityList[index - 1];

                        quality.push({
                            label: qualityValue,
                            probability: formatPrecisionValue(probability),
                            index
                        });
                    } else {
                        quality.push({
                            label: '',
                            probability: formatPrecisionValue(probability),
                            index
                        });
                    }
                });

                return resolve({
                    numeric: numeric.sort(desc),
                    shift: shift.sort(desc),
                    quality: quality.sort(desc)
                });
            });
    });
}
