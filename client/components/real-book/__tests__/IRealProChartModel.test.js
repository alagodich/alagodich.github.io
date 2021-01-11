/* eslint max-len: 0 */

import IRealProChartModel from '../IRealProChartModel';

describe('IRealProChartModel', () => {
    it('should init with empty props', () => {
        const model = new IRealProChartModel();

        expect(model.title).toBeUndefined();
    });
    it('should init with valid Afternoon In Paris props with A A B A form and 2 endings', () => {
        const props = {
            title: 'Afternoon In Paris',
            author: 'Lewis John',
            style: 'Medium Swing',
            key: 'C',
            chordString: '*A{T44C^7 |C-7 F7|Bb^7 |Bb-7 Eb7|Ab^7 |D-7 G7#9|N1C^7 |D-7 G7 } |N2C^7 |x ]*B[D-7 |G7 |C^7/E |A7 |Y|D-7 |G7 |C^7(C#-7) (F#7)|D-7 G7 ]*A[C^7 |C-7 F7|Bb^7 |Bb-7 Eb7|Ab^7 |D-7 G7#9|C^7 |D-7 G7 Z'
        };
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Afternoon In Paris');
        expect(model.author).toBe('Lewis John');
        expect(model.style).toBe('Medium Swing');
        expect(model.key).toBe('C');
        expect(model.chordString.length).toBe(191);
        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {timeSignature: '4 / 4', openingLine: '{', chords: 'C^7'},
                    {openingLine: '|', chords: 'C-7 F7'},
                    {openingLine: '|', chords: 'Bb^7'},
                    {openingLine: '|', chords: 'Bb-7 Eb7'},
                    {openingLine: '|', chords: 'Ab^7'},
                    {openingLine: '|', chords: 'D-7 G7#9'},
                    {ending: 'N1', openingLine: '|', chords: 'C^7'},
                    {openingLine: '|', chords: 'D-7 G7', closingLine: '}'},
                    {ending: 'N2', openingLine: '|', chords: 'C^7'},
                    {openingLine: '|', chords: 'x', closingLine: ']'}
                ]
            },
            {
                name: 'B',
                data: [
                    {openingLine: '[', chords: 'D-7'},
                    {openingLine: '|', chords: 'G7'},
                    {openingLine: '|', chords: 'C^7/E'},
                    {openingLine: '|', chords: 'A7', closingLine: '|'},
                    {divider: 'Y'},
                    {openingLine: '|', chords: 'D-7'},
                    {openingLine: '|', chords: 'G7'},
                    {openingLine: '|', chords: 'C^7(C#-7) (F#7)'},
                    {openingLine: '|', chords: 'D-7 G7', closingLine: ']'}
                ]
            }, {
                name: 'A',
                data: [
                    {openingLine: '[', chords: 'C^7'},
                    {openingLine: '|', chords: 'C-7 F7'},
                    {openingLine: '|', chords: 'Bb^7'},
                    {openingLine: '|', chords: 'Bb-7 Eb7'},
                    {openingLine: '|', chords: 'Ab^7'},
                    {openingLine: '|', chords: 'D-7 G7#9'},
                    {openingLine: '|', chords: 'C^7'},
                    {openingLine: '|', chords: 'D-7 G7', closingLine: 'Z'}
                ]
            }
        ]);
    });
    it('should load 500 Miles High with no segments or endings', () => {
        const props = {
            title: '500 Miles High',
            author: 'Corea Chick',
            style: 'Bossa Nova',
            key: 'E-',
            chordString: '[T44E-7 |x |G-7 |x |Bb^7 |x |Bh7 |E7#9 |A-7 |x |F#h7 |x |F-7 |x Q|C-7 |x |B7#9 |x Z Y{QC-7 |x |Ab^7 |x }'
        };
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('500 Miles High');
        expect(model.author).toBe('Corea Chick');
        expect(model.style).toBe('Bossa Nova');
        expect(model.key).toBe('E-');
        expect(model.chordString.length).toBe(104);

        expect(model.segments).toEqual([
            {
                name: '',
                data: [
                    {timeSignature: '4 / 4', openingLine: '[', chords: 'E-7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'G-7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'Bb^7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'Bh7'},
                    {openingLine: '|', chords: 'E7#9'},
                    {openingLine: '|', chords: 'A-7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'F#h7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'F-7'},
                    {coda: true, openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'C-7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'B7#9'},
                    {openingLine: '|', chords: 'x', closingLine: 'Z'},
                    {divider: 'Y'},
                    {coda: true, openingLine: '{', chords: 'C-7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'Ab^7'},
                    {openingLine: '|', chords: 'x', closingLine: '}'}
                ]
            }
        ]);
    });
    it('should handle string with segment name inside and outside the bar lines', () => {
        const propsWithSegmentsInsideBars = {
            title: 'A Night In Tunisia',
            chordString: '{*AT44Eb7 |D- |Eb7 |D- |Eb7 |D- |Eh7 A7b9|D- }[*BAh7 |D7b9 |G-7 |x |Gh7 |C7b9 |F^7 |Eh7 A7b9 ][*AEb7 |D- |Eb7 |D- |Eb7 |D- |Eh7 A7b9|D- Q ZY[QEh7 |x |Eb7#11 |x |D-7 |x |G7#11 |x |G-^7 |G-7 |Gb7#9 |x |F^7 |x |Eh7 |A7b9 Z'
        };
        const modelProps = [
            {
                name: 'A',
                data: [
                    {timeSignature: '4 / 4', openingLine: '{', chords: 'Eb7'},
                    {openingLine: '|', chords: 'D-'},
                    {openingLine: '|', chords: 'Eb7'},
                    {openingLine: '|', chords: 'D-'},
                    {openingLine: '|', chords: 'Eb7'},
                    {openingLine: '|', chords: 'D-'},
                    {openingLine: '|', chords: 'Eh7 A7b9'},
                    {openingLine: '|', chords: 'D-', closingLine: '}'}
                ]
            },
            {
                name: 'B',
                data: [
                    {openingLine: '[', chords: 'Ah7'},
                    {openingLine: '|', chords: 'D7b9'},
                    {openingLine: '|', chords: 'G-7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'Gh7'},
                    {openingLine: '|', chords: 'C7b9'},
                    {openingLine: '|', chords: 'F^7'},
                    {openingLine: '|', chords: 'Eh7 A7b9', closingLine: ']'}
                ]
            },
            {
                name: 'A',
                data: [
                    {openingLine: '[', chords: 'Eb7'},
                    {openingLine: '|', chords: 'D-'},
                    {openingLine: '|', chords: 'Eb7'},
                    {openingLine: '|', chords: 'D-'},
                    {openingLine: '|', chords: 'Eb7'},
                    {openingLine: '|', chords: 'D-'},
                    {openingLine: '|', chords: 'Eh7 A7b9'},
                    {coda: true, openingLine: '|', chords: 'D-', closingLine: 'Z'},

                    {divider: 'Y'},

                    {coda: true, openingLine: '[', chords: 'Eh7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'Eb7#11'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'D-7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'G7#11'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'G-^7'},
                    {openingLine: '|', chords: 'G-7'},
                    {openingLine: '|', chords: 'Gb7#9'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'F^7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'Eh7'},
                    {openingLine: '|', chords: 'A7b9', closingLine: 'Z'}
                ]
            }
        ];

        const insideModel = new IRealProChartModel(propsWithSegmentsInsideBars);

        expect(insideModel.chordString.length).toBe(219);
        expect(insideModel.segments).toEqual(modelProps);

        const propsWithSegmentsOutsideBars = {
            chordString: '*A{T44Eb7 |D- |Eb7 |D- |Eb7 |D- |Eh7 A7b9|D- }*B[Ah7 |D7b9 |G-7 |x |Gh7 |C7b9 |F^7 |Eh7 A7b9 ]*A[Eb7 |D- |Eb7 |D- |Eb7 |D- |Eh7 A7b9|D- Q ZY[QEh7 |x |Eb7#11 |x |D-7 |x |G7#11 |x |G-^7 |G-7 |Gb7#9 |x |F^7 |x |Eh7 |A7b9 Z'
        };
        const outsideModel = new IRealProChartModel(propsWithSegmentsOutsideBars);

        expect(outsideModel.chordString.length).toBe(219);
        expect(outsideModel.segments).toEqual(modelProps);
    });

    describe('parseBar', () => {
        it.skip('should handle simple bar with Alternate Chords', () => {
            // const barString = '|C^7(C#-7) (F#7)';

        });
    });
});
