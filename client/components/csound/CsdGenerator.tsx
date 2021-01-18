import {IIRealProChord} from '../real-book/types';

const major: IChordPitchList = [7.0, 7.02, 7.04, 7.05, 7.07, 7.09, 7.11];
const minor: IChordPitchList = [7.0, 7.02, 7.03, 7.05, 7.07, 7.08, 7.10];
const dominant: IChordPitchList = [7.0, 7.02, 7.04, 7.05, 7.07, 7.09, 7.10];

type IChordPitchList = number[];

export default class CsdGenerator {
    private options: string[] = [];
    private instruments: string[] = [];
    private score: string[] = [
        'f 1 0 16384 10 1 1 1 1'
    ];
    private isMajor = true;

    public setIsMajor(isMajor: boolean): void {
        this.isMajor = isMajor;
    }

    public setOptions(options: string[]): void {
        this.options = options;
    }

    public setScore(cso: string[]): void {
        this.score = cso;
    }

    public addScoreLine(line: string): void {
        this.score.push(line);
    }

    public addChord(chord: IIRealProChord, start: number, length: number): void {
        // TODO handle #/b
        let pitches: IChordPitchList = [];

        if (!chord.numeric) {
            throw new Error('Need numeric notation to generate a chord pitch.');
        }

        switch (chord.quality) {
            case '^':
                pitches = major;
                break;
            case '-7':
                pitches = minor;
                break;
            case '7':
                pitches = dominant;
                break;
            default:
                throw new Error(`Don't know pitches for ${chord.quality}`);
        }

        const pitchShift = this.isMajor
            ? parseFloat((major[chord.numeric - 1] - 7).toString()).toPrecision(1)
            : parseFloat((minor[chord.numeric - 1] - 7).toString()).toPrecision(1);

        pitches.forEach((pitch, index) => {
            if ([0, 2, 4, 6].includes(index)) {
                this.addScoreLine(`i 1 ${start} ${length} ${pitch} ${pitchShift}`);
            }
        });
        this.addScoreLine('');
    }

    public setInstruments(instruments: string[]): void {
        this.instruments = instruments;
    }

    public useDefaultInstruments(): void {
        this.instruments = [
            'sr=44100',
            'ksmps=32',
            '0dbfs=1',
            'nchnls=2',
            'instr 1',
            'ipch = p4',
            'icps = cpspch(ipch+p5)',
            'asig oscil 0.3, icps, 1',
            'outs  asig, asig',
            'endin'
        ];
    }

    public compile(): string {
        return `
            <CsoundSynthesizer>
            <CsOptions>
            ${this.options.join('\n')}
            </CsOptions>
            <CsInstruments>
            ${this.instruments.join('\n')}
            </CsInstruments>
            <CsScore>
            ${this.score.join('\n')}
            </CsScore>
            </CsoundSynthesizer>
        `;
    }
}
