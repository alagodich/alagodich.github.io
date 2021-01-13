export const barLines = [
    // single bar line
    '|',
    // opening double bar line
    '[',
    // closing double bar line
    ']',
    // opening repeat bar line
    '{',
    // closing repeat bar line
    '}',
    // Final thick double bar line
    'Z'
];

export const timeSignatures = {
    T44: '4 / 4',
    T34: '3 / 4',
    T24: '2 / 4',
    T54: '5 / 4',
    T64: '6 / 4',
    T74: '7 / 4',
    T22: '2 / 2',
    T32: '3 / 2',
    T58: '5 / 8',
    T68: '6 / 8',
    T78: '7 / 8',
    T98: '9 / 8',
    T12: '12 / 8'
};

/**
 * Example: *A[C |A- |SD- |G7 QZ
 */
export const rehearsalMarks = [
    // A section
    '*A',
    // B section
    '*B',
    // C Section
    '*C',
    // D Section
    '*D',
    // Verse
    '*V',
    // Intro
    '*i',

    // Segno
    'S',
    // Coda
    'Q',
    // Fermata
    'f'
];

/**
 * Example: T44{C |A- |N1D- |G7 } |N2D- G7 |C6 Z
 */
export const endings = [
    // First Ending
    'N1',
    // Second Ending
    'N2',
    // Third Ending
    'N3',
    // No text Ending
    'N0'
];

// eslint-disable-next-line no-unused-vars
const others = [
    // Space, todo, check how it differs from regular space ' ', it often met with 2 bar repeat
    'XyQ',
    // Arbitrary text
    /<(.*?)>/,
    // Repeat one bar
    'x',
    // 'cl' is repeat 'x', not sure why they need another marking for it
    'cl',
    // Visual space between lines
    'Y',
    // No chord (N.C)
    'n',
    // Pause
    'p',
    // todo find out what it is, often goes before chords 'lF#-7 B7' 'lA7sus' (Ahmid-6)
    'l',
    // Unknown, not reflected in chart
    'U',
    // 'K' and 'LZ' seems like both regular bar lines
    'K',
    'LZ',
    // The base same chord as before, used to mark inversion like in Butterfly
    'W'
];

// Probably iReal Pro url format version token
const prefix = '1r34LbKcu7';

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
     * @returns {T[]|*[]}
     */
    parse(url) {
        if (!url || url === '') {
            return [];
        }

        const songs = this.parseUrl(url);

        if (!songs || !songs.length) {
            return [];
        }

        return songs.filter(props => props);
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
    parseUrl(url) {
        const decodedUrl = unescape(url);
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
                return null;
            }

            if (!rawChordsStringWithPrefix.startsWith(prefix)) {
                throw new Error('Prefix is not at the beginning, find example, take chords from the next part!');
            }

            // todo there may be additional player properties: style, bpm, transpose, repeats
            const obfuscatedChordString = parts[6].split(prefix)[1];
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
        });
    }

    /**
     * They obfuscate url string for some reason
     * Big thanks to https://github.com/drs251/pyRealParser for solution
     *
     * @param chordString
     * @returns {string|*}
     */
    decrypt(chordString) {
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
     * @returns {*}
     */
    beautifyChordString(chords) {
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
            .replace(/p/g, '\\ ')
            // Each named segment should have opening bar line, it is often omitted
            .replace(/([}\]])[\s]*(\*[\w])(?![\s]*[[{|])/, '$1[$2')
            // Replace (*) if it is not a part of segment name, only acceptable segment names listed in rehearsalMarks
            .replace(/\*(?=[^ABCDiV]+)/g, '')

            .trim();
    }
}
