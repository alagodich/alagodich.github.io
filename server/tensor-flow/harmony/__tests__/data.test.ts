import {
    prepareData,
    flattenData,
    convertChordToDigit,
    convertDigitToChord,
    getChordsEnum
} from '../data';
// import {varDump} from '../../../utils';

describe('prepareData', () => {
    it('should correctly flatten song segments', () => {
        const preparedData = prepareData();

        expect(preparedData.length).toBe(3658);
        expect(preparedData[0]).toEqual([
            {quality: '^7', numeric: 1},
            {shift: 'b', quality: '7', numeric: 3},
            {shift: 'b', quality: '^7', numeric: 6},
            {quality: '7', numeric: 7},
            {quality: '^7', numeric: 3},
            {quality: '7', numeric: 5},
            {quality: '-7', numeric: 5},
            {quality: '7', numeric: 1},
            {shift: 'b', quality: '^7', numeric: 4},
            {shift: 'b', quality: '7', numeric: 6},
            {shift: 'b', quality: '^7', numeric: 2},
            {quality: '7', numeric: 3},
            {quality: '-7', numeric: 6},
            {quality: '7', numeric: 2},
            {quality: '-7', numeric: 2},
            {quality: '7', numeric: 5}
        ]);
        expect(preparedData[1]).toEqual([
            {quality: '^7', numeric: 1},
            {shift: 'b', quality: '7', numeric: 3},
            {shift: 'b', quality: '^7', numeric: 6},
            {quality: '7', numeric: 7},
            {quality: '^7', numeric: 3},
            {quality: '7', numeric: 5},
            {quality: '-7', numeric: 5},
            {quality: '7', numeric: 1},
            {shift: 'b', quality: '^7', numeric: 4},
            {shift: 'b', quality: '7', numeric: 3},
            {shift: 'b', quality: '^7', numeric: 6},
            {quality: '7', numeric: 7},
            {quality: '^7', numeric: 3},
            {quality: '7', numeric: 5},
            {quality: '^7', numeric: 1}
        ]);
    });
});
describe('flattenData', () => {
    it('should correctly transform data to a list of number pairs', () => {
        expect(flattenData([
            [
                {quality: '^7', numeric: 1},
                {shift: 'b', quality: '7', numeric: 3},
                {shift: 'b', quality: '^7', numeric: 6},
                {shift: 'b', quality: '^7', numeric: 4},
                {shift: 'b', quality: '7', numeric: 6},
                {shift: 'b', quality: '^7', numeric: 2}
            ],
            [
                {quality: '^7', numeric: 1},
                {shift: 'b', quality: '7', numeric: 3},
                {shift: 'b', quality: '^7', numeric: 6},
                {quality: '7', numeric: 7},
                {quality: '^7', numeric: 3},
                {quality: '7', numeric: 5}
            ]
        ])).toEqual([
            {x: 1010, y: 3112},
            {x: 3112, y: 6110},
            {x: 6110, y: 4110},
            {x: 4110, y: 6112},
            {x: 6112, y: 2110},
            {x: 2110, y: 1010},

            {x: 1010, y: 3112},
            {x: 3112, y: 6110},
            {x: 6110, y: 7012},
            {x: 7012, y: 3010},
            {x: 3010, y: 5012},
            {x: 5012, y: 1010}
        ]);
    });
    it('can pick only numeric roots from chord', () => {
        expect(flattenData([
            [
                {quality: '^7', numeric: 1},
                {shift: 'b', quality: '7', numeric: 3},
                {shift: 'b', quality: '^7', numeric: 6},
                {shift: 'b', quality: '^7', numeric: 4},
                {shift: 'b', quality: '7', numeric: 6},
                {shift: 'b', quality: '^7', numeric: 2}
            ],
            [
                {quality: '^7', numeric: 1},
                {shift: 'b', quality: '7', numeric: 3},
                {shift: 'b', quality: '^7', numeric: 6},
                {quality: '7', numeric: 7},
                {quality: '^7', numeric: 3},
                {quality: '7', numeric: 5}
            ]
        ], ['numeric'])).toEqual([
            {x: 1, y: 3},
            {x: 3, y: 6},
            {x: 6, y: 4},
            {x: 4, y: 6},
            {x: 6, y: 2},
            {x: 2, y: 1},

            {x: 1, y: 3},
            {x: 3, y: 6},
            {x: 6, y: 7},
            {x: 7, y: 3},
            {x: 3, y: 5},
            {x: 5, y: 1}
        ]);
    });
    it('can pick numeric roots and shift from chord', () => {
        expect(flattenData([
            [
                {quality: '^7', numeric: 1},
                {shift: 'b', quality: '7', numeric: 3},
                {shift: 'b', quality: '^7', numeric: 6},
                {shift: 'b', quality: '^7', numeric: 4},
                {shift: 'b', quality: '7', numeric: 6},
                {shift: 'b', quality: '^7', numeric: 2}
            ],
            [
                {quality: '^7', numeric: 1},
                {shift: 'b', quality: '7', numeric: 3},
                {shift: 'b', quality: '^7', numeric: 6},
                {quality: '7', numeric: 7},
                {quality: '^7', numeric: 3},
                {quality: '7', numeric: 5}
            ]
        ], ['numeric', 'shift'])).toEqual([
            {x: 10, y: 31},
            {x: 31, y: 61},
            {x: 61, y: 41},
            {x: 41, y: 61},
            {x: 61, y: 21},
            {x: 21, y: 10},

            {x: 10, y: 31},
            {x: 31, y: 61},
            {x: 61, y: 70},
            {x: 70, y: 30},
            {x: 30, y: 50},
            {x: 50, y: 10}
        ]);
    });
});
describe('getChordsEnum', () => {
    it('should make enum out of a data sample', () => {
        expect(getChordsEnum([
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
        ])).toEqual([
            1010, 3112, 6110,
            4110, 6112, 2110,
            7012, 3010, 5012
        ]);
    });
    it('should make enum out of all data', () => {
        const data = prepareData();
        const flatData = flattenData(data);

        expect(getChordsEnum(flatData).length).toBe(693);
    });
});
describe('chord to digit conversion', () => {
    describe('convertChordToDigit', () => {
        it('should transform valid chord with 2 digits quality index', () => {
            expect(convertChordToDigit({shift: 'b', quality: '^7', numeric: 6}))
                .toBe(6110);
            expect(convertChordToDigit({shift: 'b', quality: '5', numeric: 3}))
                .toBe(3101);
            expect(convertChordToDigit({shift: '#', quality: '7susadd3', numeric: 1}))
                .toBe(1257);
            expect(convertChordToDigit({shift: '', quality: '6#9', numeric: 5}))
                .toBe(5063);
            expect(convertChordToDigit({shift: '', numeric: 2}))
                .toBe(2000);
            expect(convertChordToDigit({quality: '7', numeric: 7}))
                .toBe(7012);
            expect(convertChordToDigit({numeric: 5}))
                .toBe(5000);
        });
    });
    describe('convertDigitToChord', () => {
        it('should transform chords back to object form', () => {
            expect(convertDigitToChord(6110))
                .toEqual({shift: 'b', quality: '^7', numeric: 6});
            expect(convertDigitToChord(3101))
                .toEqual({shift: 'b', quality: '5', numeric: 3});
            expect(convertDigitToChord(1257))
                .toEqual({shift: '#', quality: '7susadd3', numeric: 1});
            expect(convertDigitToChord(5063))
                .toEqual({quality: '6#9', numeric: 5});
            expect(convertDigitToChord(2000))
                .toEqual({numeric: 2});
            expect(convertDigitToChord(7012))
                .toEqual({quality: '7', numeric: 7});
            expect(convertDigitToChord(5000))
                .toEqual({numeric: 5});
        });
    });
});
