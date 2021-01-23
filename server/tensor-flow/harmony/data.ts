/* eslint complexity: 0 */
import jazzRawData from '../../../client/components/real-book/playlists/jazz';
import IRealProUrlParser from '../../../client/components/real-book/IRealProUrlParser';
import IRealProChartModel from '../../../client/components/real-book/IRealProChartModel';
import {IIRealProChord, rectifiedQualitiesMap, roots} from '../../../client/components/real-book/types';
import {default as _pick} from 'lodash/pick';

export interface IFlatHarmonyData {
    x: number[];
    y: number[];
}

export const maxChord = 7999;
export const minChord = 1000;
export const maxChordNumeric = 7;

// The biggest feature is a chord quality
export const maxFeatureDepth = 14;

const invertedRectifiedQualitiesMap: {[quality: string]: string} = {};
const rectifiedQualityList = Object.getOwnPropertyNames(rectifiedQualitiesMap).map(quality => quality).sort();

Object.getOwnPropertyNames(rectifiedQualitiesMap).forEach((quality: string) => {
    invertedRectifiedQualitiesMap[quality] = quality;
    rectifiedQualitiesMap[quality].forEach((substitution: string) => {
        invertedRectifiedQualitiesMap[substitution] = quality;
    });
});

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

                        if (['x', 'W'].includes(chord.root as string)
                            && segmentProgression[segmentProgression.length - 1]) {
                            // Should staying on the same chord be taken into account?
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
        const numericValueX = parseInt(change.x.map(value => value.toString()).join(''), 10);
        const numericValueY = parseInt(change.y.map(value => value.toString()).join(''), 10);

        if (!chordsEnum.includes(numericValueX)) {
            chordsEnum.push(numericValueX);
        }
        if (!chordsEnum.includes(numericValueY)) {
            chordsEnum.push(numericValueY);
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
export function convertChordToDigit(proChord: IIRealProChord, fields: string[] = []): number[] {
    if (!proChord.numeric || (fields.length && !fields.includes('numeric'))) {
        throw new Error(`Numeric notation required ${JSON.stringify(proChord)}`);
    }
    const chord = fields.length
        ? _pick(proChord, fields)
        : proChord;

    const chordInDigits: number[] = [chord.numeric as number];

    if (!fields.length || fields.includes('shift')) {
        switch (chord.shift) {
            case '': {
                chordInDigits.push(0);
                break;
            }
            case undefined: {
                chordInDigits.push(0);
                break;
            }
            case 'b': {
                chordInDigits.push(1);
                break;
            }
            case '#': {
                chordInDigits.push(2);
                break;
            }
            default: {
                throw new Error(`Unrecognized shift ${chord.shift}`);
            }
        }
    }

    if (!fields.length || fields.includes('quality')) {
        if (!chord.quality || chord.quality === '') {
            chordInDigits.push(0);
        } else {
            const rectifiedIndex = invertedRectifiedQualitiesMap[chord.quality];
            // + 1 to reserve 0 index for chord with no quality
            const qualityIndex = rectifiedQualityList.indexOf(rectifiedIndex) + 1;

            if (qualityIndex === 0) {
                throw new Error(`Unrecognized chord quality ${chord.quality}`);
            }

            chordInDigits.push(qualityIndex);
        }
    }

    return chordInDigits;
}

export function convertDigitToChord(digitChord: number[]): IIRealProChord {
    const chord: IIRealProChord = {
        numeric: digitChord[0]
    };

    if (digitChord[1] === 1) {
        chord.shift = 'b';
    } else if (digitChord[1] === 2) {
        chord.shift = '#';
    }
    const qualityIndex = digitChord[2];

    if (qualityIndex !== 0 && rectifiedQualityList[qualityIndex - 1]) {
        chord.quality = rectifiedQualityList[qualityIndex - 1];
    }
    return chord;
}

prepareData();
