import {default as _omit} from 'lodash/omit';
import {
    IIRealProChartSegment,
    IIRealProChartModelProps,
    IIRealProChartBar,
    chordsStringExpresion,
    closingBarLines,
    IIRealProChord,
    timeSignatures,
    endings,
    roots
} from './types';

function fillChord(chordParts: RegExpMatchArray, tuneKeyShift: number): IIRealProChord {
    let chordNumericIndex = roots.indexOf(chordParts[1]) + 1;

    if (chordNumericIndex) {
        chordNumericIndex -= tuneKeyShift;
        if (chordNumericIndex <= 0) {
            chordNumericIndex += 7;
        }
    }

    return {
        root: chordParts[1],
        ...(chordParts[2] ? {shift: chordParts[2]} : null),
        ...(chordParts[3] && chordParts[3] !== '' ? {quality: chordParts[3]} : null),
        ...(chordParts[4] ? {inversion: chordParts[4]} : null),
        ...(chordNumericIndex ? {numeric: chordNumericIndex} : null)
    };
}

export default class IRealProChartModel {
    public title = '';
    public author = '';
    public style = '';
    public key = '';
    public chordString = '';
    public segments: IIRealProChartSegment[] = [];
    public errors: string[] = [];

    constructor(props: IIRealProChartModelProps) {
        if (!props) {
            return;
        }

        this.title = props.title;
        this.author = props.author;
        this.style = props.style;
        this.key = props.key;
        this.chordString = props.chordString;

        this.init();
    }

    /**
     * Prepare chart object from chart string
     *
     * Split chart by named sections (A, B, C)
     */
    private init(): void {
        const segments = this.chordString
            // Split chord string by Segment name *A, *B, etc they are all now outside the bar lines
            .match(/([*ABCDVi]*)([^*]+)/g);

        if (!segments) {
            this.segments = [
                {name: '', data: this.parseSegment(this.chordString)}
            ];
            return;
        }

        if (this.chordString !== segments.join('')) {
            this.errors.push('missing some content after division on segments');
        }
        this.segments = segments
            .map(segmentString => {
                if (segmentString[0] === '*') {
                    return {
                        name: segmentString[1],
                        data: this.parseSegment(segmentString.substring(2))
                    };
                }

                return {
                    name: '',
                    data: this.parseSegment(segmentString)
                };
            });
    }

    /**
     * Split data string by segments
     *
     * @param segmentString
     */
    public parseSegment(segmentString: string): IIRealProChartBar[] {
        const segment: IIRealProChartBar[] = [];
        const segmentByBars = segmentString
            // Split string by bar line separator
            .match(/([{}[\]|ZY])([^{}[\]|ZY]*)/g);

        if (!segmentByBars || !segmentByBars.length) {
            throw new Error(`Song: ${this.title}. Segment string has no bar lines: ${segmentString}`);
        }

        // Process segment data string to form final chord collection
        // eslint-disable-next-line complexity,max-statements
        segmentByBars.forEach(rawBarDataString => {
            let barString = rawBarDataString;

            // Process double bar repeat sign (r)
            if (barString.includes('r') && barString !== 'r') {
                // Split measure with (r), cut r from it and process the remains as usual
                const rSplitMatch = barString.match(/([^r]*)(r)([^r]*)/);
                const last2Bars = segment.slice(-2).map(bar => {
                    const newBar = Object.assign({}, bar);

                    // Cloned bar will always have simple opening bar line
                    newBar.open = '|';
                    return _omit(newBar, 'timeSignature');
                });

                if (!rSplitMatch) {
                    throw new Error(`Song: ${this.title}. Cannot repeat last 2 bars ${rawBarDataString}`);
                }

                /**
                 * If we need to repeat something that does not exist
                 * If segment length is less than 2 we are going to fill it with empty bars
                 * before repeating them, this should not happen but nothing else to do here
                 */
                if (last2Bars.length < 2) {
                    if (last2Bars.length < 1) {
                        last2Bars.push(this.parseBar('[x'));
                        last2Bars[0].error = 'Repeating empty bars';
                    }
                    if (last2Bars.length < 2) {
                        last2Bars.push(this.parseBar('|x'));
                        last2Bars[1].error = 'Repeating empty bars';
                    }
                    segment.push(...last2Bars);
                    this.errors.push(`Repeating empty bars ${rawBarDataString}`);
                }

                /**
                 * If last of the cloned bar has special closing bar line, keep it only on cloned pair
                 * but remove from the last segment
                 * If repeat is at the first 2 line bars then remove closing line
                 */
                if (last2Bars[1].close) {
                    if (segment.length % 4) {
                        const beforeLastSegment = Object.assign({}, segment[segment.length - 1]);

                        segment[segment.length - 1] = _omit(beforeLastSegment, 'close');
                    } else if (last2Bars[1].close !== '|') {
                        segment[segment.length - 1].close = '|';
                    }
                }
                segment.push(...last2Bars);

                // Remaining measure string with (r) sign
                barString = [rSplitMatch[1], rSplitMatch[3]].join('');
            }

            const bar = this.parseBar(barString);

            // Merge some parts together, for example closing bar line with the previous bar
            if (bar.close && Object.getOwnPropertyNames(bar).length === 1) {
                if (!segment[segment.length - 1]) {
                    const emptyBar = {empty: true, error: 'Bar has no content', open: '[', close: ']'};

                    segment.push(emptyBar);
                    this.errors.push(`Closing bar as a first part: ${segmentString}.`);
                }
                segment[segment.length - 1].close = bar.close;
            } else if (bar.open && closingBarLines[bar.open]) {
                /**
                 * If bar opening line is actually closing bar line, move it to the previous bar
                 * If previous bar has special closing bar, throw
                 */
                if (segment[segment.length - 1].close && segment[segment.length - 1].close !== '|') {
                    throw new Error(
                        `Song: ${this.title} trying to move closing bar to the previous bar ${segmentString}.`
                    );
                }
                segment[segment.length - 1].close = bar.open;

                bar.open = '|';
                segment.push(bar);
            } else {
                segment.push(bar);
            }
        });

        if (!segment[segment.length - 1].close) {
            segment[segment.length - 1].close = ']';
        }

        return segment;
    }

    /**
     * Parse bar string, find all possible elements and return bar props object
     *
     * @param barString
     */
    // eslint-disable-next-line complexity,max-statements
    public parseBar(barString: string): IIRealProChartBar {
        let rawBarString = barString.trim();
        const barProps: IIRealProChartBar = {};

        // Check and extract time signature
        const timeSignature = rawBarString.match(/(T\d\d)/g);

        if (timeSignature && timeSignature[0]) {
            if (!timeSignatures[timeSignature[0]]) {
                throw new Error(`Invalid time signature ${rawBarString}`);
            }
            barProps.timeSignature = timeSignatures[timeSignature[0]];
            rawBarString = rawBarString.split(timeSignature[0]).join('');
        }

        // Check and extract ending
        const ending = rawBarString.match(/(N\d)/g);

        if (ending && ending[0]) {
            if (!endings.includes(ending[0])) {
                throw new Error(`Invalid ending ${rawBarString}`);
            }
            barProps.ending = ending[0];
            rawBarString = rawBarString.split(ending[0]).join('');
        }

        // Check and extract coda
        const hasCoda = rawBarString.includes('Q');

        if (hasCoda) {
            barProps.coda = true;
            rawBarString = rawBarString.split('Q').join('');
        }
        // Check and extract fermata
        const hasFermata = rawBarString.includes('f');

        if (hasFermata) {
            barProps.fermata = true;
            rawBarString = rawBarString.split('f').join('');
        }

        // Check and extract segno
        const hasSegno = rawBarString.includes('S');

        if (hasSegno) {
            barProps.segno = true;
            rawBarString = rawBarString.split('S').join('');
        }

        // Check if that part is a divider
        const isDivider = rawBarString.trim() === 'Y';

        if (isDivider) {
            barProps.divider = 'Y';
            rawBarString = '';
        }

        // Handle closing brackets, they are the only thing existing in barString
        if (rawBarString.length === 1) {
            const closingBarLine = rawBarString.match(/([{}[\]|Z])/g);

            if (!closingBarLine || closingBarLine.length !== 1) {
                throw new Error(`Song: ${this.title}. Unexpected chord string with length 1 ${rawBarString}`);
            }
            barProps.close = closingBarLine[0];
            rawBarString = rawBarString.split(closingBarLine[0]).join('');
        }

        // Find the final opening line and chords
        const barParts = rawBarString.match(/([{}[\]|Z]+)([^{}[\]|Z]*)/);

        if (barParts && barParts[0] && barParts[1] && barParts[2]) {
            barProps.open = barParts[1];
            const chordString = barParts[2].trim();

            // TODO remove chords from props
            barProps.chords = chordString;

            const [main, alt] = this.parseHarmony(chordString);

            if (main && main.length) {
                barProps.harmony = main;
            }
            if (alt && alt.length) {
                barProps.alt = alt;
            }

            // Bar string should be either recognizable or empty
            if (chordString !== '' && !chordString.match(chordsStringExpresion)) {
                throw new Error(`Song: ${this.title}. Unrecognized chords string found ${chordString}`);
            }

            rawBarString = rawBarString.split(barParts[0]).join('');
        }

        // After opening line and a chord there should be nothing more left
        if (rawBarString.length > 0) {
            throw new Error(`Song: ${this.title}. Unparsed left overs ${rawBarString}`);
        }

        return barProps;
    }

    public parseHarmony(harmonyString: string): [IIRealProChord[], IIRealProChord[]?] {
        const tuneKeyRoot = this.key?.match(/[A-G]/);
        const tuneKeyShift = roots.indexOf(tuneKeyRoot ? tuneKeyRoot[0] : '');

        // if (tuneKeyShift === -1) {
        //     throw new Error(`Song: ${this.title}. Key not recognized ${this.key}.`);
        // }

        const main: IIRealProChord[] = [];
        const alt: IIRealProChord[] = [];

        // eslint-disable-next-line complexity
        harmonyString.split(' ').forEach((chordString: string) => {
            const chordParts = chordString.match(chordsStringExpresion);

            if (!chordParts) {
                throw new Error(`Song: ${this.title}. Chord not recognized ${harmonyString}.`);
            }
            if (['x', 'n', 'p'].includes(chordParts[1])) {
                main.push({root: chordParts[1]});
            } else if (chordParts[1] !== '') {
                // todo make sure W is handled right

                main.push(fillChord(chordParts, tuneKeyShift));
            }

            if (chordParts[5]) {
                const altChordParts = chordParts[5]
                    .replace(/[()]*/g, '')
                    .match(chordsStringExpresion);

                if (!altChordParts) {
                    throw new Error(`Song: ${this.title}.Alt chord not recognized ${harmonyString}.`);
                }

                alt.push(fillChord(altChordParts, tuneKeyShift));
            }

        });

        return [main, alt];
    }
}
