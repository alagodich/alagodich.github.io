/* eslint max-len: 0 */

import Chart from '../Chart';
import React from 'react';
import {create} from 'react-test-renderer';
import IRealProChartModel from '../IRealProChartModel';

describe('Chart Component', () => {
    it('should render Afternoon in Paris', () => {
        const props = {
            title: 'Afternoon In Paris',
            author: 'Lewis John',
            style: 'Medium Swing',
            key: 'C',
            chordString: '*A{T44C^7 |C-7 F7|Bb^7 |Bb-7 Eb7|Ab^7 |D-7 G7#9|N1C^7 |D-7 G7 } |N2C^7 |x ]*B[D-7 |G7 |C^7/E |A7 |Y|D-7 |G7 |C^7(C#-7) (F#7)|D-7 G7 ]*A[C^7 |C-7 F7|Bb^7 |Bb-7 Eb7|Ab^7 |D-7 G7#9|C^7 |D-7 G7 Z'
        };
        const model = new IRealProChartModel(props);

        const element = create(<Chart model={model}/>);
        const tree = element.toJSON();

        expect(tree).toMatchSnapshot();
    });
    it('should render 500 Miles High', () => {
        const props = {
            title: '500 Miles High',
            author: 'Corea Chick',
            style: 'Bossa Nova',
            key: 'E-',
            chordString: '[T44E-7 |x |G-7 |x |Bb^7 |x |Bh7 |E7#9 |A-7 |x |F#h7 |x |F-7 |x Q|C-7 |x |B7#9 |x Z Y{QC-7 |x |Ab^7 |x }'
        };
        const model = new IRealProChartModel(props);

        const element = create(<Chart model={model}/>);
        const tree = element.toJSON();

        expect(tree).toMatchSnapshot();
    });
    it('should render song with repeats (r), The African Queen', () => {
        const props = {
            title: 'African Queen, The',
            author: 'Silver Horace',
            style: 'Latin',
            key: 'C-',
            chordString: '*A[T44C-9 Db9|x |r|C-9 Db9|x |r|]*A[C-9 Db9|x |r|C-9 Db9|x |r|]*B[Bb7 A7|Ab7 G7|C-9 Db9|x |C-9 Db9|x Z'
        };
        const model = new IRealProChartModel(props);

        const element = create(<Chart model={model}/>);
        const tree = element.toJSON();

        expect(tree).toMatchSnapshot();
    });
    it('should render Agua De Beber (alt) and (sus)', () => {
        const props = {
            title: 'Agua De Beber',
            author: 'Jobim Antonio-Carlos',
            style: 'Bossa Nova',
            key: 'D-',
            chordString: '*i{T44D-7 |E7#9 A7b13|D-7 |E7#9 A7b13|D-7 |Bb^7 |D-7 |x }*A[E7b9 |A7alt |D-7 |G7 |G-7 |C7 |F^7 |x |E7 Eb7|D-7 Dbo7|F7/C |E7#9/B |E7b9 |A7sus |D-7 |D7b9 ]*B[G7 |G-7 |D-7 |D7b9 |G7 |G-7 |D-7 |A7b13 ]*C[D-7 |E7#9 A7b13|D-7 |E7#9 A7b13|D-7 |Bb^7 |D-7 |x Z'
        };
        const model = new IRealProChartModel(props);

        const element = create(<Chart model={model}/>);
        const tree = element.toJSON();

        expect(tree).toMatchSnapshot();
    });
    it('should render Airmail Special with Segno symbol (s), and 4 repeats', () => {
        const props = {
            title: 'Airmail Special',
            author: 'Christian Charlie',
            style: 'Medium Up Swing',
            key: 'C',
            chordString: '*i[T44C6 |x |r|r|r|][Co7 |x |r|Co7 Bo7|Bbo7 |Ab7 |G7 ] *A{SC C/E|F G|C C/E|F G|C C7|F F#o7|C/G |C  }*B[Co7 |x |r|Co7 Bo7|Bbo7 |Ab7 |G7 Z'
        };
        const model = new IRealProChartModel(props);

        const element = create(<Chart model={model}/>);
        const tree = element.toJSON();

        expect(tree).toMatchSnapshot();
    });
    it('should render Alfie with strange long second ending', () => {
        const props = {
            title: 'Alfie',
            author: 'Bacharach Burt',
            style: 'Ballad',
            key: 'Bb',
            chordString: '*A{T44Bb^7 |F7sus |Bb^7 |D-7 G7|C-7 |D-7 G-7|C-7 F7sus|Bbo7 |N1F7sus |F7 F7#5 } *B[N2A-7 |Bb-/C C7|A-7 |C7sus |A-7 |Bb-/C C7|F7sus |F6 F7 ]*A[Bb^7 |F7sus |Eh7 Eb7|D-7 G-7|Eh7 Eb7|D-7 G-7|C7#11 |C-7 F7sus|Bbo7 |F7sus |Bo7 |C-9 |Bo7 |Bb^7 Z'
        };
        const model = new IRealProChartModel(props);

        const element = create(<Chart model={model}/>);
        const tree = element.toJSON();

        expect(tree).toMatchSnapshot();
    });
    it('should render Ahmid-6 with multiple time signatures', () => {
        const props = {
            title: 'Ahmid-6',
            author: 'Metheny Pat',
            style: 'Even 8ths',
            key: 'C',
            chordString: '*A[T44D-7 |C#-7 |r|F#-7 B7|E-7 A7|G F|E- D-7|C^7 |B7 |Bb^7#11 |Ah7 D7b9|F#h7 B7b9|Eh7 A7b9|D-7 E-7|F-7 Bb7|Eb9sus|x|Ab^9|x|Ab7sus|x|Db^13|x|Dh7 G7b9|C-7 F7|F-7 Bb7|Gh7 C7#9|F-7 F#-7|G-7 C-7|T34 F#-7 B7 |E-7 A7sus|T24A7sus|T44 A7sus |x *B[D-7 |C#-7 |D-7 |C#-7 |F#-7 B7|E-7 A7|A-7 |\\ \\ D7|G^7 Bb7|Eb^7 B7|E^7 G7|C^7 Ab7|Db^7 E7|A^7 C7|F^7|x|E-7|x|F^7|x|E-7|x Z'
        };
        const model = new IRealProChartModel(props);

        const element = create(<Chart model={model}/>);
        const tree = element.toJSON();

        expect(tree).toMatchSnapshot();
    });
    it('should render All Through The Night with 2 long repeats', () => {
        const props = {
            title: 'All Through The Night',
            author: 'Cole Porter',
            style: 'Medium Swing',
            key: 'F',
            chordString: '*A{T44F^7 |Eh7 A7b9|D-7 Db7|C-7 F7b9|Bb^7 |Bb-7 Eb7b9|Ab^7 |x |N1Ah7|D7b9|Gh7|C7b9|F6|D7b9|G-7|C7b9 }|N2E^7|E7|Bbh7|Eb7b9|Ab^7|x|Gh7|C7b9 ]*B[F-7|Dh7|Gh7|C7b9|Eb-7|Ab7|Db6|x|Gh7|C7b9|F-7|F-7/Eb|Dh7|G7b9|Gh7|C7b9 ]*C[F^7 |Eh7 A7b9|D-7 Db7|C-7 F7b9|Bb^7 |x |Bb-7 |Eb7 |A-7 |D7 |G-7 |C7b9 |F6 |D7#9 |G-7 |C7b9 Z'
        };
        const model = new IRealProChartModel(props);

        const element = create(<Chart model={model}/>);
        const tree = element.toJSON();

        expect(tree).toMatchSnapshot();
    });
    it('should render Butterfly fermata and pauses and N.C.', () => {
        const props = {
            title: 'Butterfly',
            author: 'Herbie Hancock',
            style: 'Funk',
            key: 'F-',
            chordString: '*i{T44F-7 |\\ A-7 |F-7 |\\ A-7 }*A{SF-11 |\\ A-11 |F-11 |\\ D-11 }*B[n Bb7|n |n |n A7#9#5 |Ab^7/Bb |Ab^7#5/Bb |Ab^7/Bb |Bb13 |Eb13sus |x |Eb7#9#5 |x |Ab13sus |\\ \\ W/C QC7/E |n F-7|\\ A-7 |{F-7 |\\ A-7  } Y{QF-11  |x |x |x }{Bb13 |x |x |x }fA^7#11 Z'
        };

        const model = new IRealProChartModel(props);

        const element = create(<Chart model={model}/>);
        const tree = element.toJSON();

        expect(tree).toMatchSnapshot();
    });

    describe('processLines', () => {
        it('should handle empty call', () => {
            expect(Chart.prototype.processLines(undefined as any)).toBeUndefined();
            expect(Chart.prototype.processLines('' as any)).toBe('');
            expect(Chart.prototype.processLines(null as any)).toBeNull();
        });
        it('should correctly process segment with repeat', () => {
            const segment = {
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
            };

            expect(Chart.prototype.processLines(segment)).toEqual({
                name: 'A',
                data: [
                    {timeSignature: '4 / 4', openingLine: '{', chords: 'C^7'},
                    {openingLine: '|', chords: 'C-7 F7'},
                    {openingLine: '|', chords: 'Bb^7'},
                    {openingLine: '|', chords: 'Bb-7 Eb7', closingLine: '|'},
                    {openingLine: '|', chords: 'Ab^7'},
                    {openingLine: '|', chords: 'D-7 G7#9'},
                    {ending: 'N1', openingLine: '|', chords: 'C^7'},
                    {openingLine: '|', chords: 'D-7 G7', closingLine: '}'},
                    {ending: 'N2', openingLine: '|', chords: 'C^7'},
                    {openingLine: '|', chords: 'x', closingLine: ']'}
                ],
                lines: [
                    [
                        {timeSignature: '4 / 4', openingLine: '{', chords: 'C^7'},
                        {openingLine: '|', chords: 'C-7 F7'},
                        {openingLine: '|', chords: 'Bb^7'},
                        {openingLine: '|', chords: 'Bb-7 Eb7', closingLine: '|'}
                    ],
                    [
                        {openingLine: '|', chords: 'Ab^7'},
                        {openingLine: '|', chords: 'D-7 G7#9'},
                        {ending: 'N1', openingLine: '|', chords: 'C^7'},
                        {openingLine: '|', chords: 'D-7 G7', closingLine: '}'}
                    ],
                    [
                        {empty: true},
                        {empty: true},
                        {ending: 'N2', openingLine: '|', chords: 'C^7'},
                        {openingLine: '|', chords: 'x', closingLine: ']'}
                    ]
                ]
            });
        });

        it('should process not /4 number of chords with no repeat', () => {
            const segment = {
                name: '',
                data: [
                    {timeSignature: '4 / 4', openingLine: '[', chords: 'E-7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'G-7'},
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
            };

            expect(Chart.prototype.processLines(segment)).toEqual({
                name: '',
                data: [
                    {timeSignature: '4 / 4', openingLine: '[', chords: 'E-7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'G-7'},
                    {openingLine: '|', chords: 'x', closingLine: '|'},

                    {openingLine: '|', chords: 'F-7'},
                    {coda: true, openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'C-7'},
                    {openingLine: '|', chords: 'x', closingLine: '|'},

                    {openingLine: '|', chords: 'B7#9'},
                    // Closing bar line other than | should change the line
                    {openingLine: '|', chords: 'x', closingLine: 'Z'},
                    // Ignoring divider for now
                    {divider: 'Y'},

                    {coda: true, openingLine: '{', chords: 'C-7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'Ab^7'},
                    {openingLine: '|', chords: 'x', closingLine: '}'}
                ],
                lines: [
                    [
                        {timeSignature: '4 / 4', openingLine: '[', chords: 'E-7'},
                        {openingLine: '|', chords: 'x'},
                        {openingLine: '|', chords: 'G-7'},
                        {openingLine: '|', chords: 'x', closingLine: '|'}
                    ],
                    [
                        {openingLine: '|', chords: 'F-7'},
                        {coda: true, openingLine: '|', chords: 'x'},
                        {openingLine: '|', chords: 'C-7'},
                        {openingLine: '|', chords: 'x', closingLine: '|'}
                    ],
                    [
                        {openingLine: '|', chords: 'B7#9'},
                        {openingLine: '|', chords: 'x', closingLine: 'Z'}
                    ],
                    [
                        {coda: true, openingLine: '{', chords: 'C-7'},
                        {openingLine: '|', chords: 'x'},
                        {openingLine: '|', chords: 'Ab^7'},
                        {openingLine: '|', chords: 'x', closingLine: '}'}
                    ]
                ]
            });
        });

        it('should process lines with long 8 bars repeats, All Through The Night', () => {
            const segment = {
                name: 'A',
                data: [
                    {timeSignature: '4 / 4', openingLine: '{', chords: 'F^7'},
                    {openingLine: '|', chords: 'Eh7 A7b9'},
                    {openingLine: '|', chords: 'D-7 Db7'},
                    {openingLine: '|', chords: 'C-7 F7b9', closingLine: '|'},
                    {openingLine: '|', chords: 'Bb^7'},
                    {openingLine: '|', chords: 'Bb-7 Eb7b9'},
                    {openingLine: '|', chords: 'Ab^7'},
                    {openingLine: '|', chords: 'x', closingLine: '|'},
                    {ending: 'N1', openingLine: '|', chords: 'Ah7'},
                    {openingLine: '|', chords: 'D7b9'},
                    {openingLine: '|', chords: 'Gh7'},
                    {openingLine: '|', chords: 'C7b9', closingLine: '|'},
                    {openingLine: '|', chords: 'F6'},
                    {openingLine: '|', chords: 'D7b9'},
                    {openingLine: '|', chords: 'G-7'},
                    {openingLine: '|', chords: 'C7b9', closingLine: '}'},
                    {ending: 'N2', openingLine: '|', chords: 'E^7'},
                    {openingLine: '|', chords: 'E7'},
                    {openingLine: '|', chords: 'Bbh7'},
                    {openingLine: '|', chords: 'Eb7b9', closingLine: '|'},
                    {openingLine: '|', chords: 'Ab^7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'Gh7'},
                    {openingLine: '|', chords: 'C7b9', closingLine: ']'}
                ]
            };

            expect(Chart.prototype.processLines(segment)).toEqual({
                name: 'A',
                data: [
                    {timeSignature: '4 / 4', openingLine: '{', chords: 'F^7'},
                    {openingLine: '|', chords: 'Eh7 A7b9'},
                    {openingLine: '|', chords: 'D-7 Db7'},
                    {openingLine: '|', chords: 'C-7 F7b9', closingLine: '|'},
                    {openingLine: '|', chords: 'Bb^7'},
                    {openingLine: '|', chords: 'Bb-7 Eb7b9'},
                    {openingLine: '|', chords: 'Ab^7'},
                    {openingLine: '|', chords: 'x', closingLine: '|'},
                    {ending: 'N1', openingLine: '|', chords: 'Ah7'},
                    {openingLine: '|', chords: 'D7b9'},
                    {openingLine: '|', chords: 'Gh7'},
                    {openingLine: '|', chords: 'C7b9', closingLine: '|'},
                    {openingLine: '|', chords: 'F6'},
                    {openingLine: '|', chords: 'D7b9'},
                    {openingLine: '|', chords: 'G-7'},
                    {openingLine: '|', chords: 'C7b9', closingLine: '}'},
                    {ending: 'N2', openingLine: '|', chords: 'E^7'},
                    {openingLine: '|', chords: 'E7'},
                    {openingLine: '|', chords: 'Bbh7'},
                    {openingLine: '|', chords: 'Eb7b9', closingLine: '|'},
                    {openingLine: '|', chords: 'Ab^7'},
                    {openingLine: '|', chords: 'x'},
                    {openingLine: '|', chords: 'Gh7'},
                    {openingLine: '|', chords: 'C7b9', closingLine: ']'}
                ],
                lines: [
                    [
                        {timeSignature: '4 / 4', openingLine: '{', chords: 'F^7'},
                        {openingLine: '|', chords: 'Eh7 A7b9'},
                        {openingLine: '|', chords: 'D-7 Db7'},
                        {openingLine: '|', chords: 'C-7 F7b9', closingLine: '|'}
                    ],
                    [
                        {openingLine: '|', chords: 'Bb^7'},
                        {openingLine: '|', chords: 'Bb-7 Eb7b9'},
                        {openingLine: '|', chords: 'Ab^7'},
                        {openingLine: '|', chords: 'x', closingLine: '|'}
                    ],
                    [
                        {ending: 'N1', openingLine: '|', chords: 'Ah7'},
                        {openingLine: '|', chords: 'D7b9'},
                        {openingLine: '|', chords: 'Gh7'},
                        {openingLine: '|', chords: 'C7b9', closingLine: '|'}
                    ],
                    [
                        {openingLine: '|', chords: 'F6'},
                        {openingLine: '|', chords: 'D7b9'},
                        {openingLine: '|', chords: 'G-7'},
                        {openingLine: '|', chords: 'C7b9', closingLine: '}'}
                    ],
                    [
                        {ending: 'N2', openingLine: '|', chords: 'E^7'},
                        {openingLine: '|', chords: 'E7'},
                        {openingLine: '|', chords: 'Bbh7'},
                        {openingLine: '|', chords: 'Eb7b9', closingLine: '|'}
                    ],
                    [
                        {openingLine: '|', chords: 'Ab^7'},
                        {openingLine: '|', chords: 'x'},
                        {openingLine: '|', chords: 'Gh7'},
                        {openingLine: '|', chords: 'C7b9', closingLine: ']'}
                    ]
                ]
            });
        });
    });
});
