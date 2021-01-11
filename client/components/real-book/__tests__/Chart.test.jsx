/* eslint max-len: 0 */

import Chart from '../Chart.jsx';
import React from 'react';
import {create} from 'react-test-renderer';
import IRealProChartModel from '../IRealProChartModel';

describe('Chart Component', () => {
    it('should render empty', () => {
        const element = create(<Chart/>);
        const tree = element.toJSON();

        expect(tree).toMatchSnapshot();
    });
    it('should render Afternoon in Paris', () => {
        const props = {
            title: 'Afternoon In Paris',
            author: 'Lewis John',
            style: 'Medium Swing',
            key: 'C',
            chordString: '*A{T44C^7 |C-7 F7|Bb^7 |Bb-7 Eb7|Ab^7 |D-7 G7#9|N1C^7 |D-7 G7 } |N2C^7 |x ]*B[D-7 |G7 |C^7/E |A7 |Y|D-7 |G7 |C^7(C#-7) (F#7)|D-7 G7 ]*A[C^7 |C-7 F7|Bb^7 |Bb-7 Eb7|Ab^7 |D-7 G7#9|C^7 |D-7 G7 Z'
        };
        const model = new IRealProChartModel(props);

        const element = create(<Chart model={model} />);
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

        const element = create(<Chart model={model} />);
        const tree = element.toJSON();

        expect(tree).toMatchSnapshot();
    });
    describe('processLines', () => {
        it('should handle empty call', () => {
            const element = create(<Chart/>);
            const instance = element.getInstance();

            expect(instance.processLines()).toBeNull();
            expect(instance.processLines('')).toBeNull();
            expect(instance.processLines(null)).toBeNull();
        });
        it('should correctly process segment with repeat', () => {
            const element = create(<Chart/>);
            const instance = element.getInstance();
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

            expect(instance.processLines(segment)).toEqual({
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
            const element = create(<Chart/>);
            const instance = element.getInstance();
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

            expect(instance.processLines(segment)).toEqual({
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
    });
});
