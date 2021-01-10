export const barLines = [
    //single bar line
    '|',
    //opening double bar line
    '[',
    //closing double bar line
    ']',
    //opening repeat bar line
    '{',
    //closing repeat bar line
    '}',
    //Final thick double bar line
    'Z',
];

export const timeSignatures = {
    'T44': '4 / 4',
    'T34': '3 / 4',
    'T24': '2 / 4',
    'T54': '5 / 4',
    'T64': '6 / 4',
    'T74': '7 / 4',
    'T22': '2 / 2',
    'T32': '3 / 2',
    'T58': '5 / 8',
    'T68': '6 / 8',
    'T78': '7 / 8',
    'T98': '9 / 8',
    'T12': '12 / 8'
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

// What is this prefix?
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
                console.log('parts[2] found!!', parts[2]);
            }

            const rawChordsStringWithPrefix = parts[6];

            if (!rawChordsStringWithPrefix) {
                return null;
            }

            if (!rawChordsStringWithPrefix.startsWith(prefix)) {
                console.log('Prefix is not at the beginning, find example, take chords from the next part!');
                console.log('It must be transpose value');
            }

            // todo there may be additional player properties: style, bpm, transpose, repeats

            const obfuscatedChordString = parts[6].split(prefix)[1];
            const decryptedCordString = this.decrypt(obfuscatedChordString);
            const chordString = this.beautifyChordString(decryptedCordString);

            return {
                title: parts[0],
                author: parts[1],
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

        const decryptedChunks = chunks.map((chunk, index) => {
            if (chunk.length < 50) {
                // console.log('chunk length < 50, returning as is');
                return chunk;
            }
            if (index === chunks.length - 2 && chunks[chunks.length - 1].length < 2) {
                // console.log('Last chunk is too short, returning before last as is.');
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
        // TODO check for empty spaces, need them to recognize chords not from the start of the bar
        return chords
            // Bar lines
            .replace(/LZ|K/g, '|')
            // Repeat cord = x
            .replace(/cl/g, 'x')
            // Remove stars, todo what are those stars?
            // .replace(/\*\s*\*/g, '')
            // No chord symbol Example: |C7ppF7|, watch p symbol!
            // .replace(/[np]/g, 'n')
            // Remove multiple vertical spaces
            .replace(/Y+/g, 'Y')
            // Transform empty characters to spaces
            .replace(/XyQ|,/g, ' ')
            // Remove empty measures
            .replace(/\|\s*\|/g, ' ')
            // Remove spaces behind bar lines
            .replace(/\|\s+/g, '|')
            // Remove multiple whitespaces
            .replace(/\s+/g, ' ')
            // remove small sign for small chords rendering
            .replace(/(?<!su)s(?!us)/g, '')
            // remove section markers
            // .replace(/\*\w/g, '')
            // remove time signatures
            // .replace(/T\d\d/g, '')
            // remove l and f
            // .replace(/[lf]/g, '')
            // remove annotations
            .replace(/<.*?>/g, '')
            .trim();
    }
}
