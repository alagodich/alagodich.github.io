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
                    {openingLine: '|', chords: 'D-7 G7'},
                    {closingLine: '}'},
                    {ending: 'N2', openingLine: '|', chords: 'C^7'},
                    {openingLine: '|', chords: 'x'},
                    {closingLine: ']'}
                ]
            },
            {
                name: 'B',
                data: [
                    {openingLine: '[', chords: 'D-7'},
                    {openingLine: '|', chords: 'G7'},
                    {openingLine: '|', chords: 'C^7/E'},
                    {openingLine: '|', chords: 'A7'},
                    {closingLine: '|'},
                    {divider: 'Y'},
                    {openingLine: '|', chords: 'D-7'},
                    {openingLine: '|', chords: 'G7'},
                    {openingLine: '|', chords: 'C^7(C#-7) (F#7)'},
                    {openingLine: '|', chords: 'D-7 G7'},
                    {closingLine: ']'}
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
                    {openingLine: '|', chords: 'D-7 G7'},
                    {closingLine: 'Z'}
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
                    {
                        timeSignature: '4 / 4',
                        openingLine: '[',
                        chords: 'E-7'
                    },
                    {
                        openingLine: '|',
                        chords: 'x'
                    },
                    {
                        openingLine: '|',
                        chords: 'G-7'
                    },
                    {
                        openingLine: '|',
                        chords: 'x'
                    },
                    {
                        openingLine: '|',
                        chords: 'Bb^7'
                    },
                    {
                        openingLine: '|',
                        chords: 'x'
                    },
                    {
                        openingLine: '|',
                        chords: 'Bh7'
                    },
                    {
                        openingLine: '|',
                        chords: 'E7#9'
                    },
                    {
                        openingLine: '|',
                        chords: 'A-7'
                    },
                    {
                        openingLine: '|',
                        chords: 'x'
                    },
                    {
                        openingLine: '|',
                        chords: 'F#h7'
                    },
                    {
                        openingLine: '|',
                        chords: 'x'
                    },
                    {
                        openingLine: '|',
                        chords: 'F-7'
                    },
                    {
                        coda: true,
                        openingLine: '|',
                        chords: 'x'
                    },
                    {
                        openingLine: '|',
                        chords: 'C-7'
                    },
                    {
                        openingLine: '|',
                        chords: 'x'
                    },
                    {
                        openingLine: '|',
                        chords: 'B7#9'
                    },
                    {
                        openingLine: '|',
                        chords: 'x'
                    },
                    {closingLine: 'Z'},
                    {divider: 'Y'},
                    {
                        coda: true,
                        openingLine: '{',
                        chords: 'C-7'
                    },
                    {
                        openingLine: '|',
                        chords: 'x'
                    },
                    {
                        openingLine: '|',
                        chords: 'Ab^7'
                    },
                    {
                        openingLine: '|',
                        chords: 'x'
                    },
                    {closingLine: '}'}
                ]
            }
        ]);
    });

    describe('parseBar', () => {
        it.skip('should handle simple bar with Alternate Chords', () => {
            // const barString = '|C^7(C#-7) (F#7)';

        });
    });
});
