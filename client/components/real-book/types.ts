export interface IIRealProChartModelProps {
    id?: number;
    title: string;
    author: string;
    style: string;
    key: string;
    chordString: string;
}

export interface IIRealProChartSegment {
    name: string;
    data: IIRealProChartBar[];
    lines?: IIRealProChartBar[][];
}

export interface IIRealProChartBar {
    chords?: string;
    openingLine?: string;
    closingLine?: string;
    ending?: string;
    timeSignature?: string;
    divider?: string;
    coda?: boolean;
    fermata?: boolean;
    segno?: boolean;
    harmony?: IIRealProChord[];
}

export interface IIRealProChord {
    root: string;
    shift: string;
    quality: string;
    inversion: string;
    numeric: number;
    alt?: IIRealProChord;
}

export const chordsStringExpresion = /([A-GxnpW]?)([b#]?)([+\-^\dhob#sualt]*)(\/[A-G][#b]?)?(\(.*)?/;

export const closingBarLines: { [index: string]: string } = {
    ']': '[',
    '}': '{'
};

export const roots = [
    'C',
    'D',
    'E',
    'F',
    'G',
    'A',
    'B'
];

export const qualities = [
    '5',
    '2',
    'add9',
    '+',
    'o',
    'h',
    'sus',
    '^',
    '-',
    '^7',
    '-7',
    '7',
    '7sus',
    'h7',
    'o7',
    '^9',
    '^13',
    '6',
    '69',
    '^7#11',
    '^9#11',
    '^7#5',
    '-6',
    '-69',
    '-^7',
    '-^9',
    '-9',
    '-11',
    '-7b5',
    'h9',
    '-b6',
    '-#5',
    '9',
    '7b9',
    '7#9',
    '7#11',
    '7b5',
    '7#5',
    '9#11',
    '9b5',
    '9#5',
    '7b13',
    '7#9#5',
    '7#9b5',
    '7#9#11',
    '7b9#11',
    '7b9b5',
    '7b9#5',
    '7b9#9',
    '7b9b13',
    '7alt',
    '13',
    '13#11',
    '13b9',
    '13#9',
    '7b9sus',
    '7susadd3',
    '9sus',
    '13sus',
    '7b13sus',
    '11'
];

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

export const timeSignatures: {[index: string]: string} = {
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

export const otherSymbols = [
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
export const iRealProUrlFormatVersionPrefix = '1r34LbKcu7';
