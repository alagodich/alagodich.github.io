import * as TensorFlow from '@tensorflow/tfjs';
import {IFlatHarmonyData} from './data';
import {maxChord} from './data';

export interface ITensorContainerObject {
    from: TensorFlow.Tensor<TensorFlow.Rank>;
    to: TensorFlow.Tensor<TensorFlow.Rank>;
}

export function convertToTensor(flatData: IFlatHarmonyData[]): ITensorContainerObject {
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
