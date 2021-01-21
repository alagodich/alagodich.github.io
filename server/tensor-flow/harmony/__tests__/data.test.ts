import {
    prepareData,
    flattenData,
    convertChordToDigit,
    convertDigitToChord
} from '../data';
import {varDump} from '../../../utils';

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
            {x: 1010, y: 3112},
            {x: 3112, y: 6110},
            {x: 6110, y: 7012},
            {x: 7012, y: 3010},
            {x: 3010, y: 5012}
        ]);
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
