import {
    prepareData,
    flattenData,
    convertChordToDigit,
    convertDigitToChord,
    convertChordToDigitWithBinaryQuality,
    convertDigitWithBinaryQualityToChord,
    getChordsEnum
} from '../data';
import fs from 'fs';
import path from 'path';

describe('prepareData', () => {
    it('should correctly flatten song segments', () => {
        const preparedData = prepareData();

        expect(preparedData.length).toBe(3840);
        expect(preparedData[0]).toEqual([
            {quality: '^7', degree: 1},
            {shift: 'b', quality: '7', degree: 3},
            {shift: 'b', quality: '^7', degree: 6},
            {quality: '7', degree: 7},
            {quality: '^7', degree: 3},
            {quality: '7', degree: 5},
            {quality: '-7', degree: 5},
            {quality: '7', degree: 1},
            {shift: 'b', quality: '^7', degree: 4},
            {shift: 'b', quality: '7', degree: 6},
            {shift: 'b', quality: '^7', degree: 2},
            {quality: '7', degree: 3},
            {quality: '-7', degree: 6},
            {quality: '7', degree: 2},
            {quality: '-7', degree: 2},
            {quality: '7', degree: 5}
        ]);
        expect(preparedData[1]).toEqual([
            {quality: '^7', degree: 1},
            {shift: 'b', quality: '7', degree: 3},
            {shift: 'b', quality: '^7', degree: 6},
            {quality: '7', degree: 7},
            {quality: '^7', degree: 3},
            {quality: '7', degree: 5},
            {quality: '-7', degree: 5},
            {quality: '7', degree: 1},
            {shift: 'b', quality: '^7', degree: 4},
            {shift: 'b', quality: '7', degree: 3},
            {shift: 'b', quality: '^7', degree: 6},
            {quality: '7', degree: 7},
            {quality: '^7', degree: 3},
            {quality: '7', degree: 5},
            {quality: '^7', degree: 1}
        ]);
    });
});
describe('flattenData', () => {
    it('should correctly transform data to a list of number pairs', () => {
        expect(flattenData([
            [
                {degree: 1, quality: '^'},
                {degree: 3, shift: 'b', quality: '-69'},
                {degree: 6, shift: 'b', quality: '7b5'},
                {degree: 4, shift: '#'},
                {degree: 6, quality: ''},
                {degree: 2, shift: 'b', quality: '7b9sus'}
            ],
            [
                {degree: 1, quality: '7b9#9'},
                {degree: 3, shift: 'b', quality: '-^9'}
            ]
        ])).toEqual([
            {x: [0, 0, 10], y: [2, 1, 3]},
            {x: [2, 1, 3], y: [5, 1, 8]},
            {x: [5, 1, 8], y: [3, 2, 0]},
            {x: [3, 2, 0], y: [5, 0, 0]},
            {x: [5, 0, 0], y: [1, 1, 9]},
            {x: [1, 1, 9], y: [0, 0, 10]},

            {x: [0, 0, 6], y: [2, 1, 4]},
            {x: [2, 1, 4], y: [0, 0, 6]}
        ]);
    });
    xit('should export flatten data', done => {
        fs.writeFile(
            path.join(__dirname, '../../../../all-jazz-flatten-harmony.json'),
            JSON.stringify(flattenData(prepareData())),
            'utf8',
            () => done()
        );
    });
});
describe('chord to digit conversion', () => {
    describe('convertChordToDigit', () => {
        it('should transform valid chord with 2 digits quality index', () => {
            expect(convertChordToDigit({degree: 6, shift: 'b', quality: '^'}))
                .toEqual([5, 1, 10]);
            expect(convertChordToDigit({degree: 3, shift: 'b', quality: '-69'}))
                .toEqual([2, 1, 3]);
            expect(convertChordToDigit({degree: 1, shift: '#', quality: '7#9#5'}))
                .toEqual([0, 2, 6]);
            expect(convertChordToDigit({degree: 4, quality: '7b9sus'}))
                .toEqual([3, 0, 9]);
            expect(convertChordToDigit({degree: 5, shift: '', quality: '7b5'}))
                .toEqual([4, 0, 8]);
            expect(convertChordToDigit({degree: 7, shift: '#', quality: '13sus'}))
                .toEqual([6, 2, 14]);
            expect(convertChordToDigit({degree: 2, shift: ''}))
                .toEqual([1, 0, 0]);
            expect(convertChordToDigit({degree: 1, quality: '7'}))
                .toEqual([0, 0, 5]);
            expect(convertChordToDigit({degree: 5}))
                .toEqual([4, 0, 0]);
        });
    });
    describe('convertDigitToChord', () => {
        it('should transform chords back to object form', () => {
            expect(convertDigitToChord([6, 1, 10]))
                .toEqual({degree: 7, shift: 'b', quality: '^'});
            expect(convertDigitToChord([3, 1, 3]))
                .toEqual({degree: 4, shift: 'b', quality: '-7'});
            expect(convertDigitToChord([1, 2, 6]))
                .toEqual({degree: 2, shift: '#', quality: '7alt'});
            expect(convertDigitToChord([4, 0, 9]))
                .toEqual({degree: 5, quality: '7b9sus'});
            expect(convertDigitToChord([0, 0, 8]))
                .toEqual({degree: 1, quality: '7b5'});
            expect(convertDigitToChord([6, 2, 14]))
                .toEqual({degree: 7, shift: '#', quality: 'sus'});
            expect(convertDigitToChord([2, 0, 0]))
                .toEqual({degree: 3});
            expect(convertDigitToChord([6, 0, 5]))
                .toEqual({degree: 7, quality: '7'});
            expect(convertDigitToChord([5, 0, 0]))
                .toEqual({degree: 6});
        });
    });
    describe('convertChordToDigitWithBinaryQuality', () => {
        it('should transform valid chord with 2 binary quality', () => {
            expect(convertChordToDigitWithBinaryQuality({degree: 7, shift: 'b', quality: '^'}))
                .toEqual([6, 1, [
                    1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                ]]);
            expect(convertChordToDigitWithBinaryQuality({degree: 1, shift: '#', quality: '-69'}))
                .toEqual([0, 2, [
                    1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0,
                    0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0
                ]]);
            expect(convertChordToDigitWithBinaryQuality({degree: 2, shift: ''}))
                .toEqual([1, 0, [
                    1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                ]]);
            expect(convertChordToDigitWithBinaryQuality({degree: 1, quality: '7'}))
                .toEqual([0, 0, [
                    1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                ]]);
            expect(convertChordToDigitWithBinaryQuality({degree: 5}))
                .toEqual([4, 0, [
                    1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                ]]);
        });
    });
    describe('convertDigitWithBinaryQualityToChord', () => {
        it('should transform chords back to object form', () => {
            expect(convertDigitWithBinaryQualityToChord([6, 1, [
                1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ]])).toEqual({degree: 7, shift: 'b', quality: '^'});
            expect(convertDigitWithBinaryQualityToChord([0, 2, [
                1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0,
                0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ]])).toEqual({degree: 1, shift: '#', quality: '-69'});
            expect(convertDigitWithBinaryQualityToChord([1, 0, [
                1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ]])).toEqual({degree: 2, quality: '2'});
            expect(convertDigitWithBinaryQualityToChord([0, 0, [
                1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ]])).toEqual({degree: 1, quality: '7'});
            expect(convertDigitWithBinaryQualityToChord([4, 0, [
                1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ]])).toEqual({degree: 5, quality: '2'});
        });
    });
});
describe('getChordsEnum', () => {
    it('should make enum out of a data sample', () => {
        expect(getChordsEnum([
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
        ])).toEqual([
            1010, 3112, 6110,
            4110, 6112, 2110,
            7012, 3010, 5012
        ]);
    });
    it('should make enum out of all data', () => {
        const data = prepareData();
        const flatData = flattenData(data);

        expect(getChordsEnum(flatData).length).toBe(228);
    });
});
