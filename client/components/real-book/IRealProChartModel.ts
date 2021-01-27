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
    roots,
    TRoot,
    TTuneAdjective,
    qualities,
    majorDegreesIndices,
    minorDegreesIndices,
    keysIntervalList
} from './types';

export default class IRealProChartModel {
    public title = '';
    public author = '';
    public style = '';
    // Bb - key string
    public key = '';
    // B - needed to calculate degree base without shift
    public tuneKeyRootBase: TRoot | null = null;
    // 6 - tune key degree diff relative to C, number from 0 to 6
    public tuneKeyRelativeToCShift: number | null = null;
    // 10 in case of Bb, interval diff between tune key and C
    public tuneKeyIntervalRelativeToC: number | null = null;

    public tuneAdjective: TTuneAdjective | null = null;
    public chordString = '';
    public segments: IIRealProChartSegment[] = [];
    public errors: string[] = [];

    constructor(props: IIRealProChartModelProps, suppressAdjective = false) {
        if (!props) {
            return;
        }

        this.title = props.title;
        this.author = props.author;
        this.style = props.style;
        this.key = props.key;

        /**
         * Tune adjective used to calculate chord degrees
         * There is two approaches to that
         * @see Nashville Number System
         * @see Roman numeral analysis
         *
         * Usually people base chord degrees on either major or minor scale depending on tune key
         * But others, especially looks like in Berklee always base degrees on major regardless if tune is in minor
         */
        this.tuneAdjective = suppressAdjective
            ? 'major'
            : props.key.includes('-') ? 'minor' : 'major';

        this.chordString = props.chordString;

        if (this.key) {
            const tuneKeyRootBase = this.key.match(/[A-G]/);

            if (tuneKeyRootBase && tuneKeyRootBase[0]) {
                if (!roots.includes(tuneKeyRootBase[0])) {
                    throw new Error(`Unexpected key root base ${JSON.stringify(props)}`);
                }
                this.tuneKeyRootBase = tuneKeyRootBase[0] as TRoot;
            }
            this.tuneKeyRelativeToCShift = roots.indexOf(this.tuneKeyRootBase ? this.tuneKeyRootBase : '');
            this.tuneKeyIntervalRelativeToC = keysIntervalList.indexOf(this.key.replace('-', ''));
        }

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
        const main: IIRealProChord[] = [];
        const alt: IIRealProChord[] = [];

        // eslint-disable-next-line complexity
        harmonyString.split(' ').forEach((chordString: string) => {
            const chordParts = fixMisspelledChordQuality(chordString).match(chordsStringExpresion);

            if (!chordParts) {
                throw new Error(`Song: ${this.title}. Chord not recognized ${harmonyString}.`);
            }
            if (chordParts[3] && chordParts[3] !== '' && !qualities.includes(chordParts[3])) {
                throw new Error(`Song: ${this.title}. Unrecognized chord quality ${chordString}`);
            }
            if (['x', 'n', 'p'].includes(chordParts[1])) {
                main.push({root: chordParts[1]});
            } else if (chordParts[1] !== '') {
                // todo make sure W is handled right

                main.push(this.fillChord(chordParts));
            }

            if (chordParts[5]) {
                const altChordParts = chordParts[5]
                    .replace(/[()]*/g, '')
                    .match(chordsStringExpresion);

                if (!altChordParts) {
                    throw new Error(`Song: ${this.title}.Alt chord not recognized ${harmonyString}.`);
                }

                alt.push(this.fillChord(altChordParts));
            }

        });

        return [main, alt];
    }

    /**
     * Parse chord parts and assign degree value
     * If tune has no key, throw
     */
    // eslint-disable-next-line complexity
    public fillChord(chordParts: RegExpMatchArray): IIRealProChord {
        let inversionDegreeIndex;
        let inversionDegreeShift;

        const [degreeIndex, degreeShift] = this.getDegree(chordParts[1], chordParts[2]);

        // Calculating inversion degree
        if (chordParts[4] && chordParts[4].length) {
            const inversionDegreeRootBase = chordParts[4].match(/[A-G]/);
            const inversionDegreeShiftSignMatch = chordParts[4].match(/[#b]/);
            const inversionDegreeShiftSign = inversionDegreeShiftSignMatch
                ? inversionDegreeShiftSignMatch[0]
                : '';

            if (inversionDegreeRootBase && inversionDegreeRootBase[0]) {
                [inversionDegreeIndex, inversionDegreeShift] =
                    this.getDegree(inversionDegreeRootBase[0], inversionDegreeShiftSign);
            }
        }

        return {
            root: chordParts[1],
            ...(chordParts[2] ? {shift: chordParts[2]} : null),
            ...(chordParts[3] && chordParts[3] !== '' ? {quality: chordParts[3]} : null),
            ...(degreeIndex ? {degree: degreeIndex} : null),
            ...(degreeShift ? {degreeShift} : null),
            ...(chordParts[4] ? {inversion: chordParts[4]} : null),
            ...(inversionDegreeIndex ? {inversionDegree: inversionDegreeIndex} : null),
            ...(inversionDegreeShift ? {inversionDegreeShift} : null)
        };
    }

    /**
     * Calculate degree and degree shift for given chord base and sign
     * Requires tune key to be set or throws
     *
     *
     * @param rootBase
     * @param shiftSign
     */
    // eslint-disable-next-line complexity
    public getDegree(rootBase: string, shiftSign: string): Array<number | null> {
        let degreeIndex = null;
        let degreeShift = null;

        if (!rootBase || rootBase === 'W') {
            return [];
        }

        degreeIndex = roots.indexOf(rootBase[0]) + 1;

        if (degreeIndex
            && this.tuneKeyRelativeToCShift !== null
            && this.tuneKeyRelativeToCShift !== -1) {
            degreeIndex -= this.tuneKeyRelativeToCShift;
            if (degreeIndex <= 0) {
                degreeIndex += 7;
            }
        }

        const requiredDegreeInterval: number = !this.tuneAdjective || this.tuneAdjective === 'major'
            ? majorDegreesIndices.indexOf(degreeIndex)
            : minorDegreesIndices.indexOf(degreeIndex);
        const realDegreeInterval: number = keysIntervalList.indexOf(`${rootBase}${shiftSign}`);

        if (this.tuneKeyIntervalRelativeToC === null || this.tuneKeyIntervalRelativeToC === -1) {
            throw new Error(`Unexpected tune key shift interval. Key: ${this.key}`);
        }

        if (realDegreeInterval === -1 || requiredDegreeInterval === -1) {
            throw new Error(`Unexpected degree interval ${rootBase} ${shiftSign}. Tune key: ${this.key}`);
        }

        if (requiredDegreeInterval !== realDegreeInterval) {
            degreeShift = (realDegreeInterval - (requiredDegreeInterval + this.tuneKeyIntervalRelativeToC) % 12) % 12;
        }

        return [degreeIndex, degreeShift];
    }

    /**
     * Change key adjective between major and minor
     * And re-init all the chords
     *
     * If adjective = null passed, recalculate from key
     *
     * @param adjective
     */
    public changeTuneAdjective(adjective: TTuneAdjective | null): void {
        this.tuneAdjective = !adjective
            ? this.key.includes('-') ? 'minor' : 'major'
            : adjective;

        this.init();
    }
}

/**
 * FIXME
 * Should probably omit this to remove unnecessary operations
 *
 * @param chordString
 */
function fixMisspelledChordQuality(chordString: string): string {
    return chordString
        .replace('-3', '-')
        .replace('-b5', '-7b5')
        .replace('+7', '+')
        .replace('7+', '+')
        .replace('sus4', 'sus');
}

export function chordToString(chord: IIRealProChord): string {
    return [chord.degree, chord.shift, chord.quality, chord.inversion, chord.alt].join('');
}
