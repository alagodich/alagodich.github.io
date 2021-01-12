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
    it('should handle 2 bars repeats (r) like in The African Queen', () => {
        const props = {
            title: 'The African Queen',
            chordString: '[*AT44C-9 Db9|x |r C-9 Db9|x |r|][*AC-9 Db9|x |r C-9 Db9|x |r|][*BBb7 A7|Ab7 G7|C-9 Db9|x |C-9 Db9|x Z'
        };
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('The African Queen');
        expect(model.chordString.length).toBe(102);

        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {timeSignature: '4 / 4', openingLine: '[', chords: 'C-9 Db9'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'C-9 Db9'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'C-9 Db9'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'C-9 Db9'},
                    {openingLine: '|', chords: 'x', closingLine: ']'}
                ]
            },
            {
                name: 'A',
                data: [
                    {openingLine: '[', chords: 'C-9 Db9'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'C-9 Db9'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'C-9 Db9'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'C-9 Db9'},
                    {openingLine: '|', chords: 'x', closingLine: ']'}
                ]
            },
            {
                name: 'B',
                data: [
                    {openingLine: '[', chords: 'Bb7 A7'},
                    {openingLine: '|', chords: 'Ab7 G7'},
                    {openingLine: '|', chords: 'C-9 Db9'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'C-9 Db9'},
                    {openingLine: '|', chords: 'x', closingLine: 'Z'}
                ]
            }
        ]);
    });
    it('should handle unclosed section like in Ahmid-6', () => {
        const props = {
            title: 'Ahmid-6',
            chordString: '[*AT44D-7 |C#-7 |r|F#-7 B7|E-7 A7|G F|E- D-7|C^7 |B7 |Bb^7#11 |Ah7 D7b9|F#h7 B7b9|Eh7 A7b9|D-7 E-7|F-7 Bb7|Eb9sus|x|Ab^9|x|Ab7sus|x|Db^13|x|Dh7 G7b9|C-7 F7|F-7 Bb7|Gh7 C7#9|F-7 F#-7|G-7 C-7|T34 F#-7 B7 |E-7 A7sus|T24A7sus|T44 A7sus |x [*BD-7 |C#-7 |D-7 |C#-7 |F#-7 B7|E-7 A7|A-7 |\\ \\ D7|G^7 Bb7|Eb^7 B7|E^7 G7|C^7 Ab7|Db^7 E7|A^7 C7|F^7|x|E-7|x|F^7|x|E-7|x Z'
        };

        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Ahmid-6');
        expect(model.chordString.length).toBe(358);

        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {timeSignature: '4 / 4', openingLine: '[', chords: 'D-7'},
                    {openingLine: '|', chords: 'C#-7'},
                    {openingLine: '|', chords: 'D-7'},
                    {openingLine: '|', chords: 'C#-7', closingLine: '|'},
                    {openingLine: '|', chords: 'F#-7 B7'},
                    {openingLine: '|', chords: 'E-7 A7'},
                    {openingLine: '|', chords: 'G F'},
                    {openingLine: '|', chords: 'E- D-7'},
                    {openingLine: '|', chords: 'C^7'},
                    {openingLine: '|', chords: 'B7'},
                    {openingLine: '|', chords: 'Bb^7#11'},
                    {openingLine: '|', chords: 'Ah7 D7b9'},
                    {openingLine: '|', chords: 'F#h7 B7b9'},
                    {openingLine: '|', chords: 'Eh7 A7b9'},
                    {openingLine: '|', chords: 'D-7 E-7'},
                    {openingLine: '|', chords: 'F-7 Bb7'},
                    {openingLine: '|', chords: 'Eb9sus'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'Ab^9'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'Ab7sus'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'Db^13'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'Dh7 G7b9'},
                    {openingLine: '|', chords: 'C-7 F7'},
                    {openingLine: '|', chords: 'F-7 Bb7'},
                    {openingLine: '|', chords: 'Gh7 C7#9'},
                    {openingLine: '|', chords: 'F-7 F#-7'},
                    {openingLine: '|', chords: 'G-7 C-7'},
                    {timeSignature: '3 / 4', openingLine: '|', chords: 'F#-7 B7'},
                    {openingLine: '|', chords: 'E-7 A7sus'},
                    {timeSignature: '2 / 4', openingLine: '|', chords: 'A7sus'},
                    {timeSignature: '4 / 4', openingLine: '|', chords: 'A7sus'},
                    {openingLine: '|', chords: 'x', closingLine: ']'}
                ]
            },
            {
                name: 'B',
                data: [
                    {openingLine: '[', chords: 'D-7'},
                    {openingLine: '|', chords: 'C#-7'},
                    {openingLine: '|', chords: 'D-7'},
                    {openingLine: '|', chords: 'C#-7'},
                    {openingLine: '|', chords: 'F#-7 B7'},
                    {openingLine: '|', chords: 'E-7 A7'},
                    {openingLine: '|', chords: 'A-7'},
                    {openingLine: '|', chords: '\\ \\ D7'},
                    {openingLine: '|', chords: 'G^7 Bb7'},
                    {openingLine: '|', chords: 'Eb^7 B7'},
                    {openingLine: '|', chords: 'E^7 G7'},
                    {openingLine: '|', chords: 'C^7 Ab7'},
                    {openingLine: '|', chords: 'Db^7 E7'},
                    {openingLine: '|', chords: 'A^7 C7'},
                    {openingLine: '|', chords: 'F^7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'E-7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'F^7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'E-7'},
                    {openingLine: '|', chords: 'x', closingLine: 'Z'}
                ]
            }
        ]);
    });
    it('should handle Airmail Special with Segno symbol (s) and 4 double repeats', () => {
        const props = {
            title: 'Airmail Special',
            chordString: '[*iT44C6 |x |r|r|r|][Co7 |x |r|Co7 Bo7|Bbo7 |Ab7 |G7 ] {*ASC C/E|F G|C C/E|F G|C C7|F F#o7|C/G |C  }[*BCo7 |x |r|Co7 Bo7|Bbo7 |Ab7 |G7 Z'
        };

        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Airmail Special');
        expect(model.chordString.length).toBe(136);

        expect(model.segments).toEqual([
            {
                name: 'i',
                data: [
                    {timeSignature: '4 / 4', openingLine: '[', chords: 'C6'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'C6'},
                    {openingLine: '|', chords: 'x', closingLine: '|'},
                    {openingLine: '|', chords: 'C6'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'C6'},
                    {openingLine: '|', chords: 'x', closingLine: ']'},
                    {openingLine: '[', chords: 'Co7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'Co7'},
                    {openingLine: '|', chords: 'x', closingLine: '|'},
                    {openingLine: '|', chords: 'Co7 Bo7'},
                    {openingLine: '|', chords: 'Bbo7'},
                    {openingLine: '|', chords: 'Ab7'},
                    {openingLine: '|', chords: 'G7', closingLine: ']'}
                ]
            },
            {
                name: 'A',
                data: [
                    {openingLine: '{', chords: 'C C/E', segno: true},
                    {openingLine: '|', chords: 'F G'},
                    {openingLine: '|', chords: 'C C/E'},
                    {openingLine: '|', chords: 'F G'},
                    {openingLine: '|', chords: 'C C7'},
                    {openingLine: '|', chords: 'F F#o7'},
                    {openingLine: '|', chords: 'C/G'},
                    {openingLine: '|', chords: 'C', closingLine: '}'}
                ]
            },
            {
                name: 'B',
                data: [
                    {openingLine: '[', chords: 'Co7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'Co7'},
                    {openingLine: '|', chords: 'x', closingLine: '|'},
                    {openingLine: '|', chords: 'Co7 Bo7'},
                    {openingLine: '|', chords: 'Bbo7'},
                    {openingLine: '|', chords: 'Ab7'},
                    {openingLine: '|', chords: 'G7', closingLine: 'Z'}
                ]
            }
        ]);
    });
    it('should handle Alone Together with two endings on one line', () => {
        const props = {
            title: 'Alone Together',
            chordString: '*A{T44D-6 |Eh7 A7b9|D-6 |Eh7 A7b9|D-6 |Ah7 D7b9|G-7 |x |B-7 E7|G-7 C7|F^7 |Eh7 A7b9|N1D^7 |(Eh7) x (A7b9) }N2 D^7 |x ]*B[Ah7 |D7b9 |G-6 |x |Gh7 |C7b9 |F^7 |Eh7 A7b9 ]*A[D-6 |Eh7 A7b9|D-6 |Eh7 A7b9|D-6 Bh7|Bb7 A7b9|D-6 |Eh7 A7b9 Z'
        };

        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Alone Together');
        expect(model.chordString.length).toBe(229);

        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {timeSignature: '4 / 4', openingLine: '{', chords: 'D-6'},
                    {openingLine: '|', chords: 'Eh7 A7b9'},
                    {openingLine: '|', chords: 'D-6'},
                    {openingLine: '|', chords: 'Eh7 A7b9'},
                    {openingLine: '|', chords: 'D-6'},
                    {openingLine: '|', chords: 'Ah7 D7b9'},
                    {openingLine: '|', chords: 'G-7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'B-7 E7'},
                    {openingLine: '|', chords: 'G-7 C7'},
                    {openingLine: '|', chords: 'F^7'},
                    {openingLine: '|', chords: 'Eh7 A7b9'},
                    {ending: 'N1', openingLine: '|', chords: 'D^7'},
                    {openingLine: '|', chords: '(Eh7) x (A7b9)', closingLine: '}'},
                    {ending: 'N2', openingLine: '|', chords: 'D^7'},
                    {openingLine: '|', chords: 'x', closingLine: ']'}
                ]
            },
            {
                name: 'B',
                data: [
                    {openingLine: '[', chords: 'Ah7'},
                    {openingLine: '|', chords: 'D7b9'},
                    {openingLine: '|', chords: 'G-6'},
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
                    {openingLine: '[', chords: 'D-6'},
                    {openingLine: '|', chords: 'Eh7 A7b9'},
                    {openingLine: '|', chords: 'D-6'},
                    {openingLine: '|', chords: 'Eh7 A7b9'},
                    {openingLine: '|', chords: 'D-6 Bh7'},
                    {openingLine: '|', chords: 'Bb7 A7b9'},
                    {openingLine: '|', chords: 'D-6'},
                    {openingLine: '|', chords: 'Eh7 A7b9', closingLine: 'Z'}
                ]
            }
        ]);
    });
    it('should handle Anna Maria with 2 bar repeat at the end of segment', () => {
        const props = {
            title: 'Anna Maria',
            chordString: '*A[T44G^7 |Eb^7/G |G7sus |Eb^7/G |Db^7/F |Gb^7#11 |Ab-7 |Bb/Ab |G-7 |C7sus |D/C |C7sus |Ab/C Bb/C|Ab/C {G7b9sus |Eb^7/G }*B[G^7 |G7sus |Eb/F E7alt|Eb7sus |D^7 F7#5|Bb-7 |Ab-7 |Bb/Ab |G-7 |C7sus |Bb^7 A-7|F-7 |Bb7sus|x|Db7sus|x *C[B-7|x|Eb-7|x|D^7 F7#5|Bb-7 |Ab-7|Bb/Ab|G-7|C7sus|Bb^7 A-7|F-7 E-7 {G7b9sus |Eb^7/G }'
        };
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Anna Maria');
        expect(model.chordString.length).toBe(314);

        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {timeSignature: '4 / 4', openingLine: '[', chords: 'G^7'},
                    {openingLine: '|', chords: 'Eb^7/G'},
                    {openingLine: '|', chords: 'G7sus'},
                    {openingLine: '|', chords: 'Eb^7/G'},
                    {openingLine: '|', chords: 'Db^7/F'},
                    {openingLine: '|', chords: 'Gb^7#11'},
                    {openingLine: '|', chords: 'Ab-7'},
                    {openingLine: '|', chords: 'Bb/Ab'},
                    {openingLine: '|', chords: 'G-7'},
                    {openingLine: '|', chords: 'C7sus'},
                    {openingLine: '|', chords: 'D/C'},
                    {openingLine: '|', chords: 'C7sus'},
                    {openingLine: '|', chords: 'Ab/C Bb/C'},
                    {openingLine: '|', chords: 'Ab/C'},
                    {openingLine: '{', chords: 'G7b9sus'},
                    {openingLine: '|', chords: 'Eb^7/G', closingLine: '}'}
                ]
            },
            {
                name: 'B',
                data: [
                    {openingLine: '[', chords: 'G^7'},
                    {openingLine: '|', chords: 'G7sus'},
                    {openingLine: '|', chords: 'Eb/F E7alt'},
                    {openingLine: '|', chords: 'Eb7sus'},
                    {openingLine: '|', chords: 'D^7 F7#5'},
                    {openingLine: '|', chords: 'Bb-7'},
                    {openingLine: '|', chords: 'Ab-7'},
                    {openingLine: '|', chords: 'Bb/Ab'},
                    {openingLine: '|', chords: 'G-7'},
                    {openingLine: '|', chords: 'C7sus'},
                    {openingLine: '|', chords: 'Bb^7 A-7'},
                    {openingLine: '|', chords: 'F-7'},
                    {openingLine: '|', chords: 'Bb7sus'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'Db7sus'},
                    {openingLine: '|', chords: 'x', closingLine: ']'}
                ]
            },
            {
                name: 'C',
                data: [
                    {openingLine: '[', chords: 'B-7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'Eb-7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'D^7 F7#5'},
                    {openingLine: '|', chords: 'Bb-7'},
                    {openingLine: '|', chords: 'Ab-7'},
                    {openingLine: '|', chords: 'Bb/Ab'},
                    {openingLine: '|', chords: 'G-7'},
                    {openingLine: '|', chords: 'C7sus'},
                    {openingLine: '|', chords: 'Bb^7 A-7'},
                    {openingLine: '|', chords: 'F-7 E-7'},
                    {openingLine: '{', chords: 'G7b9sus'},
                    {openingLine: '|', chords: 'Eb^7/G', closingLine: '}'}
                ]
            }
        ]);
    });
    it('should handle Armando\'s Rhumba where segment name is inside and has a left whitespace', () => {
        const props = {
            title: 'Armando\'s Rhumba',
            chordString: 'T44[*A C-7 |D7b9 |G7b13 |C-7 |C-7 |D7b9 |G7b13 |C-7 ][ *B C7b9 |F-7 |D7b9/F# |G-7 |Abo7 |D7b9/A |Bb7sus |x |Bb7b9sus |x (E7#9)|Eb6 (E) (F) (F#)|G7b13 Z'
        };
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Armando\'s Rhumba');
        expect(model.chordString.length).toBe(151);

        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {openingLine: '[', chords: 'C-7'},
                    {openingLine: '|', chords: 'D7b9'},
                    {openingLine: '|', chords: 'G7b13'},
                    {openingLine: '|', chords: 'C-7'},
                    {openingLine: '|', chords: 'C-7'},
                    {openingLine: '|', chords: 'D7b9'},
                    {openingLine: '|', chords: 'G7b13'},
                    {openingLine: '|', chords: 'C-7', closingLine: ']'}
                ]
            },
            {
                name: 'B',
                data: [
                    {openingLine: '[', chords: 'C7b9'},
                    {openingLine: '|', chords: 'F-7'},
                    {openingLine: '|', chords: 'D7b9/F#'},
                    {openingLine: '|', chords: 'G-7'},
                    {openingLine: '|', chords: 'Abo7'},
                    {openingLine: '|', chords: 'D7b9/A'},
                    {openingLine: '|', chords: 'Bb7sus'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'Bb7b9sus'},
                    {openingLine: '|', chords: 'x (E7#9)'},
                    {openingLine: '|', chords: 'Eb6 (E) (F) (F#)'},
                    {openingLine: '|', chords: 'G7b13', closingLine: 'Z'}
                ]
            }
        ]);
    });
    it('should handle Alone Too Long with double pause (pp)', () => {
        const props = {
            title: 'Alone Too Long',
            chordString: '{*AT44G6 |\\ \\ G#o7|A-7 D7|x |A-7 |D7 |N1G6 E-7|A-7 D7 } |N2G6 |F#h7 B7b9 ][*BE- E-/D|E-/C# \\ C7 B7 |E-6 |x |E- E-/D|A7 |A-11 |D7 ][*AG6 |\\ \\ G#o7|A-7 D7|x |A-7 |D7 |G6 E-7|A-7 D7 Z'
        };
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Alone Too Long');
        expect(model.chordString.length).toBe(180);

        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {timeSignature: '4 / 4', openingLine: '{', chords: 'G6'},
                    {openingLine: '|', chords: '\\ \\ G#o7'},
                    {openingLine: '|', chords: 'A-7 D7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'A-7'},
                    {openingLine: '|', chords: 'D7'},
                    {ending: 'N1', openingLine: '|', chords: 'G6 E-7'},
                    {openingLine: '|', chords: 'A-7 D7', closingLine: '}'},
                    {ending: 'N2', openingLine: '|', chords: 'G6'},
                    {openingLine: '|', chords: 'F#h7 B7b9', closingLine: ']'}
                ]
            },
            {
                name: 'B',
                data: [
                    {openingLine: '[', chords: 'E- E-/D'},
                    {openingLine: '|', chords: 'E-/C# \\ C7 B7'},
                    {openingLine: '|', chords: 'E-6'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'E- E-/D'},
                    {openingLine: '|', chords: 'A7'},
                    {openingLine: '|', chords: 'A-11'},
                    {openingLine: '|', chords: 'D7', closingLine: ']'}
                ]
            },
            {
                name: 'A',
                data: [
                    {openingLine: '[', chords: 'G6'},
                    {openingLine: '|', chords: '\\ \\ G#o7'},
                    {openingLine: '|', chords: 'A-7 D7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'A-7'},
                    {openingLine: '|', chords: 'D7'},
                    {openingLine: '|', chords: 'G6 E-7'},
                    {openingLine: '|', chords: 'A-7 D7', closingLine: 'Z'}
                ]
            }
        ]);
    });
    it('should handle Crosscurrent', () => {
        const props = {
            title: 'Crosscurrent',
            author: 'Lennie Tristano',
            style: 'Up Tempo Swing',
            key: 'F',
            chordString: '[*AT44F^7 D7#5|G-7 C7|A-7 D7b9|G-7 C7|F^7 F7|Bb^7 Bo7|C7sus C7|F^7 C7#11 ][*BF^7 Ab7|G-7 C7|F6 D7b9|G-7 C7|F^7 F7|C7#11(Bb^7) (Bo7)|(C*7*) x (C7)|F^7#11 ][*CBb-7 |A^7#11 |Ab-7 |G^7#11 |Gb^7 |B7 D7|G-7 |C7#11 ][*AF^7 D7b9|G-7 C7|A-7 D7b9|G-7 C7|F^7 F7|C7#11(Bb^7) (Bo7)|(C7sus) x (C7)|F^7#11 C7#5 ]'
        };
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Crosscurrent');
        expect(model.chordString.length).toBe(297);


        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {timeSignature: '4 / 4', openingLine: '[', chords: 'F^7 D7#5'},
                    {openingLine: '|', chords: 'G-7 C7'},
                    {openingLine: '|', chords: 'A-7 D7b9'},
                    {openingLine: '|', chords: 'G-7 C7'},
                    {openingLine: '|', chords: 'F^7 F7'},
                    {openingLine: '|', chords: 'Bb^7 Bo7'},
                    {openingLine: '|', chords: 'C7sus C7'},
                    {openingLine: '|', chords: 'F^7 C7#11', closingLine: ']'}
                ]
            },
            {
                name: 'B',
                data: [
                    {openingLine: '[', chords: 'F^7 Ab7'},
                    {openingLine: '|', chords: 'G-7 C7'},
                    {openingLine: '|', chords: 'F6 D7b9'},
                    {openingLine: '|', chords: 'G-7 C7'},
                    {openingLine: '|', chords: 'F^7 F7'},
                    {openingLine: '|', chords: 'C7#11(Bb^7) (Bo7)'},
                    {openingLine: '|', chords: '(C', closingLine: ']'}
                ]
            },
            {
                name: 'C',
                data: [
                    {openingLine: '[', chords: 'Bb-7'},
                    {openingLine: '|', chords: 'A^7#11'},
                    {openingLine: '|', chords: 'Ab-7'},
                    {openingLine: '|', chords: 'G^7#11'},
                    {openingLine: '|', chords: 'Gb^7'},
                    {openingLine: '|', chords: 'B7 D7'},
                    {openingLine: '|', chords: 'G-7'},
                    {openingLine: '|', chords: 'C7#11', closingLine: ']'}
                ]
            },
            {
                name: 'A',
                data: [
                    {openingLine: '[', chords: 'F^7 D7b9'},
                    {openingLine: '|', chords: 'G-7 C7'},
                    {openingLine: '|', chords: 'A-7 D7b9'},
                    {openingLine: '|', chords: 'G-7 C7'},
                    {openingLine: '|', chords: 'F^7 F7'},
                    {openingLine: '|', chords: 'C7#11(Bb^7) (Bo7)'},
                    {openingLine: '|', chords: '(C7sus) x (C7)'},
                    {openingLine: '|', chords: 'F^7#11 C7#5', closingLine: ']'}
                ]
            }
        ]);
    });
    it('should handle Killer Joe', () => {
        const props = {
            title: 'Killer Joe',
            chordString: '{T44*AC9 |Bb9#11 |r|r|r|}[*BEh7 |A7b9 |Eb-7 |Ab7 |A7 |Ab7 |E-7 |A7 ][*AC9 |Bb9#11 |r|r|r|Z'
        };
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Killer Joe');
        expect(model.chordString.length).toBe(90);

        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {timeSignature: '4 / 4', openingLine: '{', chords: 'C9'},
                    {openingLine: '|', chords: 'Bb9#11'},
                    {openingLine: '|', chords: 'C9'},
                    {openingLine: '|', chords: 'Bb9#11', closingLine: '|'},
                    {openingLine: '|', chords: 'C9'},
                    {openingLine: '|', chords: 'Bb9#11'},
                    {openingLine: '|', chords: 'C9'},
                    {openingLine: '|', chords: 'Bb9#11', closingLine: '}'}
                ]
            },
            {
                name: 'B',
                data: [
                    {openingLine: '[', chords: 'Eh7'},
                    {openingLine: '|', chords: 'A7b9'},
                    {openingLine: '|', chords: 'Eb-7'},
                    {openingLine: '|', chords: 'Ab7'},
                    {openingLine: '|', chords: 'A7'},
                    {openingLine: '|', chords: 'Ab7'},
                    {openingLine: '|', chords: 'E-7'},
                    {openingLine: '|', chords: 'A7', closingLine: ']'}
                ]
            },
            {
                name: 'A',
                data: [
                    {openingLine: '[', chords: 'C9'},
                    {openingLine: '|', chords: 'Bb9#11'},
                    {openingLine: '|', chords: 'C9'},
                    {openingLine: '|', chords: 'Bb9#11', closingLine: '|'},
                    {openingLine: '|', chords: 'C9'},
                    {openingLine: '|', chords: 'Bb9#11'},
                    {openingLine: '|', chords: 'C9'},
                    {openingLine: '|', chords: 'Bb9#11', closingLine: 'Z'}
                ]
            }
        ]);
    });
    it('should handle Moanin\'', () => {
        const props = {
            title: 'Moanin\'',
            chordString: '{T44*An Bb|F n |r|r|r| }[*BBb-7 Ab9|G7b9 C7#9|F-7 |F7b9 B7|Bb-7 Ab9|G7b9 |Gh7 |C7b9 ]Y{S*AF-7 Ab7|G7 C7b9|r|r|r| }[*BBb-7 Ab9|G7b9 C7#9|F-7 |F7b9 B7|Bb-7 Ab9|G7b9 |Gh7 |C7b9 ]'
        };
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Moanin\'');
        expect(model.chordString.length).toBe(175);

        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {timeSignature: '4 / 4', openingLine: '{', chords: 'n Bb'},
                    {openingLine: '|', chords: 'F n'},
                    {openingLine: '|', chords: 'n Bb'},
                    {openingLine: '|', chords: 'F n', closingLine: '|'},
                    {openingLine: '|', chords: 'n Bb'},
                    {openingLine: '|', chords: 'F n'},
                    {openingLine: '|', chords: 'n Bb'},
                    {openingLine: '|', chords: 'F n', closingLine: '}'}
                ]
            },
            {
                name: 'B',
                data: [
                    {openingLine: '[', chords: 'Bb-7 Ab9'},
                    {openingLine: '|', chords: 'G7b9 C7#9'},
                    {openingLine: '|', chords: 'F-7'},
                    {openingLine: '|', chords: 'F7b9 B7'},
                    {openingLine: '|', chords: 'Bb-7 Ab9'},
                    {openingLine: '|', chords: 'G7b9'},
                    {openingLine: '|', chords: 'Gh7'},
                    {openingLine: '|', chords: 'C7b9', closingLine: ']'},
                    {divider: 'Y', closingLine: ']'}
                ]
            },
            {
                name: 'A',
                data: [
                    {segno: true, openingLine: '{', chords: 'F-7 Ab7'},
                    {openingLine: '|', chords: 'G7 C7b9'},
                    {segno: true, openingLine: '|', chords: 'F-7 Ab7'},
                    {openingLine: '|', chords: 'G7 C7b9', closingLine: '|'},
                    {segno: true, openingLine: '|', chords: 'F-7 Ab7'},
                    {openingLine: '|', chords: 'G7 C7b9'},
                    {segno: true, openingLine: '|', chords: 'F-7 Ab7'},
                    {openingLine: '|', chords: 'G7 C7b9', closingLine: '}'}
                ]
            },
            {
                name: 'B',
                data: [
                    {openingLine: '[', chords: 'Bb-7 Ab9'},
                    {openingLine: '|', chords: 'G7b9 C7#9'},
                    {openingLine: '|', chords: 'F-7'},
                    {openingLine: '|', chords: 'F7b9 B7'},
                    {openingLine: '|', chords: 'Bb-7 Ab9'},
                    {openingLine: '|', chords: 'G7b9'},
                    {openingLine: '|', chords: 'Gh7'},
                    {openingLine: '|', chords: 'C7b9', closingLine: ']'}
                ]
            }
        ]);
    });
    it('should handle Brazilian Suite', () => {
        const props = {
            title: 'Brazilian Suite',
            chordString: '{*iT44Ab-7 |Eb-7 |Ab-7 |Eb-7 }{*AAb-7 |Ab-7/Gb |E^7#11 |Eb-7 |Db-7 |Eb7b9 |D7b5 |Db7 |C^7#5 |B7 |Bb7b9 |Eb7#9 |Ab-7 |Eb7b9 ]Ab-7 |B7/F# |Fh7 |Bb7 |E-7 |A7 |D^7 |Eb-7 Ab7|Db^7 |Bb-7 |Eb-7 |Ab7 |Db^7 |Bb-7 |Eb^7#11 |Eb7 |Ab-7 |Ab-7/Gb |Eb^7#11 |Eb-7 |Db-7 |Eb7b9 ]{Ab-7|Eb-7|Ab-7|Eb-7 } Q|Db^7|Db^7 Z'
        };
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Brazilian Suite');
        expect(model.chordString.length).toBe(298);

        expect(model.segments).toEqual([
            {
                name: 'i',
                data: [
                    {timeSignature: '4 / 4', openingLine: '{', chords: 'Ab-7'},
                    {openingLine: '|', chords: 'Eb-7'},
                    {openingLine: '|', chords: 'Ab-7'},
                    {openingLine: '|', chords: 'Eb-7', closingLine: '}'}
                ]
            },
            {
                name: 'A',
                data: [
                    {openingLine: '{', chords: 'Ab-7'},
                    {openingLine: '|', chords: 'Ab-7/Gb'},
                    {openingLine: '|', chords: 'E^7#11'},
                    {openingLine: '|', chords: 'Eb-7'},
                    {openingLine: '|', chords: 'Db-7'},
                    {openingLine: '|', chords: 'Eb7b9'},
                    {openingLine: '|', chords: 'D7b5'},
                    {openingLine: '|', chords: 'Db7'},
                    {openingLine: '|', chords: 'C^7#5'},
                    {openingLine: '|', chords: 'B7'},
                    {openingLine: '|', chords: 'Bb7b9'},
                    {openingLine: '|', chords: 'Eb7#9'},
                    {openingLine: '|', chords: 'Ab-7'},
                    {openingLine: '|', chords: 'Eb7b9', closingLine: ']'},
                    {openingLine: '|', chords: 'Ab-7'},
                    {openingLine: '|', chords: 'B7/F#'},
                    {openingLine: '|', chords: 'Fh7'},
                    {openingLine: '|', chords: 'Bb7'},
                    {openingLine: '|', chords: 'E-7'},
                    {openingLine: '|', chords: 'A7'},
                    {openingLine: '|', chords: 'D^7'},
                    {openingLine: '|', chords: 'Eb-7 Ab7'},
                    {openingLine: '|', chords: 'Db^7'},
                    {openingLine: '|', chords: 'Bb-7'},
                    {openingLine: '|', chords: 'Eb-7'},
                    {openingLine: '|', chords: 'Ab7'},
                    {openingLine: '|', chords: 'Db^7'},
                    {openingLine: '|', chords: 'Bb-7'},
                    {openingLine: '|', chords: 'Eb^7#11'},
                    {openingLine: '|', chords: 'Eb7'},
                    {openingLine: '|', chords: 'Ab-7'},
                    {openingLine: '|', chords: 'Ab-7/Gb'},
                    {openingLine: '|', chords: 'Eb^7#11'},
                    {openingLine: '|', chords: 'Eb-7'},
                    {openingLine: '|', chords: 'Db-7'},
                    {openingLine: '|', chords: 'Eb7b9', closingLine: ']'},
                    {openingLine: '{', chords: 'Ab-7'},
                    {openingLine: '|', chords: 'Eb-7'},
                    {openingLine: '|', chords: 'Ab-7'},
                    {openingLine: '|', chords: 'Eb-7', closingLine: '}'},
                    {coda: true, chords: '', openingLine: '|'},
                    {openingLine: '|', chords: 'Db^7'},
                    {openingLine: '|', chords: 'Db^7', closingLine: 'Z'}
                ]
            }
        ]);
    });
    it('should handle Butterfly', () => {
        const props = {
            title: 'Butterfly',
            chordString: '{*iT44F-7 |\\ A-7 |F-7 |\\ A-7 }{S*AF-11 |\\ A-11 |F-11 |\\ D-11 }[*Bn Bb7|n |n |n A7#9#5 |Ab^7/Bb |Ab^7#5/Bb |Ab^7/Bb |Bb13 |Eb13sus |x |Eb7#9#5 |x |Ab13sus |\\ \\ W/C QC7/E |n F-7|\\ A-7 |{F-7 |\\ A-7  } Y{QF-11  |x |x |x }{Bb13 |x |x |x }fA^7#11 Z'
        };
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Butterfly');
        expect(model.chordString.length).toBe(242);

        expect(model.segments).toEqual([
            {
                name: 'i',
                data: [
                    {timeSignature: '4 / 4', openingLine: '{', chords: 'F-7'},
                    {openingLine: '|', chords: '\\ A-7'},
                    {openingLine: '|', chords: 'F-7'},
                    {openingLine: '|', chords: '\\ A-7', closingLine: '}'}
                ]
            },
            {
                name: 'A',
                data: [
                    {segno: true, openingLine: '{', chords: 'F-11'},
                    {openingLine: '|', chords: '\\ A-11'},
                    {openingLine: '|', chords: 'F-11'},
                    {openingLine: '|', chords: '\\ D-11', closingLine: '}'}
                ]
            },
            {
                name: 'B',
                data: [
                    {openingLine: '[', chords: 'n Bb7'},
                    {openingLine: '|', chords: 'n'},
                    {openingLine: '|', chords: 'n'},
                    {openingLine: '|', chords: 'n A7#9#5'},
                    {openingLine: '|', chords: 'Ab^7/Bb'},
                    {openingLine: '|', chords: 'Ab^7#5/Bb'},
                    {openingLine: '|', chords: 'Ab^7/Bb'},
                    {openingLine: '|', chords: 'Bb13'},
                    {openingLine: '|', chords: 'Eb13sus'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'Eb7#9#5'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'Ab13sus'},
                    {coda: true, openingLine: '|', chords: '\\ \\ W/C C7/E'},
                    {openingLine: '|', chords: 'n F-7'},
                    {openingLine: '|', chords: '\\ A-7', closingLine: '|'},
                    {openingLine: '{', chords: 'F-7'},
                    {openingLine: '|', chords: '\\ A-7', closingLine: '}'},
                    {divider: 'Y'},
                    {coda: true, openingLine: '{', chords: 'F-11'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'x', closingLine: '}'},
                    {openingLine: '{', chords: 'Bb13'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'x', closingLine: '}'},
                    {openingLine: '|', chords: 'A^7#11', closingLine: 'Z', fermata: true}
                ]
            }
        ]);
    });

    describe('parseSegment', () => {
        it('should handle repeat 2 bars (r)', () => {
            const segmentString = '[T44C-9 Db9|x |r C-9 Db9|x |r|][*AC-9 Db9|x |r C-9 Db9|x |r|]';
            const model = new IRealProChartModel();

            expect(model.parseSegment(segmentString)).toEqual([
                {timeSignature: '4 / 4', openingLine: '[', chords: 'C-9 Db9'},
                {openingLine: '|', chords: 'x'},
                {openingLine: '|', chords: 'C-9 Db9'},
                {openingLine: '|', chords: 'x'},
                {openingLine: '|', chords: 'C-9 Db9'},
                {openingLine: '|', chords: 'x'},
                {openingLine: '|', chords: 'C-9 Db9'},
                {openingLine: '|', chords: 'x', closingLine: ']'},
                {openingLine: '[', chords: '*AC-9 Db9'},
                {openingLine: '|', chords: 'x'},
                {openingLine: '|', chords: '*AC-9 Db9'},
                {openingLine: '|', chords: 'x'},
                {openingLine: '|', chords: 'C-9 Db9'},
                {openingLine: '|', chords: 'x'},
                {openingLine: '|', chords: 'C-9 Db9'},
                {openingLine: '|', chords: 'x', closingLine: ']'}
            ]);
        });
        it('should handle multiple repeats (r)', () => {
            const segmentString = '[T44C6 |x |r|r|r|]';
            const model = new IRealProChartModel();

            expect(model.parseSegment(segmentString)).toEqual([
                {timeSignature: '4 / 4', openingLine: '[', chords: 'C6'},
                {openingLine: '|', chords: 'x'},
                {openingLine: '|', chords: 'C6'},
                {openingLine: '|', chords: 'x', closingLine: '|'},
                {openingLine: '|', chords: 'C6'},
                {openingLine: '|', chords: 'x'},
                {openingLine: '|', chords: 'C6'},
                {openingLine: '|', chords: 'x', closingLine: ']'}
            ]);
        });
    });

    describe('parseBar', () => {
        it('should handle simple bar with Alternate Chords', () => {
            const barString = '|C^7(C#-7) (F#7)';
            const model = new IRealProChartModel();

            expect(model.parseBar(barString)).toEqual({openingLine: '|', chords: 'C^7(C#-7) (F#7)'});
        });
        it('should handle Segno sign', () => {
            const barString = '{SC C/E';
            const model = new IRealProChartModel();

            expect(model.parseBar(barString)).toEqual({openingLine: '{', chords: 'C C/E', segno: true});
        });
    });
});
