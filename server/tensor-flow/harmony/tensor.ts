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
        const froms = flatData.map(item => item.x);
        const tos = flatData.map(item => item.y);

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

export function convertToClassificationTensor(flatData: IFlatHarmonyData[], maxChord: number): any {
    return TensorFlow.tidy(() => {
        TensorFlow.util.shuffle(flatData);

        const froms = flatData.map(item => item.x);
        // Subtract 1 to convert numeric chord to index in one hot array
        const tos = flatData.map(item => item.y - 1);

        if (froms.length !== tos.length) {
            throw new Error('input label length not matching');
        }

        const fromTensor = TensorFlow.tensor2d(froms, [froms.length, 1]);
        const from = fromTensor.div(maxChord);
        // const batchTosArray = new Uint8Array(tos.length * maxChord);
        //
        // tos.forEach((value, index) => {
        //     batchTosArray.set([1], value + index * maxChord - 1);
        // });

        const to = TensorFlow.oneHot(TensorFlow.tensor1d(tos, 'int32'), maxChord);

        return {from, to};
    });
}
