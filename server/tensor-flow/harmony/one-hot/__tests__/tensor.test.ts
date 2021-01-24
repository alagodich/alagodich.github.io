import '@tensorflow/tfjs-node-gpu';
import {
    convertToTensor,
    createOneHotLabelTensor,
    maxFeatureDepth
} from '../tensor';

describe('one-hot harmony tensors', () => {
    describe('convertToTensor', () => {
        it('should make a tensor of chords with all features', async () => {
            const tensor = convertToTensor([
                {x: [0, 0, 0], y: [2, 1, 3]},
                {x: [4, 2, 8], y: [6, 2, 14]},
                {x: [6, 2, 14], y: [0, 0, 0]}
            ]);

            const shuffledFrom = await tensor.xs.array() as number[];
            const shuffledTo = await tensor.ys.array() as number[];
            const fromUnNormalized = await tensor.xs.mul(maxFeatureDepth).array() as number[];

            expect(fromUnNormalized).toEqual([
                [0, 0, 0],
                [4, 2, 8],
                [6, 2, 14]
            ]);

            expect(shuffledFrom).toEqual([
                [0, 0, 0],
                [0.2857142984867096, 0.1428571492433548, 0.5714285969734192],
                [0.4285714328289032, 0.1428571492433548, 1]
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
        });
    });
    describe('createOneHotLabelTensor', () => {
        it('should create oneHot tensor for a list of 2d labels(chords)', async done => {
            const oneHot = createOneHotLabelTensor([[0, 0, 0], [4, 1, 5], [6, 2, 14]]);
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
