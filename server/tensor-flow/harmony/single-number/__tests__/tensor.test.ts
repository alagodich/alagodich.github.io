import '@tensorflow/tfjs-node-gpu';
import * as TensorFlow from '@tensorflow/tfjs';
import {convertToTensor, maxChord} from '../tensor';

describe('chord as single number harmony tensors', () => {
    describe('convertToTensor', () => {
        it('should generate tensor container with normalized values', async done => {
            const tensor = convertToTensor([
                {x: [1, 0, 10], y: [3, 1, 12]},
                {x: [3, 1, 12], y: [6, 1, 10]},
                {x: [6, 1, 10], y: [4, 1, 10]},
                {x: [4, 1, 10], y: [6, 1, 12]},
                {x: [6, 1, 12], y: [2, 1, 10]},
                {x: [1, 0, 10], y: [3, 1, 12]},
                {x: [3, 1, 12], y: [6, 1, 10]},
                {x: [6, 1, 10], y: [7, 0, 12]},
                {x: [7, 0, 12], y: [3, 0, 10]},
                {x: [3, 0, 10], y: [5, 0, 12]}
            ]);
            const shuffledFrom = await tensor.xs.array() as number[];
            const shuffledTo = await tensor.ys.array() as number[];

            expect(shuffledFrom.sort()).toEqual([
                [0.7640954852104187],
                [0.8766095638275146],
                [0.7638455033302307],
                [0.38904863595962524],
                [0.1262657791376114],
                [0.5138142108917236],
                [0.38904863595962524],
                [0.3762970268726349],
                [0.1262657791376114],
                [0.7638455033302307]
            ].sort());
            expect(shuffledTo.sort()).toEqual([
                [0.3762970268726349],
                [0.38904863595962524],
                [0.7638455033302307],
                [0.8766095638275146],
                [0.7638455033302307],
                [0.6265783309936523],
                [0.38904863595962524],
                [0.26378297805786133],
                [0.5138142108917236],
                [0.7640954852104187]
            ].sort());

            const unNormalizedFromFloat = tensor.xs.mul(maxChord);
            const unNormalizedFromInt = TensorFlow.cast(unNormalizedFromFloat, 'int32');
            const unNormalizedFromArray = await unNormalizedFromInt.array() as number[];

            const unNormalizedToFloat = tensor.ys.mul(maxChord);
            const unNormalizedToInt = TensorFlow.cast(unNormalizedToFloat, 'int32');
            const unNormalizedToArray = await unNormalizedToInt.array() as number[];

            expect(unNormalizedFromArray.sort()).toEqual([
                [3112], [1009],
                [6110], [1009],
                [4110], [7012],
                [6112], [6110],
                [3112], [3010]
            ].sort());

            expect(unNormalizedToArray.sort()).toEqual([
                [5012], [3010],
                [7012], [2110],
                [6110], [3112],
                [6110], [6112],
                [4110], [3112]
            ].sort());

            done();
        });
    });
});
