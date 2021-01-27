import {IIRealProChord, qualityStepsMap, majorScale, minorScale} from '../real-book/types';

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
        // TODO handle #/bCsdGenerator.tsx
        let pitches: IChordPitchList = [];

        if (!chord.degree) {
            throw new Error('Need chord degree to generate a chord pitch.');
        }

        const quality = chord.quality;

        if (!quality) {
            pitches = qualityStepsMap['^'];
        } else if (qualityStepsMap[quality]) {
            pitches = qualityStepsMap[quality];
        } else {
            throw new Error(`Don't know pitches for ${quality}`);
        }

        const pitchShift = this.isMajor
            ? parseFloat((majorScale[chord.degree - 1] - 7).toString()).toPrecision(1)
            : parseFloat((minorScale[chord.degree - 1] - 7).toString()).toPrecision(1);

        pitches.forEach((pitch: number) => {
            this.addScoreLine(`i 1 ${start} ${length} ${pitch} ${pitchShift}`);
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
