import {IIRealProChartModelProps, iRealProUrlFormatVersionPrefix} from './types';

/**
 * Parse iReal Pro format url
 *
 * See for more info and examples
 * @url https://irealpro.com/ireal-pro-file-format/
 */
export default class IRealProUrlParser {

    /**
     * Parse iRealPro url and return set of Chart props for iRealProChartModel
     *
     * @param url
     */
    public parse(url: string): IIRealProChartModelProps[] {
        if (!url || url === '') {
            return [];
        }

        return this.parseUrl(url);
    }

    /**
     * @see https://irealpro.com/ireal-pro-file-format/
     * @param url
     *
     *
     * 1 – Song Title (If starting with ‘The’ change the title to ‘Song Title, The’ for sorting purposes)
     * 2 – Composer’s LastName FirstName (we put the last name first for sorting purposes within the app)
     * 3 – Style (A short text description of the style used for sorting in the app. Medium Swing, Ballad, Pop, Rock…)
     * 4 – Key Signature (C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B, A-, Bb-, B-, C-, C#-, D-, Eb-, E-, F-, F#-, G-, G#-)
     * 5 – n (no longer used)
     * 6 – Chord Progression (This is the main part of this url and will be explained in detail below)
     */
    private parseUrl(url: string): IIRealProChartModelProps[] {
        const decodedUrl = decodeURIComponent(url);
        const rawData = decodedUrl.split('://')[1];

        if (!rawData) {
            return [];
        }
        const songs = rawData.split('===').filter(data => data && data !== '');

        return songs.map(rawSong => {
            const parts = rawSong.split('=');

            if (parts[2] && parts[2] !== '') {
                throw new Error(`parts[2] found in data url ${parts[2]}`);
            }

            const rawChordsStringWithPrefix = parts[6];

            if (!rawChordsStringWithPrefix) {
                // This is a non song part of url, TODO add to tests
                // For example it can be playlist name
                return null as any;
                // throw new Error(`Raw data with prefix not found in the string ${rawSong}`);
            }

            if (!rawChordsStringWithPrefix.startsWith(iRealProUrlFormatVersionPrefix)) {
                throw new Error('Prefix is not at the beginning, find example, take chords from the next part!');
            }

            // todo there may be additional player properties: style, bpm, transpose, repeats
            const obfuscatedChordString = parts[6].split(iRealProUrlFormatVersionPrefix)[1];
            const decryptedCordString = this.decrypt(obfuscatedChordString);

            const chordString = this.beautifyChordString(decryptedCordString);

            const authorNameParts = parts[1].split(' ');
            const author = authorNameParts.length === 2
                ? `${authorNameParts[1]} ${authorNameParts[0]}`
                : parts[1];

            return {
                title: parts[0],
                author,
                style: parts[3],
                key: parts[4],
                chordString
            };
        }).filter(song => song);
    }

    /**
     * They obfuscate url string for some reason
     * Big thanks to https://github.com/drs251/pyRealParser for solution
     *
     * @param chordString
     */
    public decrypt(chordString: string): string {
        const chunks = chordString.match(/.{1,50}/g);

        if (!chunks) {
            return '';
        }

        const decryptedChunks = chunks.map((rawChunk, index) => {
            const isLastChunk = index === chunks.length - 1;
            const chunk = isLastChunk
                ? rawChunk.replace(/\s*$/, '')
                : rawChunk;

            /**
             * If right trimmed chunk is shorter than 50 characters return as is
             * If the last chunk it can equal 50 character right trimmed
             */
            if (chunk.length < 50 || (isLastChunk && chunk.length <= 50)) {
                return chunk;
            }
            if (index === chunks.length - 2 && chunks[chunks.length - 1].length < 2) {
                return chunk;
            }
            const decryptedChunk = chunk.split('');

            for (let i = 0; i < 5; i++) {
                decryptedChunk[i] = chunk[chunk.length - 1 - i];
                decryptedChunk[chunk.length - 1 - i] = chunk[i];
            }

            for (let i = 10; i < 24; i++) {
                decryptedChunk[i] = chunk[chunk.length - 1 - i];
                decryptedChunk[chunk.length - 1 - i] = chunk[i];
            }

            return decryptedChunk.join('');
        });

        return decryptedChunks.join('');
    }

    /**
     * Removes redundant characters from chords string
     *
     * @param chords
     */
    public beautifyChordString(chords: string): string {
        return chords
            // Bar lines
            .replace(/LZ|K/g, '|')
            // Repeat cord = x
            .replace(/cl/g, 'x')

            /**
             * Lookahead and Lookbehind regex do not work in mobile browsers
             * So for now using workaround
             */
            // remove l but not alt, todo find out what (l) means it is not reflected visually in chart
            // .replace(/(?<!a)l(?!t)/g, ' ')
            .split('alt').map(chunk => chunk.replace(/l/g, ' ')).join('alt')
            // remove U, todo find out what (U) means it is not reflected visually in chart
            // // remove small sign for small chords rendering
            // .replace(/(?<!su)s(?!us)/g, '')
            .split('sus').map(chunk => chunk.replace(/[su]/g, '')).join('sus')
            // remove u if not part of sus, song Crosscurrent currently has a type with (us) instead of (sus)
            // .replace(/(?<!s)u(?!s)/g, '')

            .replace(/U/g, '')
            // Remove multiple vertical spaces
            .replace(/Y+/g, 'Y')
            // Transform empty characters to spaces
            .replace(/XyQ|,/g, ' ')
            // Remove empty measures
            .replace(/\|\s*\|/g, '|')
            // Remove spaces behind bar lines
            .replace(/\|\s+/g, '|')
            // Remove multiple whitespaces
            .replace(/\s+/g, ' ')
            // remove annotations
            .replace(/<.*?>/g, '')
            // Add space before (x)
            .replace(/([^\s|]+)(x)/g, '$1 $2')
            // Replace p pause with (/ ) symbol
            .replace(/p[\s]*/g, 'p ')
            // Each named segment should have opening bar line, it is often omitted
            .replace(/([}\]])[\s]*(\*[\w])(?![\s]*[[{|])/, '$1[$2')
            // Replace (*) if it is not a part of segment name, only acceptable segment names listed in rehearsalMarks
            .replace(/\*(?=[^ABCDiV]+)/g, '')
            // Dedupe repeating segment names in the row for example: *A*A
            .replace(/(\*[ABCDiV]){2}/g, '$1')
            /**
             * In some cases segment name *A, *B may be inside bar lines, in some outside,
             * we will put them always outside
             * Keeping spaces, time signature Tdd and S inside
             */
            // Move segment name like *A outside the bar for consistency
            .replace(/([{[|Y])([\sT\dS]*)(\*[\w]{1})/g, '$3$1$2')
            // Move move time signature inside the bar for consistency
            .replace(/(T\d{2})([\s*ABCDiV]*)([{[|Y])/g, '$2$3$1')
            // Each ending should have opening bar line
            .replace(/}[\s]*N/g, '}|N')
            // Move Q inside bar
            .replace(/([\]|}Y])[\s]*(Q)[\s]*([{[|Y])/g, '$1$3$2')
            // Add missing bar separator to the right of divider (Y)
            .replace(/([Y][\s]*)([^{}[\]|ZY*\s]+)/g, '$1|$2')
            // Remove duplicate sequential double opening and closing braces
            .replace(/([[{}\]])\1+/g, '$1')

            .trim();
    }
}
