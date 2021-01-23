import * as TensorFlow from '@tensorflow/tfjs-node';
import {
    convertToSingleNumberTensor,
    convertToClassificationTensor,
    createOneHotLabelTensor,
    convertToEmbeddingTensor
} from '../tensor';
import {maxChord, maxFeatureDepth} from '../data';

describe('harmony tensors', () => {
    describe('convertToTensor', () => {
        it('should generate tensor container with normalized values', async done => {
            const tensor = convertToSingleNumberTensor([
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
            ], maxChord);
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
    describe('convertToClassificationTensor', () => {
        it('should make a tensor of numeric only chord values', async () => {
            const tensor = convertToClassificationTensor([
                {x: [1], y: [3]},
                {x: [4], y: [1]},
                {x: [6], y: [5]}
            ], 7);

            const shuffledFrom = await tensor.xs.array() as number[];
            const shuffledTo = await tensor.ys.array() as number[];
            const fromUnNormalized = await tensor.xs.mul(7).array() as number[];

            expect(fromUnNormalized).toEqual([
                [1], [4], [6]
            ]);
            expect(shuffledTo).toEqual([
                [
                    0, 0, 1, 0, 0, 0, 0,
                    0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                ],
                [
                    1, 0, 0, 0, 0, 0, 0,
                    0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                ],
                [
                    0, 0, 0, 0, 1, 0, 0,
                    0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                ]
            ]);
            expect(shuffledFrom).toEqual([
                [0.1428571492433548],
                [0.5714285969734192],
                [0.8571428656578064]
            ]);
        });
        it('should make a tensor of chords with all features', async () => {
            const tensor = convertToClassificationTensor([
                {x: [1, 0, 0], y: [3, 1, 3]},
                {x: [5, 2, 8], y: [7, 2, 14]},
                {x: [7, 2, 14], y: [1, 0, 0]}
            ], maxFeatureDepth);

            const shuffledFrom = await tensor.xs.array() as number[];
            const shuffledTo = await tensor.ys.array() as number[];
            const fromUnNormalized = await tensor.xs.mul(maxFeatureDepth).array() as number[];

            expect(fromUnNormalized).toEqual([
                [1, 0, 0],
                [5, 2, 8],
                [7, 2, 14]
            ]);

            expect(shuffledTo).toEqual([
                [
                    0, 0, 1, 0, 0, 0, 0,
                    0, 1, 0,
                    0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                ],
                [
                    0, 0, 0, 0, 0, 0, 1,
                    0, 0, 1,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
                ],
                [
                    1, 0, 0, 0, 0, 0, 0,
                    1, 0, 0,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                ]
            ]);
            expect(shuffledFrom).toEqual([
                [0.0714285746216774, 0, 0],
                [0.3571428656578064, 0.1428571492433548, 0.5714285969734192],
                [0.5, 0.1428571492433548, 1]
            ]);
        });
    });
    describe('convertToEmbeddingTensor', () => {
        it('should return 3 layers of inputs and labels', async done => {
            const embedding = convertToEmbeddingTensor([
                {x: [1, 0, 0], y: [7, 2, 14]},
                {x: [7, 2, 14], y: [1, 0, 0]}
            ]);

            expect(embedding.xs.length).toBe(3);
            expect(embedding.ys.length).toBe(3);

            expect(await embedding.xs[0].array()).toEqual([[0], [6]]);
            expect(await embedding.xs[1].array()).toEqual([[0], [2]]);
            expect(await embedding.xs[2].array()).toEqual([[0], [14]]);

            expect(await embedding.ys[0].array()).toEqual([
                [0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0]
            ]);
            expect(await embedding.ys[1].array()).toEqual([
                [0, 0, 1],
                [1, 0, 0]
            ]);
            expect(await embedding.ys[2].array()).toEqual([
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]);

            done();
        });
    });
    describe('createOneHotLabelTensor', () => {
        it('should create oneHot tensor for a list of 2d labels(chords)', async done => {
            const oneHot = createOneHotLabelTensor([[1, 0, 0], [5, 1, 5], [7, 2, 14]]);
            const oneHotArray = await oneHot.array();

            expect(oneHotArray.sort()).toEqual([
                [
                    1, 0, 0, 0, 0, 0, 0,
                    1, 0, 0,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                ],
                [
                    0, 0, 0, 0, 1, 0, 0,
                    0, 1, 0,
                    0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0
                ],
                [
                    0, 0, 0, 0, 0, 0, 1,
                    0, 0, 1,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
                ]
            ].sort());

            done();
        });
    });
});
