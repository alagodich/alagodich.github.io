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

export default class IRealProChartModel {
    public title = '';
    public author = '';
    public style = '';
    public key = '';
    public chordString = '';
    public segments: IIRealProChartSegment[] = [];

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
            // Split chord string by Segment name *A, *B, they are all now outside the bar lines
            .match(/(\*\w)([^*]+)/g);

        if (!segments) {
            this.segments = [
                {name: '', data: this.parseSegment(this.chordString)}
            ];
        } else {
            this.segments = segments
                .map(segmentString => ({
                    name: segmentString[1],
                    data: this.parseSegment(segmentString.substring(2))
                }));
        }
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
        // eslint-disable-next-line complexity
        segmentByBars.forEach(rawBarDataString => {
            let barString = rawBarDataString;

            // Process repeat sign (r)
            if (barString.includes('r') && barString !== 'r') {
                // Split measure with (r), cut r from it and process the remains as usual
                const rSplitMatch = barString.match(/([^r]*)(r)([^r]*)/);
                const last2Bars = segment.slice(-2).map(bar => {
                    const newBar = Object.assign({}, bar);

                    // Cloned bar will always have simple opening bar line
                    newBar.openingLine = '|';
                    return _omit(newBar, 'timeSignature');
                });

                if (!rSplitMatch || last2Bars.length !== 2) {
                    throw new Error(`Song: ${this.title}. Cannot repeat last 2 bars ${rawBarDataString}`);
                }
                /**
                 * If last of the cloned bar has special closing bar line, keep it only on cloned pair
                 * but remove from the last segment
                 * If repeat is at the first 2 line bars then remove closing line
                 */
                if (last2Bars[1].closingLine) {
                    if (segment.length % 4) {
                        const beforeLastSegment = Object.assign({}, segment[segment.length - 1]);

                        segment[segment.length - 1] = _omit(beforeLastSegment, 'closingLine');
                    } else if (last2Bars[1].closingLine !== '|') {
                        segment[segment.length - 1].closingLine = '|';
                    }
                }
                segment.push(...last2Bars);

                // Remaining measure string with (r) sign
                barString = [rSplitMatch[1], rSplitMatch[3]].join('');
            }

            const bar = this.parseBar(barString);

            // Merge some parts together, for example closing bar line with the previous bar
            if (bar.closingLine && Object.getOwnPropertyNames(bar).length === 1) {
                if (!segment[segment.length - 1]) {
                    throw new Error(`Song: ${this.title}. Closing bar as a first part: ${segmentString}.`);
                }
                segment[segment.length - 1].closingLine = bar.closingLine;
            } else if (bar.openingLine && closingBarLines[bar.openingLine]) {
                // If bar opening line is actually closing bar line, move it to the previous bar
                if (segment[segment.length - 1].closingLine) {
                    throw new Error(
                        `Song: ${this.title} trying to move closing bar to the previous bar ${segmentString}`
                    );
                }
                segment[segment.length - 1].closingLine = bar.openingLine;

                bar.openingLine = '|';
                segment.push(bar);
            } else {
                segment.push(bar);
            }
        });

        if (!segment[segment.length - 1].closingLine) {
            segment[segment.length - 1].closingLine = ']';
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
            barProps.closingLine = closingBarLine[0];
            rawBarString = rawBarString.split(closingBarLine[0]).join('');
        }

        // Find the final opening line and chords
        const barParts = rawBarString.match(/([{}[\]|Z]+)([^{}[\]|Z]*)/);

        if (barParts && barParts[0] && barParts[1] && barParts[2]) {
            barProps.openingLine = barParts[1];
            barProps.chords = barParts[2].trim();
            barProps.harmony = this.parseHarmony(barProps.chords);

            // Bar string should be either recognizable or empty
            if (barProps.chords !== '' && !barProps.chords.match(chordsStringExpresion)) {
                throw new Error(`Song: ${this.title}. Unrecognized chords string found ${barProps.chords}`);
            }

            rawBarString = rawBarString.split(barParts[0]).join('');
        }

        // After opening line and a chord there should be nothing more left
        if (rawBarString.length > 0) {
            throw new Error(`Song: ${this.title}. Unparsed left overs ${rawBarString}`);
        }

        return barProps;
    }

    public parseHarmony(harmonyString: string): IIRealProChord[] {
        const harmony = harmonyString.split(' ').map((chordString: string) => {
            const chordParts = chordString.match(chordsStringExpresion);

            if (!chordParts) {
                throw new Error(`Song: ${this.title}.Chord not recognized ${harmonyString}.`);
            }
            // console.log(chordParts);
            const chord: IIRealProChord = {
                root: chordParts[1],
                shift: chordParts[2],
                quality: chordParts[3],
                inversion: chordParts[4],
                numeric: roots.indexOf(chordParts[1]) + 1
            };

            if (chordParts[5]) {
                const altChordParts = chordParts[5]
                    .replace(/[()]*/g, '')
                    .match(chordsStringExpresion);

                if (!altChordParts) {
                    throw new Error(`Song: ${this.title}.Alt chord not recognized ${harmonyString}.`);
                }

                chord.alt = {
                    root: altChordParts[1],
                    shift: altChordParts[2],
                    quality: altChordParts[3],
                    inversion: altChordParts[4],
                    numeric: roots.indexOf(altChordParts[1]) + 1
                };
            }

            return chord;
        });

        return harmony;
    }
}
