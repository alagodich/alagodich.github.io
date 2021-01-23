import * as TensorFlow from '@tensorflow/tfjs';
import {IFlatHarmonyData} from './data';

export interface ITensorContainerObject {
    xs: TensorFlow.Tensor<TensorFlow.Rank>;
    ys: TensorFlow.Tensor<TensorFlow.Rank>;
}

export interface IEmbeddingTensorContainerObject {
    xs: Array<TensorFlow.Tensor<TensorFlow.Rank>>;
    ys: Array<TensorFlow.Tensor<TensorFlow.Rank>>;
}

export const oneHotTensorLabelLength = 25;

/**
 * @deprecated this seems not going to work
 * Chord represented as a 4 digits number
 *
 * @param flatData
 * @param maxChord
 */
export function convertToSingleNumberTensor(flatData: IFlatHarmonyData[], maxChord: number): ITensorContainerObject {
    return TensorFlow.tidy(() => {
        TensorFlow.util.shuffle(flatData);
        const xs = flatData.map(item => parseInt(item.x.map(value => value.toString()).join(''), 10));
        const ys = flatData.map(item => parseInt(item.y.map(value => value.toString()).join(''), 10));

        const xsTensor = TensorFlow.tensor2d(xs, [xs.length, 1]);
        const ysTensor = TensorFlow.tensor2d(ys, [ys.length, 1]);

        const normalizedXs = xsTensor.div(maxChord);
        const normalizedYs = ysTensor.div(maxChord);

        return {
            xs: normalizedXs,
            ys: normalizedYs
        };
    });
}

/**
 * Xs tensor is a 2d tensor with [length, features.length] shape
 * Where features can be 1 to 3: [7], [7, 2], [7, 2, 14]
 *
 * Ys Tensor is a 25 OneHot
 * @see createOneHotLabelTensor
 *
 * @param flatData
 * @param maxFeatureDepth
 */
export function convertToClassificationTensor(
    flatData: IFlatHarmonyData[],
    maxFeatureDepth: number
): ITensorContainerObject {
    return TensorFlow.tidy(() => {
        const xsData = flatData.map(item => item.x);
        const ysData = flatData.map(item => item.y);

        const xsTensor = TensorFlow.tensor2d(xsData, [xsData.length, xsData[0].length]);
        const xs = xsTensor.div(maxFeatureDepth);
        const ys = createOneHotLabelTensor(ysData);

        return {xs, ys};
    });
}

/**
 * Each label is a 25 depth OneHot tensor
 * Which is a sum of (0-6) numeric + (0 - 2) shift + (0 - 14) quality
 * [7, 2, 14] chord will be transformed to:
 *
 * 0, 0, 0, 0, 0, 0, 1
 * 0, 0, 1,
 * 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
 *
 * @param chords
 */
export function createOneHotLabelTensor(chords: number[][]): TensorFlow.Tensor2D {
    return TensorFlow.tidy(() => {
        const oneHots = chords.map(chord => {
            const chordOneHot = new Uint8Array(oneHotTensorLabelLength);

            chord.forEach((feature: number, featureType) => {
                let offset = 0;

                switch (featureType) {
                    case 0: {
                        break;
                    }
                    case 1: {
                        // offset is 1 higher than required, it compensates for -1 later
                        offset = 8;
                        break;
                    }
                    case 2: {
                        offset = 11;
                        break;
                    }
                    default: {
                        throw new Error(`Unrecognized feature type ${featureType}`);
                    }
                }
                chordOneHot.set([1], feature - 1 + offset);
                return chordOneHot;
            });
            return chordOneHot;
        });

        return TensorFlow.tensor2d(oneHots, [oneHots.length, oneHotTensorLabelLength]);
    });

}

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
export function convertToEmbeddingTensor(flatData: IFlatHarmonyData[]): IEmbeddingTensorContainerObject {
    const xsData = flatData.map(item => item.x);
    const numericXs: number[][] = [];
    const shiftXs: number[][] = [];
    const qualityXs: number[][] = [];

    xsData.forEach((chord: number[]) => {
        // Numeric value decreased by one
        numericXs.push([chord[0] - 1]);
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

                    chordOneHot.set([1], chordFeature - 1);
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
