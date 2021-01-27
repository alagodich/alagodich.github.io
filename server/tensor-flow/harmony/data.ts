/* eslint complexity: 0 */
import jazzRawData from '../../../client/components/real-book/playlists/jazz';
import IRealProUrlParser from '../../../client/components/real-book/IRealProUrlParser';
import IRealProChartModel from '../../../client/components/real-book/IRealProChartModel';
import {IIRealProChord, rectifiedQualitiesMap, roots, binaryChordMap} from '../../../client/components/real-book/types';
import {default as _pick} from 'lodash/pick';

export interface IFlatHarmonyData {
    x: number[];
    y: number[];
}

export type TChordWithBinaryQuality = [number, number, number[]];
export interface IFlatHarmonyDataWithBinaryChords {
    x: TChordWithBinaryQuality;
    y: TChordWithBinaryQuality;
}

export const rectifiedQualityList = Object.getOwnPropertyNames(rectifiedQualitiesMap)
    .map(quality => quality).sort();

const invertedRectifiedQualitiesMap: {[quality: string]: string} = {};

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

                        segmentProgression.push(_pick(chordProps, ['degree', 'shift', 'quality']));
                    });
                });
                harmonies.push(segmentProgression);
            });
        });
    });

    return harmonies;
}

export function getChordsEnum(flatData: IFlatHarmonyData[]): number[] {
    const chordsEnum: number[] = [];

    flatData.forEach((change: IFlatHarmonyData) => {
        const degreeValueX = parseInt(change.x.map(value => value.toString()).join(''), 10);
        const degreeValueY = parseInt(change.y.map(value => value.toString()).join(''), 10);

        if (!chordsEnum.includes(degreeValueX)) {
            chordsEnum.push(degreeValueX);
        }
        if (!chordsEnum.includes(degreeValueY)) {
            chordsEnum.push(degreeValueY);
        }
    });

    return chordsEnum;
}

/**
 * From all chord properties: root, shift, quality, degree, inversion, alt
 * we take only degree, shift, quality
 * and represent each chord as a number:
 * degree 1-7 (1 digit)
 * shift 0-2 (1 digit)
 * quality index in the qualities list 0-63 (2 digits)
 *
 * TODO for now we skip transitions between segments, probably we should not
 */
export function flattenData(preparedData: IIRealProChord[][]): IFlatHarmonyData[] {
    const harmonyData: IFlatHarmonyData[] = [];

    preparedData.forEach(segment => {
        segment.forEach((chord: IIRealProChord, index: number) => {
            if (segment[index + 1]) {
                harmonyData.push({
                    x: convertChordToDigit(chord),
                    y: convertChordToDigit(segment[index + 1])
                });
            } else {
                harmonyData.push({
                    x: convertChordToDigit(chord),
                    y: convertChordToDigit(segment[0])
                });
            }
        });
    });

    return harmonyData;
}

/**
 * Chord coverts to 4 digit number
 * 1 - digit is a degree value
 * 2 - shift b = 1, # = 2, '' = 0
 * 3 - quality index number from qualities array
 */
export function convertChordToDigit(chord: IIRealProChord): number[] {
    if (!chord.degree) {
        throw new Error(`Degree notation required ${JSON.stringify(chord)}`);
    }

    if (!chord.degree || chord.degree > 7 || chord.degree < 1) {
        throw new Error(`Impossible degree ${JSON.stringify(chord)}`);
    }

    const chordInDigits: number[] = [chord.degree - 1 as number];

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

    return chordInDigits;
}

export function convertDigitToChord(digitChord: number[]): IIRealProChord {
    if (digitChord[0] > 6 || digitChord[0] < 0) {
        throw new Error(`Impossible degree ${JSON.stringify(digitChord)}`);
    }

    const chord: IIRealProChord = {
        degree: digitChord[0] + 1
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

export function flattenDataWithBinaryChords(preparedData: IIRealProChord[][]): IFlatHarmonyDataWithBinaryChords[] {
    const harmonyData: IFlatHarmonyDataWithBinaryChords[] = [];

    preparedData.forEach(segment => {
        segment.forEach((chord: IIRealProChord, index: number) => {
            if (segment[index + 1]) {
                harmonyData.push({
                    x: convertChordToDigitWithBinaryQuality(chord),
                    y: convertChordToDigitWithBinaryQuality(segment[index + 1])
                });
            } else {
                harmonyData.push({
                    x: convertChordToDigitWithBinaryQuality(chord),
                    y: convertChordToDigitWithBinaryQuality(segment[0])
                });
            }
        });
    });

    return harmonyData;
}

export function convertChordToDigitWithBinaryQuality(chord: IIRealProChord): TChordWithBinaryQuality {
    if (!chord.degree) {
        throw new Error(`Chord Degree required ${JSON.stringify(chord)}`);
    }

    if (!chord.degree || chord.degree > 7 || chord.degree < 1) {
        throw new Error(`Impossible degree ${JSON.stringify(chord)}`);
    }

    const degree = chord.degree - 1;
    let shift: number;
    let quality: number[];

    switch (chord.shift) {
        case '': {
            shift = 0;
            break;
        }
        case undefined: {
            shift = 0;
            break;
        }
        case 'b': {
            shift = 1;
            break;
        }
        case '#': {
            shift = 2;
            break;
        }
        default: {
            throw new Error(`Unrecognized shift ${chord.shift}`);
        }
    }

    if (!chord.quality || chord.quality === '') {
        // If quality not set, pick default 5 chord, major triad
        quality = binaryChordMap['5'];
    } else {
        const binaryQuality = binaryChordMap[chord.quality];

        if (!binaryQuality) {
            throw new Error(`Unrecognized chord binary quality ${chord.quality}`);
        }
        quality = binaryQuality;
    }

    return [degree, shift, quality];
}

export function convertDigitWithBinaryQualityToChord(digitChord: TChordWithBinaryQuality): IIRealProChord {
    if (digitChord[0] > 6 || digitChord[0] < 0) {
        throw new Error(`Impossible degree ${JSON.stringify(digitChord)}`);
    }

    const chord: IIRealProChord = {
        degree: digitChord[0] + 1
    };

    if (digitChord[1] === 1) {
        chord.shift = 'b';
    } else if (digitChord[1] === 2) {
        chord.shift = '#';
    }

    Object.getOwnPropertyNames(binaryChordMap).some((qualityKey: string) => {
        if (binaryChordMap[qualityKey].join('') === digitChord[2].join('')) {
            chord.quality = qualityKey;
            return true;
        }
        return false;
    });

    return chord;
}
