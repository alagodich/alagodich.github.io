import {timeSignatures, endings} from './IRealProUrlParser';

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
        const segments = this.chordString.match(/(\*\w)([^*]+)/g);

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
        return segmentString.match(/([{}[\]|ZY])([^{}[\]|ZY]*)/g)
            .map(barString => this.parseBar(barString));
    }

    /**
     * Parse bar string, find all possible elements and return bar props object
     *
     * @param barString
     * @returns {{}}
     */
    // eslint-disable-next-line complexity,max-statements
    parseBar(barString) {
        // console.log('parseBar', barString);
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
        // console.log();
        // console.log(
        //     // rawBarString,
        //     barProps
        // );

        return barProps;
    }

}
