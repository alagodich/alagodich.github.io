import * as TensorFlow from '@tensorflow/tfjs';
import {IFlatHarmonyData} from './data';

export interface ITensorContainerObject {
    from: TensorFlow.Tensor<TensorFlow.Rank>;
    to: TensorFlow.Tensor<TensorFlow.Rank>;
}

/**
 * @deprecated this seems not going to work
 *
 * @param flatData
 * @param maxChord
 */
export function convertToTensor(flatData: IFlatHarmonyData[], maxChord: number): ITensorContainerObject {
    return TensorFlow.tidy(() => {
        TensorFlow.util.shuffle(flatData);
        const froms = flatData.map(item => parseInt(item.x.map(value => value.toString()).join(''), 10));
        const tos = flatData.map(item => parseInt(item.y.map(value => value.toString()).join(''), 10));

        const fromTensor = TensorFlow.tensor2d(froms, [froms.length, 1]);
        const toTensor = TensorFlow.tensor2d(tos, [tos.length, 1]);

        const normalizedFroms = fromTensor.div(maxChord);
        const normalizedTos = toTensor.div(maxChord);

        return {
            from: normalizedFroms,
            to: normalizedTos
        };
    });
}

/**
 * From tensor is a 2d tensor with [length, features.length] shape
 * Where features can be 1 to 3 [7], [7, 2], [7, 2, 14]
 *
 * To Tensor is a 23 OneHot
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
        TensorFlow.util.shuffle(flatData);

        const froms = flatData.map(item => item.x);
        // Subtract 1 to convert numeric chord to index in one hot array
        const tos = flatData.map(item => item.y);

        if (froms.length !== tos.length) {
            throw new Error('input label length not matching');
        }

        const fromTensor = TensorFlow.tensor2d(froms, [froms.length, froms[0].length]);
        const from = fromTensor.div(maxFeatureDepth);

        const to = createOneHotLabelTensor(tos);

        return {from, to};
    });
}

/**
 * Each labels is a 23 depth OneHot tensor
 * Which is a sum of (1-7) numeric + (0 - 2) shift + (0 - 14) quality
 * [7, 2, 14] chord will be transformed to:
 *
 * 0, 0, 0, 0, 0, 0, 1,
 * 0, 1,
 * 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
 *
 * @param chords
 */
export function createOneHotLabelTensor(chords: number[][]): TensorFlow.Tensor2D {
    return TensorFlow.tidy(() => {

        const oneHots = chords.map(chord => {
            const chordOneHot = new Uint8Array(23);

            chord.forEach((feature: number, featureType) => {
                let offset = 0;

                switch (featureType) {
                    case 0: {
                        if (feature < 1) {
                            throw new Error('Numeric feature cannot be 0');
                        }
                        break;
                    }
                    case 1: {
                        offset = 7;
                        break;
                    }
                    case 2: {
                        offset = 9;
                        break;
                    }
                    default: {
                        throw new Error(`Unrecognized feature type ${featureType}`);
                    }
                }

                if (feature > 0) {
                    chordOneHot.set([1], feature - 1 + offset);
                }

                return chordOneHot;
            });

            return chordOneHot;
        });

        return TensorFlow.tensor2d(oneHots, [oneHots.length, 23]);
    });

}
