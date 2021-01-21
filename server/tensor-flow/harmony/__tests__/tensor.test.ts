import * as TensorFlow from '@tensorflow/tfjs';
import {convertToTensor} from '../tensor';
import {maxChord} from '../data';
// import {varDump} from '../../../utils';

describe('convertToTensor', () => {
    it('should generate tensor container with normalized values', async () => {
        const tensor = convertToTensor([
            {x: 1010, y: 3112},
            {x: 3112, y: 6110},
            {x: 6110, y: 4110},
            {x: 4110, y: 6112},
            {x: 6112, y: 2110},
            {x: 1010, y: 3112},
            {x: 3112, y: 6110},
            {x: 6110, y: 7012},
            {x: 7012, y: 3010},
            {x: 3010, y: 5012}
        ]);
        const shuffledFrom = await tensor.from.array() as number[];
        const shuffledTo = await tensor.to.array() as number[];

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

        const unNormalizedFromFloat = tensor.from.mul(maxChord);
        const unNormalizedFromInt = TensorFlow.cast(unNormalizedFromFloat, 'int32');
        const unNormalizedFromArray = await unNormalizedFromInt.array() as number[];

        const unNormalizedToFloat = tensor.to.mul(maxChord);
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
    });
});
