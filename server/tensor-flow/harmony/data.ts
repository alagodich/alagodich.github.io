/* eslint complexity: 0 */
import jazzRawData from '../../../client/components/real-book/playlists/jazz';
import IRealProUrlParser from '../../../client/components/real-book/IRealProUrlParser';
import IRealProChartModel from '../../../client/components/real-book/IRealProChartModel';
import {IIRealProChord, qualities, roots} from '../../../client/components/real-book/types';
import {default as _pick} from 'lodash/pick';

export interface IFlatHarmonyData {
    x: number;
    y: number;
}

export const maxChord = 7999;
export const minChord = 1000;
export const maxChordNumeric = 7;
export const maxChordNumericShift = 72;

// TODO check number of unique chords,
// TODO unify qualities, some of them are the same

export function prepareData(): IIRealProChord[][] {
    const parser = new IRealProUrlParser();
    const harmonies: IIRealProChord[][] = [];

    jazzRawData.forEach(urlString => {
        const songs = parser.parse(urlString);

        songs.forEach(song => {
            const chartModel = new IRealProChartModel(song);

            chartModel.segments.forEach(segment => {
                const segmentProgression: any = [];

                segment.data.forEach(row => {
                    row.harmony?.forEach(chord => {
                        let chordProps: IIRealProChord;

                        // it it is a bar repeat or the same chord with alteration we jsut use the previous chord
                        if (['x', 'W'].includes(chord.root as string)
                            && segmentProgression[segmentProgression.length - 1]) {
                            chordProps = segmentProgression[segmentProgression.length - 1];
                        } else if (roots.includes(chord.root as string)) {
                            chordProps = chord;
                        } else if (['n', 'p', 'x'].includes(chord.root as string)) {
                            // Not sure what to do with these for now
                            return;
                        } else {
                            throw new Error(`Unhandled root ${chord.root}`);
                        }

                        segmentProgression.push(_pick(chordProps, ['numeric', 'shift', 'quality']));
                    });
                });
                harmonies.push(segmentProgression);
            });
        });
    });

    return harmonies;
}

/**
 * From all chord properties: root, shift, quality, numeric, inversion, alt
 * we take only numeric, shift, quality
 * and represent each chord as a number:
 * numeric 1-7 (1 digit)
 * shift 0-2 (1 digit)
 * quality index in the qualities list 0-63 (2 digits)
 *
 * so each chord will be 4 digits
 * and normalized will look like (chord / maxChord)
 *
 * TODO for now we skip transitions between segments, probably we should not
 */
export function flattenData(preparedData: IIRealProChord[][], fields: string[] = []): IFlatHarmonyData[] {
    const harmonyData: IFlatHarmonyData[] = [];

    preparedData.forEach(segment => {
        segment.forEach((chord: IIRealProChord, index: number) => {
            if (segment[index + 1]) {
                harmonyData.push({
                    x: convertChordToDigit(chord, fields),
                    y: convertChordToDigit(segment[index + 1], fields)
                });
            } else {
                harmonyData.push({
                    x: convertChordToDigit(chord, fields),
                    y: convertChordToDigit(segment[0], fields)
                });
            }
        });
    });

    return harmonyData;
}

export function getChordsEnum(flatData: IFlatHarmonyData[]): number[] {
    const chordsEnum: number[] = [];

    flatData.forEach((change: IFlatHarmonyData) => {
        if (!chordsEnum.includes(change.x)) {
            chordsEnum.push(change.x);
        }
        if (!chordsEnum.includes(change.y)) {
            chordsEnum.push(change.y);
        }
    });

    return chordsEnum;
}

/**
 * Chord coverts to 4 digit number
 * 1 - digit is a numeric value
 * 2 - shift b = 1, # = 2, '' = 0
 * 3 - quality index number from qualities array
 */
export function convertChordToDigit(proChord: IIRealProChord, fields: string[] = []): number {
    if (!proChord.numeric || (fields.length && !fields.includes('numeric'))) {
        throw new Error(`Numeric notation required ${JSON.stringify(proChord)}`);
    }
    const chord = fields.length
        ? _pick(proChord, fields)
        : proChord;

    let chordNumberString: string = chord.numeric
        ? chord.numeric.toString()
        : '';

    if (!fields.length || fields.includes('shift')) {
        switch (chord.shift) {
            case '': {
                chordNumberString += '0';
                break;
            }
            case undefined: {
                chordNumberString += '0';
                break;
            }
            case 'b': {
                chordNumberString += '1';
                break;
            }
            case '#': {
                chordNumberString += '2';
                break;
            }
            default: {
                throw new Error(`Unrecognized shift ${chord.shift}`);
            }
        }
    }

    if (!fields.length || fields.includes('quality')) {
        if (!chord.quality || chord.quality === '') {
            chordNumberString += '00';
        } else {
            const qualityIndex = qualities.indexOf(chord.quality as string) + 1;

            if (qualityIndex === 0) {
                throw new Error(`Unrecognized chord quality ${chord.quality}`);
            } else if (qualityIndex < 10) {
                chordNumberString += '0';
            }
            chordNumberString += qualityIndex.toString();
        }
    }

    return parseInt(chordNumberString, 10);
}

export function convertDigitToChord(digitChord: number): IIRealProChord {
    const chordNumberString = digitChord.toString();
    const chord: IIRealProChord = {
        numeric: parseInt(chordNumberString[0], 10)
    };

    if (chordNumberString[1] === '1') {
        chord.shift = 'b';
    } else if (chordNumberString[1] === '2') {
        chord.shift = '#';
    }
    const qualityIndex = parseInt(chordNumberString.substring(2), 10);

    if (qualityIndex !== 0 && qualities[qualityIndex - 1]) {
        chord.quality = qualities[qualityIndex - 1];
    }
    return chord;
}

export function chordToPrintString(chord: IIRealProChord): string {
    return [chord.numeric, chord.shift, chord.quality].join('');
}

prepareData();
