import {timeSignatures, endings} from './IRealProUrlParser';
import {default as _omit} from 'lodash/omit';

export default class IRealProChartModel {
    constructor(props) {
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
    init() {
        const segments = this.chordString
            /**
             * In some cases segment name *A, *B may be inside bar lines, in some outside,
             * we will put them always outside
             */
            .replace(/([{[|Y])(\*\w)/g, '$2$1')
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
     * @param segmentString
     * @returns {*}
     */
    parseSegment(segmentString) {
        const segment = [];

        // Process segment data string to form final chord collection
        segmentString
            // Split string by bar line separator
            .match(/([{}[\]|ZY])([^{}[\]|ZY]*)/g)
            // Process bar collection
            .forEach(rawBarDataString => {
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

                    // If last of the cloned bar has special closing bar line, keep it only on cloned pair
                    if (last2Bars[1].closingLine && last2Bars[1].closingLine !== '|') {
                        segment[segment.length - 1].closingLine = '|';
                    }
                    segment.push(...last2Bars);
                    // Remaining measure string with (r) sign
                    barString = [rSplitMatch[1], rSplitMatch[3]].join('');
                }

                const bar = this.parseBar(barString);

                // Merge some parts together, for example closing bar line with the previous bar
                if (bar.closingLine && Object.getOwnPropertyNames(bar).length === 1) {
                    if (!segment[segment.length - 1]) {
                        throw new Error(`Invalid segment, closing bar as a first part: ${segmentString}`);
                    }
                    segment[segment.length - 1].closingLine = bar.closingLine;
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
     * @returns {{}}
     */
    // eslint-disable-next-line complexity,max-statements
    parseBar(barString) {
        let rawBarString = barString.trim();
        const barProps = {};

        // Check and extract time signature
        const timeSignature = rawBarString.match(/(T\d\d)/g);

        if (timeSignature && timeSignature[0]) {
            if (!timeSignatures[timeSignature[0]]) {
                // console.log('Invalid time signature', timeSignature);
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

        // Check if that part is a divider
        const isDivider = rawBarString === 'Y';

        if (isDivider) {
            barProps.divider = 'Y';
            rawBarString = '';
        }

        // Handle closing brackets
        if (rawBarString.length === 1) {
            const closingBarLine = rawBarString.match(/([{}[\]|Z])/g);

            if (closingBarLine.length !== 1) {
                throw new Error(`Unexpected rawBarString ${rawBarString}`);
            }
            barProps.closingLine = closingBarLine[0];
            rawBarString = rawBarString.split(closingBarLine[0]).join('');
        }

        // Find the final opening line and chords
        const barParts = rawBarString.match(/([{}[\]|Z]+)([^{}[\]|Z]*)/);

        if (barParts && barParts[0] && barParts[1] && barParts[2]) {
            barProps.openingLine = barParts[1];
            barProps.chords = barParts[2].trim();

            rawBarString = rawBarString.split(barParts[0]).join('');
        }

        // After opening line and a chord there should be nothing more left
        if (rawBarString.length > 0) {
            throw new Error(`Unparsed rawBarString ${rawBarString}`);
        }

        return barProps;
    }

}
