import * as TensorFlow from '@tensorflow/tfjs';
import {IFlatHarmonyData} from '../data';

export interface ITensorContainerObject {
    xs: TensorFlow.Tensor<TensorFlow.Rank>;
    ys: TensorFlow.Tensor<TensorFlow.Rank>;
}

export const maxChord = 7999;
export const minChord = 1000;

/**
 * This seems not going to work
 * Chord represented as a 4 digits number
 * It converts chords like [ 4, 1, 5 ] to number 415,
 * in some cases chords cannot be converted back
 *
 * @param flatData
 */
export function convertToTensor(flatData: IFlatHarmonyData[]): ITensorContainerObject {
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
