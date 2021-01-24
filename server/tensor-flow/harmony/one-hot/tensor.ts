import * as TensorFlow from '@tensorflow/tfjs';
import {IFlatHarmonyData} from '../data';

export interface ITensorContainerObject {
    xs: TensorFlow.Tensor<TensorFlow.Rank>;
    ys: TensorFlow.Tensor<TensorFlow.Rank>;
}

export const oneHotTensorLabelLength = 25;
// The biggest feature is a chord quality
export const maxFeatureDepth = 14;

/**
 * Xs tensor is a 2d tensor with [length, features.length] shape
 * Where features can be 1 to 3: [7], [7, 2], [7, 2, 14]
 *
 * Ys Tensor is a 25 OneHot
 * @see createOneHotLabelTensor
 *
 * @param flatData
 */
export function convertToTensor(flatData: IFlatHarmonyData[]): ITensorContainerObject {
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
                        offset = 7;
                        break;
                    }
                    case 2: {
                        offset = 10;
                        break;
                    }
                    default: {
                        throw new Error(`Unrecognized feature type ${featureType}`);
                    }
                }
                chordOneHot.set([1], feature + offset);

                return chordOneHot;
            });
            return chordOneHot;
        });

        return TensorFlow.tensor2d(oneHots, [oneHots.length, oneHotTensorLabelLength]);
    });

}
