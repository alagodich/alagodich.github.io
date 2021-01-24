import '@tensorflow/tfjs-node-gpu';
import {
    convertToTensor,
    convertEmbeddingXsTensorToChord,
    convertEmbeddingYsTensorToPredictionObject,
    IEmbeddingPrediction
} from '../tensor';
import * as TensorFlow from '@tensorflow/tfjs';

describe('embedding harmony tensors', () => {
    describe('convertToTensor', () => {
        it('should return 3 layers of inputs and labels', async done => {
            const embedding = convertToTensor([
                {x: [0, 0, 0], y: [6, 2, 14]},
                {x: [6, 2, 14], y: [0, 0, 0]}
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
    describe('convertEmbeddingXsTensorToChord', () => {
        it('converts first chord from xs tensor set to chord object', async done => {
            expect(await convertEmbeddingXsTensorToChord([
                TensorFlow.tensor2d([[6]]),
                TensorFlow.tensor2d([[2]]),
                TensorFlow.tensor2d([[14]])
            ])).toEqual({chord: {numeric: 7, shift: '#', quality: 'sus'}, digits: [6, 2, 14]});

            expect(await convertEmbeddingXsTensorToChord([
                TensorFlow.tensor2d([[5]]),
                TensorFlow.tensor2d([[1]]),
                TensorFlow.tensor2d([[8]])
            ])).toEqual({chord: {numeric: 6, shift: 'b', quality: '7b5'}, digits: [5, 1, 8]});

            done();
        });
        it('ignores second column in dataset, parses only first one', async done => {
            const xs = [
                TensorFlow.tensor2d([[0], [6]]),
                TensorFlow.tensor2d([[0], [2]]),
                TensorFlow.tensor2d([[0], [14]])
            ];
            const chord = await convertEmbeddingXsTensorToChord(xs);

            expect(chord).toEqual({chord: {numeric: 1}, digits: [0, 0, 0]});

            done();
        });
    });
    describe('convertEmbeddingYsTensorToPredictionObject', () => {
        it('converts first dataset from tensor to chord prediction object', async done => {
            const ys = [
                TensorFlow.tensor2d([[
                    0.07711145281791687,
                    0.39232388138771057,
                    0.11740219593048096,
                    0.04675796627998352,
                    0.2543841302394867,
                    0.07530555129051208,
                    0.0367148295044899
                ]]),
                TensorFlow.tensor2d([[
                    0.7408273816108704,
                    0.20782801508903503,
                    0.0513446182012558
                ]]),
                TensorFlow.tensor2d([[
                    0.014369848184287548,
                    0.019141366705298424,
                    6.435893645219858e-18,
                    0.41926509141921997,
                    0.0000360929589078296,
                    0.13488100469112396,
                    0.04205382987856865,
                    1.6609678982094264e-26,
                    0.0016522046644240618,
                    0.00018233600712846965,
                    0.25994980335235596,
                    0.008425507694482803,
                    0.03720998018980026,
                    0.028748955577611923,
                    0.03408394753932953
                ]])
            ];
            const prediction: IEmbeddingPrediction = await convertEmbeddingYsTensorToPredictionObject(ys);

            expect(prediction).toEqual({
                numeric: [
                    {label: '2', probability: 0.39, index: 1},
                    {label: '5', probability: 0.25, index: 4},
                    {label: '3', probability: 0.12, index: 2},
                    {label: '1', probability: 0.08, index: 0},
                    {label: '6', probability: 0.08, index: 5},
                    {label: '4', probability: 0.05, index: 3},
                    {label: '7', probability: 0.04, index: 6}
                ],
                shift: [
                    {label: '_', probability: 0.74, index: 0},
                    {label: 'b', probability: 0.21, index: 1},
                    {label: '#', probability: 0.05, index: 2}
                ],
                quality: [
                    {label: '-7', probability: 0.42, index: 3},
                    {label: '^', probability: 0.26, index: 10},
                    {label: '7', probability: 0.13, index: 5},
                    {label: '7alt', probability: 0.04, index: 6},
                    {label: 'h', probability: 0.04, index: 12},
                    {label: 'o', probability: 0.03, index: 13},
                    {label: 'sus', probability: 0.03, index: 14},
                    {label: '+', probability: 0.02, index: 1},
                    {label: '', probability: 0.01, index: 0},
                    {label: '^7#11', probability: 0.01, index: 11},
                    {label: '-#5', probability: 0, index: 2},
                    {label: '-^7', probability: 0, index: 4},
                    {label: '7b13sus', probability: 0, index: 7},
                    {label: '7b5', probability: 0, index: 8},
                    {label: '7b9sus', probability: 0, index: 9}
                ]
            });

            done();
        });
        it('ignores second column in dataset, parses only first one', async done => {
            const ys = [
                TensorFlow.tensor2d([
                    [0, 0, 0, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 0, 0]
                ]),
                TensorFlow.tensor2d([
                    [0, 0, 1],
                    [1, 0, 0]
                ]),
                TensorFlow.tensor2d([
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ])
            ];
            const prediction: IEmbeddingPrediction = await convertEmbeddingYsTensorToPredictionObject(ys);

            expect(prediction).toEqual({
                numeric: [
                    {label: '7', probability: 1, index: 6},
                    {label: '1', probability: 0, index: 0},
                    {label: '2', probability: 0, index: 1},
                    {label: '3', probability: 0, index: 2},
                    {label: '4', probability: 0, index: 3},
                    {label: '5', probability: 0, index: 4},
                    {label: '6', probability: 0, index: 5}
                ],
                shift: [
                    {label: '#', probability: 1, index: 2},
                    {label: '_', probability: 0, index: 0},
                    {label: 'b', probability: 0, index: 1}
                ],
                quality: [
                    {label: 'sus', probability: 1, index: 14},
                    {label: '', probability: 0, index: 0},
                    {label: '+', probability: 0, index: 1},
                    {label: '-#5', probability: 0, index: 2},
                    {label: '-7', probability: 0, index: 3},
                    {label: '-^7', probability: 0, index: 4},
                    {label: '7', probability: 0, index: 5},
                    {label: '7alt', probability: 0, index: 6},
                    {label: '7b13sus', probability: 0, index: 7},
                    {label: '7b5', probability: 0, index: 8},
                    {label: '7b9sus', probability: 0, index: 9},
                    {label: '^', probability: 0, index: 10},
                    {label: '^7#11', probability: 0, index: 11},
                    {label: 'h', probability: 0, index: 12},
                    {label: 'o', probability: 0, index: 13}
                ]
            });

            done();
        });
    });
});
