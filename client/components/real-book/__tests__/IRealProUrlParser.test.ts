/* eslint max-len: 0 */

import IRealProUrlParser from '../IRealProUrlParser';

describe('IRealProUrlParser', () => {

    describe('parse', () => {
        it('should init empty', () => {
            const parser = new IRealProUrlParser();

            expect(parser.parse('')).toEqual([]);
        });
        it('should handle single song', () => {
            const url = 'irealb://%41%69%6E%27%74%20%4D%69%73%62%65%68%61%76%69%6E%27=%57%61%6C%6C%65%72%20%46%61%74%73==%4D%65%64%69%75%6D%20%53%77%69%6E%67=%43==%31%72%33%34%4C%62%4B%63%75%37%37%2D%44%5A%4C%34%43%36%20%41%36%43%5A%4C%36%2D%46%20%36%46%5A%4C%45%2F%43%37%20%36%43%5A%4C%37%47%20%37%2D%44%5A%4C%37%2F%45%20%41%37%34%54%7B%41%2A%5B%42%2A%5D%20%4E%31%45%37%20%5A%4C%36%2D%46%20%36%43%32%4E%5A%4C%20%51%58%79%51%79%58%7D%20%37%47%20%37%44%5A%4C%37%41%43%36%20%45%37%5A%4C%37%47%20%47%20%37%44%5A%7C%46%37%58%79%47%5A%4C%37%44%20%37%2D%41%5A%4C%37%45%20%47%36%7C%51%79%58%37%41%7C%51%79%58%37%44%7C%51%36%20%41%37%4C%51%79%58%2D%41%37%2D%44%5A%4C%5B%43%36%20%41%36%43%5A%4C%36%2D%46%20%36%46%5A%4C%45%2F%43%37%20%36%43%5A%4C%37%47%20%37%2D%44%5A%4C%37%2F%45%20%41%37%41%2A%5D%20%37%20%47%37%4C%5A%43%36%20%41%2D%37%4C%5A%44%2D%37%20%47%37%20%5A==%30=%30===';
            const parser = new IRealProUrlParser();

            expect(parser.parse(url)).toEqual([
                {
                    title: "Ain't Misbehavin'",
                    author: 'Fats Waller',
                    style: 'Medium Swing',
                    key: 'C',
                    chordString: '*A{T44C6 A7|D-7 G7|C6 C7/E|F6 F-6|C6/E A7|D-7 G7|N1E7 A7|D7 G7 } |N2C6 F-6|C6 E7 ]*B[A- |F7 |D7 |A7 |G6 E7|A-7 D7|G6 A7|D7 G7 ]*A[C6 A7|D-7 G7|C6 C7/E|F6 F-6|C6/E A7|D-7 G7|C6 A-7|D-7 G7 Z'
                }
            ]);
        });
        it('should handle multiple songs', () => {
            const multipleSongsUrl = 'irealb://%4D%65%6C%69%73%73%61=%42%72%6F%74%68%65%72%73%20%41%6C%6C%6D%61%6E==%52%6F%63%6B%20%50%6F%70=%45==%31%72%33%34%4C%62%4B%63%75%37%51%79%58%2D%23%79%51%7C%46%23%2D%23%46%7C%51%79%58%45%41%2A%5B%7C%51%79%2D%58%23%46%7C%51%79%58%2D%23%47%7C%51%79%58%2D%58%79%51%7C%47%58%45%69%2A%7B%51%79%58%43%5A%79%51%7C%45%58%47%5A%4C%2D%23%46%20%45%5A%4C%44%20%2D%23%5A%43%4C%42%20%41%7C%51%79%58%2D%23%46%7C%51%79%23%2D%20%41%4C%58%2D%23%46%7C%58%41%7C%51%79%51%7D%7C%2A%69%58%45%42%2A%7C%51%79%58%2D%23%46%7C%51%79%2D%58%23%47%7C%51%79%58%2D%23%46%7C%51%79%58%45%79%51%7C%44%58%79%58%42%66%7C%58%2D%23%47%7C%79%51%7C%43%23%46%7C%51%79%58%45%41%2A%5B%7C%51%79%58%42%7C%66%51%79%58%42%7C%51%79%58%41%7C%51%79%58%2D%23%2D%58%79%51%58%42%7C%51%79%58%43%5A%4C%41%2D%58%79%51%7C%4C%2D%23%46%20%45%5A%4C%44%20%2D%23%43%5A%42%4C%20%41%7C%51%79%58%2D%23%46%7C%51%79%58%45%5A%47%23%2D%20%23%46%7C%51%79%23%47%7C%51%79%58%79%51%7D%7C%51%79%58%45%69%2A%7B%7C%51%79%58%42%66%7C%79%51%58%43%7C%51%79%58%2D%23%46%7C%51%79%58%45%7C%46%23%2D%58%42%66%7C%51%79%2D%58%79%51%7C%46%23%2D%58%79%51%7D%20=%50%6F%70%2D%52%6F%63%6B=%39%31=%31===%48%6F%6E%65%79%73%75%63%6B%6C%65%20%52%6F%73%65=%57%61%6C%6C%65%72%20%46%61%74%73==%55%70%20%54%65%6D%70%6F%20%53%77%69%6E%67=%46==%31%72%33%34%4C%62%4B%63%75%37%36%62%42%5A%4C%34%47%2D%37%20%36%46%5A%4C%37%43%20%37%2D%47%5A%4C%37%43%37%20%2D%47%5A%4C%37%43%20%37%2D%47%5A%4C%37%43%20%46%37%2F%41%34%54%7B%41%2A%37%46%5B%42%2A%4E%31%46%36%20%4B%51%79%58%36%46%32%4E%5A%4C%20%51%79%58%79%51%58%7D%20%37%44%20%37%2D%41%5A%4C%37%62%42%63%6C%20%20%5D%5A%4C%37%43%20%20%37%2D%47%5B%6C%20%4C%5A%42%6C%63%4B%51%79%58%37%43%5A%4C%20%6C%63%4B%79%51%58%37%47%5A%4C%20%6C%63%4B%51%79%58%36%62%20%20%5D%2A%41%63%4B%51%79%58%42%20%36%46%55%2D%37%20%43%37%36%62%42%5A%4C%41%2F%37%46%20%36%46%5A%4C%43%37%20%37%2D%47%5A%4C%37%43%20%37%2D%47%5A%4C%20%43%37%4C%5A%47%5A%4C%37%43%62%37%4C%5A%41%2D%37%20%44%37%20%5A==%30=%31%30===%53%74%65%76%65%20%53%68%75%72';
            const parser = new IRealProUrlParser();

            expect(parser.parse(multipleSongsUrl)).toEqual([
                {
                    title: 'Melissa',
                    author: 'Allman Brothers',
                    style: 'Rock Pop',
                    key: 'E',
                    chordString: '{*iE |F#- |G#- |F#- |[*AE |F#- |G#- |F#- |E |F#- |A B|C#- D|E F#-|G#- A|C |fB }|*iE |F#- |G#- |F#- |*BE |D |A |B |C#- |A |B |fB |[*AE |F#- |G#- |F#- |E |F#- |A B|C#- D|E F#-|G#- A|C |fB }|E |F#- |C |fB |{*iE |F#- |G#- |F#- }'
                },
                {
                    title: 'Honeysuckle Rose',
                    author: 'Fats Waller',
                    style: 'Up Tempo Swing',
                    key: 'F',
                    chordString: '*A{T44G-7 C7|G-7 C7|G-7 C7|G-7 C7|F6 F7/A|Bb6 C7|N1F6 Bb7|A-7 D7 } |N2F6 |x ]*B[F7 |x |Bb6 |x |G7 |x |C7 |x ]*A[G-7 C7|G-7 C7|G-7 C7|G-7 C7|F6 F7/A|Bb6 C7|F6 Bb7|A-7 D7 Z'
                }
            ]);
        });
        it('should handle song with repeats (r), The African Queen', () => {
            const songWithRepeats = 'irealb://%41%66%72%69%63%61%6E%20%51%75%65%65%6E%2C%20%54%68%65=%53%69%6C%76%65%72%20%48%6F%72%61%63%65==%4C%61%74%69%6E=%43%2D==%31%72%33%34%4C%62%4B%63%75%37%7C%72%51%79%58%34%43%2D%39%20%5A%4C%39%62%44%20%2C%39%2D%43%5A%4C%51%79%7C%58%72%51%79%58%5A%4C%20%78%20%5A%4C%39%62%44%20%78%20%4C%5A%34%54%41%2A%5B%51%79%58%5A%4C%5B%2A%41%43%2D%39%62%44%20%2C%39%2D%43%5A%4C%51%79%58%7C%51%72%79%58%5A%4C%20%78%20%5A%4C%39%62%44%20%39%4C%5A%20%78%20%5D%20%51%79%58%5A%4C%39%62%44%20%5D%5B%2A%42%5A%4C%20%78%20%5A%4C%39%62%44%20%39%2D%43%4C%5A%37%47%20%37%62%41%5A%4C%37%41%20%37%62%42%43%2D%39%2C%20%51%79%58%7C%72%20%78%20%20%5A%20==%30=%30===';

            const parser = new IRealProUrlParser();

            expect(parser.parse(songWithRepeats)).toEqual([
                {
                    title: 'African Queen, The',
                    author: 'Horace Silver',
                    style: 'Latin',
                    key: 'C-',
                    chordString: '[*AT44C-9 Db9|x |r|C-9 Db9|x |r|][*AC-9 Db9|x |r|C-9 Db9|x |r|][*BBb7 A7|Ab7 G7|C-9 Db9|x |C-9 Db9|x Z'
                }
            ]);
        });
        it('should handle All Blues', () => {
            const songWithRepeats = 'irealb://%41%6C%6C%20%42%6C%75%65%73=%44%61%76%69%73%20%4D%69%6C%65%73==%57%61%6C%74%7A=%47==%31%72%33%34%4C%62%4B%63%75%37%47%2F%37%43%5A%37%58%79%51%4B%4C%20%78%20%5A%4C%20%6C%63%4B%51%79%58%37%5A%47%4C%20%78%20%5A%4C%20%78%20%5A%4C%20%6C%63%5A%20%78%20%4C%47%34%33%54%5B%63%4B%51%79%58%6C%20%4C%5A%20%4C%20%78%20%5A%4C%20%78%20%5A%4C%20%6C%63%51%4B%79%58%37%47%7C%5A%4C%20%78%20%5A%4C%20%78%5A%44%37%23%39%63%4B%51%79%58%6C%20%4C%5A%45%62%37%23%39%58%79%51%7C%44%37%23%39%58%79%51%7C%47%37%58%79%51%4B%63%6C%20%4C%5A%20%78%20%4C%5A%20%78%20%20%5A==%30=%30===';

            const parser = new IRealProUrlParser();

            expect(parser.parse(songWithRepeats)).toEqual([
                {
                    title: 'All Blues',
                    author: 'Miles Davis',
                    style: 'Waltz',
                    key: 'G',
                    chordString: '[T34G7 |x |x |x |G7 |x |x |x |C7/G |x |x |x |G7 |x |x |x |D7#9 |x |Eb7#9 |D7#9 |G7 |x |x |x Z'
                }
            ]);
        });
        it('should handle 9.20 Special and remove (l) sign, i do not know what it is', () => {
            const songWithRepeats = 'irealb://%39%2E%32%30%20%53%70%65%63%69%61%6C=%57%61%72%72%65%6E%20%45%61%72%6C==%4D%65%64%69%75%6D%20%53%77%69%6E%67=%43==%31%72%33%34%4C%62%4B%63%75%37%41%2C%37%62%42%34%43%39%2C%58%2C%62%42%7C%51%79%58%36%2D%62%45%7C%51%79%2C%58%39%43%7C%51%79%58%2C%36%2D%62%45%7C%51%79%58%79%51%7C%73%34%54%41%2A%7B%2C%39%43%6C%32%2C%47%37%7C%4E%79%58%51%79%58%7D%37%47%2C%37%62%41%73%20%39%2C%43%5A%4C%2C%37%6F%23%46%20%2C%39%43%6C%31%51%20%4C%5A%4E%37%62%41%2C%37%20%6C%63%4B%51%4C%5A%6C%43%39%45%5A%4C%36%62%45%20%2C%62%45%7C%51%79%58%62%2C%42%6C%42%2A%5B%5D%62%42%2C%37%46%73%20%2C%62%36%2C%58%79%37%6F%23%46%20%43%7C%51%79%58%58%79%51%7C%46%7C%51%79%58%2C%39%43%41%2A%5B%5D%20%37%46%20%20%7C%51%79%58%2C%39%46%5A%4C%2C%36%46%20%2C%45%62%2D%36%2C%2C%39%47%5A%4C%73%7C%2C%20%37%7C%45%62%2D%36%39%43%6C%7C%37%47%2C%37%62%41%2C%37%41%2C%62%37%42%73%7C%51%79%58%2C%62%42%7C%51%79%58%2C%2C%20%46%23%6F%51%79%58%2C%39%43%36%2C%46%37%2C%42%62%2C%44%39%5A%20==%30=%30===';

            const parser = new IRealProUrlParser();

            expect(parser.parse(songWithRepeats)).toEqual([
                {
                    title: '9.20 Special',
                    author: 'Earl Warren',
                    style: 'Medium Swing',
                    key: 'C',
                    chordString: '{*AT44C9 |Eb-6 |C9 |Eb-6 |Bb |Bb7 A7 Ab7 G7|N1 C9 F#o7 |C9 Ab7 G7} |N2 C9 F#o7|C9 F7 Bb][*B Bb |Eb Eb6|Eb6 |x |G9 |F F6 |F9 |F7 ][*AC9 |Eb-6 |C9 |Eb-6 |Bb |Bb7 A7 Ab7 G7|C9 F#o7 |C6 F7 Bb D9Z'
                }
            ]);
        });
        it('should handle Agua De Beber and keep (alt) string', () => {
            const songWithRepeats = 'irealb://%41%67%75%61%20%44%65%20%42%65%62%65%72=%4A%6F%62%69%6D%20%41%6E%74%6F%6E%69%6F%2D%43%61%72%6C%6F%73==%42%6F%73%73%61%20%4E%6F%76%61=%44%2D==%31%72%33%34%4C%62%4B%63%75%37%51%79%58%37%2D%34%44%2D%37%58%62%37%41%20%39%23%37%45%7C%51%79%58%37%2D%5A%44%4C%33%31%62%37%41%20%39%23%37%45%7C%51%79%31%33%4C%5A%44%34%54%7B%69%2A%37%47%7C%51%79%58%79%51%7C%44%51%79%58%74%6C%61%37%41%7C%51%79%58%39%62%45%37%5B%41%2A%7D%20%20%6C%63%4B%51%79%58%37%2D%7C%44%2D%37%58%37%5E%62%42%7C%2F%37%46%5A%4C%2D%37%58%79%51%37%2D%44%5A%4C%37%62%45%20%37%45%5A%4C%20%63%6C%4B%51%79%58%37%5E%46%7C%51%79%58%37%43%7C%20%44%62%6F%37%47%7C%51%79%58%5B%42%2A%5D%51%45%37%23%39%2F%44%7C%51%79%58%37%2D%44%7C%51%79%58%73%75%37%73%41%7C%51%79%58%39%62%37%45%7C%51%79%58%42%37%62%39%58%79%7C%51%79%58%43%37%41%7C%51%79%7C%47%2D%37%58%51%79%58%37%2D%47%7C%51%79%58%37%47%7C%51%58%79%39%62%37%44%7C%51%79%58%37%2D%44%7C%51%79%7C%44%2D%37%58%51%79%58%37%47%2D%44%5A%4C%33%51%5D%2A%43%5B%39%23%37%45%7C%51%79%58%37%2D%44%5A%4C%33%62%31%37%41%20%39%23%37%45%7C%51%79%58%37%2D%44%20%41%37%62%31%79%58%33%31%62%37%58%79%51%7C%42%62%5E%37%58%79%51%7C%44%2D%37%58%79%51%4B%63%6C%20%20%5A==%30=%30===';

            const parser = new IRealProUrlParser();

            expect(parser.parse(songWithRepeats)).toEqual([
                {
                    title: 'Agua De Beber',
                    author: 'Antonio-Carlos Jobim',
                    style: 'Bossa Nova',
                    key: 'D-',
                    chordString: '*i{T44D-7 |E7#9 A7b13|D-7 |E7#9 A7b13|D-7 |Bb^7 |D-7 |x }*A[E7b9 |A7alt |D-7 |G7 |G-7 |C7 |F^7 |x |E7 Eb7|D-7 Dbo7|F7/C |E7#9/B |E7b9 |A7sus |D-7 |D7b9 ]*B[G7 |G-7 |D-7 |D7b9 |G7 |G-7 |D-7 |A7b13 ]*C[D-7 |E7#9 A7b13|D-7 |E7#9 A7b13|D-7 |Bb^7 |D-7 |x Z'
                }
            ]);
        });
        it('should handle Airegin and keep (x) separated from chords, when x alone with alternative chord in bar', () => {
            const songWithRepeats = 'irealb://%41%69%72%65%67%69%6E=%52%6F%6C%6C%69%6E%73%20%53%6F%6E%6E%79==%55%70%20%54%65%6D%70%6F%20%53%77%69%6E%67=%46%2D==%31%72%33%34%4C%62%4B%63%75%37%58%35%62%39%23%34%46%2D%58%79%58%2D%62%42%7C%51%79%58%39%62%37%46%7C%51%58%79%2D%46%7C%51%79%58%35%62%39%23%37%43%7C%51%79%51%7C%46%37%34%54%5B%41%2A%79%58%37%5E%43%2D%58%79%51%7C%37%2D%44%7C%51%79%58%29%37%2D%62%42%28%37%62%5E%44%5B%42%2A%5D%20%20%78%29%37%62%42%28%20%20%47%37%4C%5A%62%42%7C%51%79%62%45%7C%51%79%37%20%46%23%37%5A%4C%20%6C%63%4B%51%79%58%37%5E%62%42%5A%37%4C%46%20%37%2D%43%7C%51%79%58%37%5E%42%5A%4C%42%62%2D%37%58%2D%23%43%7C%51%37%46%7C%51%79%41%62%5E%37%58%79%58%35%62%39%23%37%43%7C%51%79%58%2D%46%41%5B%2A%5D%20%39%62%37%43%20%37%68%47%7C%51%79%51%7C%46%2D%58%7C%51%79%58%37%62%42%28%37%5E%7C%42%62%2D%58%5D%20%20%78%29%37%62%42%28%20%7C%51%79%58%62%2D%42%7C%51%79%58%35%62%39%23%37%46%7C%51%79%2A%43%5B%44%62%51%79%58%39%62%79%58%37%5E%62%51%7C%44%2D%37%58%37%62%45%7C%51%79%58%37%2D%62%42%7C%51%58%79%37%46%7C%51%79%58%37%68%43%5A%4C%37%47%20%79%51%7C%55%41%79%58%29%37%2D%51%7C%47%68%37%20%43%37%62%39%20%5A==%30=%30===';

            const parser = new IRealProUrlParser();

            expect(parser.parse(songWithRepeats)).toEqual([
                {
                    title: 'Airegin',
                    author: 'Sonny Rollins',
                    style: 'Up Tempo Swing',
                    key: 'F-',
                    chordString: '*A[T44F- |C7#9b5 |F- |F7b9 |Bb- |F7#9b5 |Bb- |(Bb7) x ]*B[Db^7(Bb-7) |D-7 G7|C^7 |C#-7 F#7|B^7 |C-7 F7|Bb^7 |x |Bb-7 |Eb7 |Ab^7 |Gh7 C7b9 ]*A[F- |C7#9b5 |F- |F7b9 |Bb- |F7#9b5 |Bb- |(Bb7) x ]*C[Db^7(Bb-7) |D-7 G7|Ch7 |F7 |Bb-7 |Eb7 |Ab^7 |Gh7 C7b9 Z'
                }
            ]);
        });
        it('should handle Airmail Special with Segno symbol (s) and misplaced closing bar', () => {
            const songWithRepeats = 'irealb://%41%69%72%6D%61%69%6C%20%53%70%65%63%69%61%6C=%43%68%72%69%73%74%69%61%6E%20%43%68%61%72%6C%69%65==%4D%65%64%69%75%6D%20%55%70%20%53%77%69%6E%67=%43==%31%72%33%34%4C%62%4B%63%75%37%51%79%58%5A%4C%34%3C%2A%36%35%51%79%58%5A%4C%51%79%58%7C%72%51%79%58%5A%20%4C%6C%63%4B%51%79%58%36%43%3E%64%61%65%48%20%72%7C%58%79%51%34%54%69%2A%5B%37%62%41%7C%51%20%5D%5B%43%6F%42%5A%4C%37%6F%42%20%37%6F%43%5A%4C%51%79%7C%58%72%51%79%58%5A%4C%20%6C%63%4B%51%79%58%37%62%6F%37%58%79%51%79%58%7C%72%6C%6F%53%3C%53%37%58%79%51%5D%79%58%51%79%58%51%79%58%51%79%58%51%79%58%41%3E%42%41%41%20%3A%6D%72%6F%46%20%38%31%2A%3C%51%20%7B%2A%41%47%7C%51%79%58%20%43%7C%51%79%43%2F%45%4C%5A%4C%37%6F%23%46%20%46%5A%4C%37%43%20%43%5A%47%4C%20%46%5A%4C%45%2F%43%20%43%5A%4C%47%20%46%5A%43%2F%47%58%20%43%3E%73%6F%51%79%58%37%6F%3E%20%20%7D%5B%6F%42%20%37%6F%43%5A%4C%51%79%58%7C%72%51%58%79%5A%4C%20%6C%63%4B%51%79%58%37%6F%43%42%2A%37%4C%5A%42%62%65%6E%69%46%3C%7C%41%62%37%58%79%51%7C%3C%44%2E%53%2E%20%61%6C%20%46%69%6E%65%3E%47%37%58%79%51%5A%20==%30=%30===';

            const parser = new IRealProUrlParser();

            expect(parser.parse(songWithRepeats)).toEqual([
                {
                    title: 'Airmail Special',
                    author: 'Charlie Christian',
                    style: 'Medium Up Swing',
                    key: 'C',
                    chordString: '[*iT44C6 |x |r|r|r|][Co7 |x |r|Co7 Bo7|Bbo7 |Ab7 |G7 ] {*ASC C/E|F G|C C/E|F G|C C7|F F#o7|C/G |C  }[*BCo7 |x |r|Co7 Bo7|Bbo7 |Ab7 |G7 Z'
                }
            ]);
        });
        it('should handle Always And Forever, strange hard to parse coda', () => {
            const songWithRepeats = 'irealb://%41%6C%77%61%79%73%20%41%6E%64%20%46%6F%72%65%76%65%72=%4D%65%74%68%65%6E%79%20%50%61%74==%42%61%6C%6C%61%64=%41%2D==%31%72%33%34%4C%62%4B%63%75%37%37%2D%45%2C%37%34%41%2D%58%79%2D%41%41%2A%5B%5D%20%31%31%2D%44%20%36%2D%7C%44%51%79%58%2D%41%7C%51%79%58%36%2D%44%7C%51%39%20%73%44%2D%34%54%69%2A%5B%4C%39%36%62%45%37%20%73%47%39%4C%37%68%23%46%20%47%2F%37%5E%43%5A%4C%37%62%5E%41%20%39%2D%41%6C%7C%2C%23%47%2F%37%45%2C%5A%46%5E%37%20%5E%46%6C%7C%2C%46%6C%7C%2C%37%37%73%75%73%4C%44%73%20%39%2D%41%53%42%2A%5B%5D%20%23%47%45%2F%20%47%2F%37%2D%46%7C%51%79%58%37%5E%43%5A%2D%39%2C%45%2D%47%20%39%44%5A%20%37%68%41%5A%37%4C%5A%45%62%37%2D%46%5A%4C%43%2F%62%41%20%37%2D%43%7C%79%51%58%37%5E%62%44%5A%4C%44%2F%62%42%20%37%5E%20%47%2D%37%4C%62%42%20%37%2D%2F%37%45%2C%39%5A%73%47%5E%37%46%6C%7C%2C%37%2D%45%2C%37%2D%44%73%20%39%41%2D%6C%43%2A%5B%5D%2C%37%45%20%2C%37%68%42%2C%5E%37%20%73%47%4C%35%62%37%44%43%5A%4C%51%2C%41%2D%39%20%41%44%5A%4C%39%36%62%45%20%37%5E%46%7C%59%5A%37%4C%68%23%46%20%47%2F%37%5E%43%5A%4C%37%5E%62%39%20%46%2F%47%6C%7C%2C%23%47%51%79%58%5A%51%7C%46%2D%36%2F%6F%63%20%6C%61%20%2E%53%2E%44%20%20%3C%47%36%2F%2D%46%7C%51%79%58%37%5E%43%7C%51%79%58%47%64%61%3E%58%79%51%79%58%37%5E%58%79%51%20%20%59%5B%51%43%5E%37%20%4C%5A%46%2D%36%2F%47%20%4C%5A%43%5E%37%20%4C%5A%46%2D%36%2F%47%20%20%73%47%23%6F%2C%7C%6C%41%2D%39%2C%20%20%5A%20==%30=%30===';

            const parser = new IRealProUrlParser();

            expect(parser.parse(songWithRepeats)).toEqual([
                {
                    title: 'Always And Forever',
                    author: 'Pat Metheny',
                    style: 'Ballad',
                    key: 'A-',
                    chordString: '[*iT44A- |D-6 |A- |D-6 D-11 ][*AA-9 D-7 E-7 |F^7 G9 E7/G# |A-9 Ab^7|C^7/G F#h7|F^7 Eb69|D9 G7sus|C^7 |F-7/G E/G# ][*BSA-9 D-9 E-7 |F-7 Bb7|Eb^7 Bb/D|Db^7 |C-7 Ab/C|F-7 G-7|Ah7 D7b5|G^7 Bh7 E7 ][*C A-9 D-7 E-7 |F^7 G9 E7/G# |A-9 Ab^7|C^7/G F#h7|Y|F^7 Eb69|D9 F/G Q|C^7 |F-6/G |C^7 |F-6/G Z Y[QC^7 |F-6/G |C^7 |F-6/G G#o |A-9 Z'
                }
            ]);
        });
        it('should handle And On The Third Day, chart is unusual', () => {
            const songWithRepeats = 'irealb://%41%6E%64%20%4F%6E%20%54%68%65%20%54%68%69%72%64%20%44%61%79=%47%69%62%62%73%20%4D%69%63%68%61%65%6C==%42%61%6C%6C%61%64=%44==%31%72%33%34%4C%62%4B%63%75%37%20%78%20%5A%4C%34%44%37%2C%58%20%6C%63%4B%51%79%58%37%44%41%2A%7B%5D%20%78%20%20%5A%4C%20%78%20%5A%4C%20%6C%63%4B%51%79%4C%5A%20%78%20%34%54%69%2A%5B%20%78%20%5A%4C%79%51%4B%63%6C%79%58%37%45%5A%4C%20%6C%63%4B%51%79%58%37%5A%44%4C%20%6C%63%4B%51%79%58%37%5E%43%5A%4C%20%51%4B%63%6C%20%58%37%44%5A%4C%7C%51%79%58%37%4C%5A%44%5E%37%20%6C%63%4B%51%79%58%37%62%47%5A%4C%20%6C%4B%63%51%79%58%37%45%5A%4C%20%6C%63%4B%51%79%58%4C%5A%47%62%68%20%78%20%5A%4C%45%37%58%79%51%4B%63%6C%20%4C%5A%45%37%62%35%20%20%51%20%7D%59%7B%51%44%37%58%79%51%4B%63%6C%20%4C%5A%20%78%20%4C%5A%20%3C%46%61%64%65%3E%78%20%20%7D%20==%30=%30===';

            const parser = new IRealProUrlParser();

            expect(parser.parse(songWithRepeats)).toEqual([
                {
                    title: 'And On The Third Day',
                    author: 'Michael Gibbs',
                    style: 'Ballad',
                    key: 'D',
                    chordString: '[*iT44D7 |x |x |x ]{*AD7 |x |x |x |D7 |x |C^7 |x |D7 |x |E7 |x |x |x |D^7 |x |E7 |x |Gb7 |x |Gbh7 |E7 |x |E7b5 Q }Y{QD7 |x |x |x }'
                }
            ]);
        });
        it('should handle Alone Too Long, it has double pause (pp)', () => {
            const songWithRepeats = 'irealb://%41%6C%6F%6E%65%20%54%6F%6F%20%4C%6F%6E%67=%53%63%68%77%61%72%74%7A%20%41%72%74%68%75%72==%42%61%6C%6C%61%64=%47==%31%72%33%34%4C%62%4B%63%75%37%36%47%31%4E%7C%34%47%36%58%79%7C%51%79%58%37%2D%41%5A%4C%20%78%20%5A%4C%44%37%20%37%2D%41%5A%4C%37%6F%23%47%70%70%7C%51%44%37%58%79%51%34%54%41%2A%7B%2D%45%20%2D%45%5A%41%2D%37%20%39%62%37%42%20%37%68%23%46%7C%51%79%58%36%32%47%4E%5A%4C%20%51%79%58%51%79%58%7D%20%37%44%20%5D%5B%2A%42%4C%37%2D%45%20%31%2D%41%7C%51%2D%2F%43%23%2C%4C%44%2F%2D%45%20%2D%45%5A%4C%20%6C%63%4B%79%51%58%36%2D%45%6C%7C%2C%37%42%2C%37%43%73%70%5A%41%37%58%79%45%5A%4C%44%2F%37%44%7C%51%79%44%37%58%79%51%4C%20%78%20%5A%4C%37%44%20%37%2D%41%5A%4C%6F%37%23%47%70%70%7C%51%79%58%36%47%41%2A%5B%5D%5A%41%2D%37%58%7C%51%79%58%31%58%79%51%7C%47%36%20%45%2D%37%4C%5A%41%2D%37%20%44%37%20%5A%20==%30=%30===';

            const parser = new IRealProUrlParser();

            expect(parser.parse(songWithRepeats)).toEqual([
                {
                    title: 'Alone Too Long',
                    author: 'Arthur Schwartz',
                    style: 'Ballad',
                    key: 'G',
                    chordString: '{*AT44G6 |\\ \\ G#o7|A-7 D7|x |A-7 |D7 |N1G6 E-7|A-7 D7 } |N2G6 |F#h7 B7b9 ][*BE- E-/D|E-/C# \\ C7 B7 |E-6 |x |E- E-/D|A7 |A-11 |D7 ][*AG6 |\\ \\ G#o7|A-7 D7|x |A-7 |D7 |G6 E-7|A-7 D7 Z'
                }
            ]);
        });
        it('should handle Ahmid-6, it complicated chart', () => {
            const songWithRepeats = 'irealb://Ahmid-6%3DMetheny%20Pat%3D%3DEven%208ths%3DC%3D%3D1r34LbKcu7%20GZL74D-7XZL7B%207-%23FZLQyXr%7CQyX%7CQyX7-%23C%7CQyE-7%20A4TA*%5Bh%23F%7CZ%20D-7L%207hA%7CQyX11%237%5Eb%7CBQyX7B%7CQyX7%5EC%7CZD7b9L-EZLFbAZLx9LZEh9bE%7CZL7bB%207-FZ7L-E%207-DZL9b7A%207susLZb7B%2077-FZLLZAb7CZL9b7G%207hD%7CZLZxL31%5EbDZLxZLsus-7%20F7xZL9%5E7Bs%20%2CZGh7%2043TZL7-Cs%207-GZ7L-%23F%207-F%7CZL9%237ClF%23-7L7bB%20%7CQyX7%2CA7su%20%20lcKQyXsus7Al44TZLsus7A42TZLs%5B*BD-7-E%7C%2CDpp%7CQyQ%7CD-ZL7A%207-EZL7B%207%23-F%7CQyX7-%23C%7CQyX7A-7XyX7-%23C%5EAZL77%20Bb7DZL7bA%207%5ECZL7G7%20%5EE%7CZL7B%207%5EbEZLb%5E7%20E%5EGZL77%20C7LZ%7CF%5E7LZxLZE-7LZxLZF%5E7LZxLZE-7LZx%20Z%20%3D%3D0%3D0%3D%3D%3D';

            const parser = new IRealProUrlParser();

            expect(parser.parse(songWithRepeats)).toEqual([
                {
                    title: 'Ahmid-6',
                    author: 'Pat Metheny',
                    style: 'Even 8ths',
                    key: 'C',
                    chordString: '[*AT44D-7 |C#-7 |r|F#-7 B7|E-7 A7|G F|E- D-7|C^7 |B7 |Bb^7#11 |Ah7 D7b9|F#h7 B7b9|Eh7 A7b9|D-7 E-7|F-7 Bb7|Eb9sus|x|Ab^9|x|Ab7sus|x|Db^13|x|Dh7 G7b9|C-7 F7|F-7 Bb7|Gh7 C7#9|F-7 F#-7|G-7 C-7|T34 F#-7 B7 |E-7 A7sus|T24A7sus|T44 A7sus |x [*BD-7 |C#-7 |D-7 |C#-7 |F#-7 B7|E-7 A7|A-7 |\\ \\ D7|G^7 Bb7|Eb^7 B7|E^7 G7|C^7 Ab7|Db^7 E7|A^7 C7|F^7|x|E-7|x|F^7|x|E-7|x Z'
                }
            ]);
        });
        it('should handle Crosscurrent, it has typo, su instead of sus', () => {
            const songWithRepeats = 'irealb://%43%72%6F%73%73%63%75%72%72%65%6E%74=%54%72%69%73%74%61%6E%6F%20%4C%65%6E%6E%69%65==%55%70%20%54%65%6D%70%6F%20%53%77%69%6E%67=%46==%31%72%33%34%4C%62%4B%63%75%37%5A%4C%37%46%20%34%46%5E%37%20%37%43%20%37%2D%47%5A%4C%39%62%37%44%20%37%41%2D%5A%4C%37%43%20%37%2D%47%5A%4C%35%23%37%44%4C%5A%46%5E%37%34%54%41%2A%5B%4C%37%43%20%37%42%6F%37%4C%5A%62%41%20%37%5E%46%42%2A%5B%5D%20%31%31%23%43%37%20%37%5E%46%5A%4C%37%43%20%73%75%73%37%43%37%4C%5A%47%2D%20%37%5E%62%42%2A%43%28%20%5A%37%62%39%4C%5A%28%20%20%29%37%5E%62%42%28%31%31%23%37%43%4C%5A%37%46%20%37%5E%46%5A%4C%37%43%20%37%2D%47%42%6F%37%29%4C%44%20%36%46%5A%79%58%37%2D%62%78%20%28%43%37%31%31%23%37%5E%41%7C%51%79%58%37%2D%62%42%2A%43%5B%5D%51%79%58%31%31%23%37%5E%46%5A%4C%29%58%79%51%7C%41%29%2A%73%75%37%20%37%5E%46%41%23%31%31%58%79%58%31%31%23%37%43%7C%51%79%58%37%2D%47%5A%37%4C%44%20%37%42%7C%51%79%58%37%5E%62%47%7C%51%79%51%5D%5B%2A%37%5E%47%7C%51%37%5E%62%42%28%5A%47%2D%37%20%5A%4C%37%46%20%37%5E%46%5A%4C%37%43%20%37%47%2D%5A%4C%39%62%37%44%20%37%2D%41%5A%4C%37%43%43%37%23%31%31%4C%39%62%37%44%29%20%20%28%42%6F%37%29%4C%5A%20%28%43%37%73%75%73%29%78%20%28%43%37%29%4C%5A%46%5E%37%23%31%31%20%43%37%23%35%20%5D%20==%30=%30===';

            const parser = new IRealProUrlParser();

            expect(parser.parse(songWithRepeats)).toEqual([
                {
                    title: 'Crosscurrent',
                    author: 'Lennie Tristano',
                    style: 'Up Tempo Swing',
                    key: 'F',
                    chordString: '[*AT44F^7 D7#5|G-7 C7|A-7 D7b9|G-7 C7|F^7 F7|Bb^7 Bo7|C7sus C7|F^7 C7#11 ][*BF^7 Ab7|G-7 C7|F6 D7b9|G-7 C7|F^7 F7|C7#11(Bb^7) (Bo7)|(C7) x (C7)|F^7#11 ][*CBb-7 |A^7#11 |Ab-7 |G^7#11 |Gb^7 |B7 D7|G-7 |C7#11 ][*AF^7 D7b9|G-7 C7|A-7 D7b9|G-7 C7|F^7 F7|C7#11(Bb^7) (Bo7)|(C7sus) x (C7)|F^7#11 C7#5 ]'
                }
            ]);
        });
        it('should handle Fantasy in D (or Ugetsu), a lot of repeats and uneven segments length', () => {
            const songWithRepeats = 'irealb://%46%61%6E%74%61%73%79%20%69%6E%20%44%20%28%6F%72%20%55%67%65%74%73%75%29=%57%61%6C%74%6F%6E%20%43%65%64%61%72==%4D%65%64%69%75%6D%20%55%70%20%53%77%69%6E%67=%43==%31%72%33%34%4C%62%4B%63%75%37%2F%37%2D%45%5A%34%44%5E%39%2F%23%44%5A%4C%20%7C%72%20%5A%4C%20%7C%72%20%4C%5A%20%7C%72%20%5A%4C%41%2F%37%2D%45%5A%4C%41%5E%39%2F%41%4C%34%54%69%2A%5B%79%58%39%5E%43%7C%20%4C%5A%20%5E%44%7C%51%79%58%39%5E%43%7C%51%79%58%39%44%5E%41%2A%7B%5D%20%20%7C%72%20%5A%4C%20%7C%72%39%58%79%51%7C%72%20%5A%4C%41%51%79%58%39%5E%58%79%51%7C%41%37%2D%42%5A%4C%2C%37%23%46%20%37%68%23%43%51%7C%79%58%37%5E%47%7C%51%79%58%31%31%23%37%62%58%79%51%7C%43%39%5E%44%7C%51%2F%31%31%23%33%2C%73%45%31%33%45%2F%33%31%62%42%5A%4C%46%2F%39%62%33%31%41%62%20%39%62%33%31%62%47%5A%4C%39%5E%47%6C%2C%2C%20%45%62%31%37%2D%42%73%7C%5E%43%20%5A%4C%42%44%5E%39%2F%43%2A%5D%20%20%7C%72%20%5A%4C%20%7C%72%20%4C%5A%20%7C%72%20%5A%4C%41%2F%37%2D%45%5A%4C%41%20%44%5E%39%20%2A%7D%20%62%45%37%23%46%20%37%44%5E%39%20%4C%20%37%5E%47%20%5A%4C%20%31%31%23%37%62%41%5A%20%4C%20%39%5E%44%20%5A%4C%20%39%5E%43%20%5A%4C%5A%43%23%68%20%5A%4C%20%39%41%2F%37%2D%45%20%42%2D%37%20%5E%44%5A%4C%39%62%45%20%37%2D%62%42%5A%4C%31%33%45%20%37%2D%42%5A%4C%20%39%5E%43%20%5A%4C%39%2F%41%4C%5A%5A%4C%31%31%23%43%20%6E%6F%20%20%4C%5A%20%72%20%2C%41%41%6E%49%20%6E%6F%20%65%6D%65%68%38%54%32%2A%3C%20%5A%20%20%7C%72%20%5A%4C%20%7C%53%6F%6C%6F%73%7C%72%20%5A%4C%2C%20%69%6E%74%65%72%42%3E%20==%30=%30===';

            const parser = new IRealProUrlParser();

            expect(parser.parse(songWithRepeats)).toEqual([
                {
                    title: 'Fantasy in D (or Ugetsu)',
                    author: 'Cedar Walton',
                    style: 'Medium Up Swing',
                    key: 'C',
                    chordString: '[*iT44D^9/A|E-7/A|r|r|r|D#^9/A|E-7/A|r|r|r|]{*AD^9 |C^9 |D^9 |C^9 |D^9 |Ab7#11 |G^7 |C#h7 F#7 |B-7 |C^9 |B-7 E13 G^9|Gb13b9 Ab13b9/F|Bb13/E Eb13#11/Eb }[*BD^9/A|E-7/A|r|r|r|]*C D^9 |C^9 |D^9 |C^9 |D^9 |Ab7#11 |G^7 |C#h7 F#7#11|B-7 |C^9 |B-7 E13|Bb-7 Eb9|D^9/A|E-7/A|r|r|r|Z'
                }
            ]);
        });
        it('should handle Favela', () => {
            const songWithRepeats = 'irealb://%46%61%76%65%6C%61=%4A%6F%62%69%6D%20%41%6E%74%6F%6E%69%6F%2D%43%61%72%6C%6F%73==%42%6F%73%73%61%20%4E%6F%76%61=%47%2D==%31%72%33%34%4C%62%4B%63%75%37%2D%47%7C%51%79%34%47%2D%37%58%51%79%58%37%2D%47%7C%51%79%58%47%2F%46%7C%79%51%58%37%2D%47%7C%51%79%58%47%2F%46%7C%51%79%7C%46%2F%47%58%33%54%5B%41%2A%2D%47%5A%4C%36%63%6C%20%4C%5A%68%45%7C%51%79%58%37%62%42%7C%51%79%58%37%62%5E%42%7C%51%79%58%37%46%7C%51%79%58%37%2D%43%37%20%45%62%2D%4B%51%79%58%37%7C%51%79%58%37%4C%5A%47%2D%37%58%37%2D%43%7C%51%79%58%37%2D%47%7C%51%79%37%58%2D%43%5B%42%2A%5D%20%20%6C%63%4B%51%79%58%79%51%7C%47%2D%37%2D%44%20%37%51%79%58%47%2F%51%7C%47%2D%37%37%2D%47%5B%41%2A%5D%51%79%58%39%23%37%43%4C%5A%39%23%37%44%20%39%23%37%62%45%7C%51%79%58%58%79%51%7C%46%79%58%37%2D%43%37%46%7C%51%79%79%51%7C%46%2F%4C%20%6C%63%4B%51%79%58%37%2D%47%7C%51%79%47%58%2F%46%7C%51%79%58%37%2D%47%7C%51%79%58%47%5A%43%2D%37%58%58%37%2D%47%7C%58%79%51%7C%42%62%5E%37%58%79%51%7C%42%62%37%58%79%51%7C%45%68%37%20%45%62%2D%36%4C%5A%47%2D%37%20%44%2D%37%4C%5A%47%2D%37%58%79%51%4B%63%6C%20%20%5A==%30=%30===';

            const parser = new IRealProUrlParser();

            expect(parser.parse(songWithRepeats)).toEqual([
                {
                    title: 'Favela',
                    author: 'Antonio-Carlos Jobim',
                    style: 'Bossa Nova',
                    key: 'G-',
                    chordString: '*A[T34G-7 |F/G |G-7 |F/G |G-7 |F/G |G-7 |x |C-7 |F7 |Bb^7 |Bb7 |Eh7 Eb-6|G-7 D-7|G-7 |x ]*B[C-7 |G-7 |C-7 |G-7 |C-7 |G-7 |Eb7#9 D7#9|C7#9 ]*A[G-7 |F/G |G-7 |F/G |G-7 |F/G |G-7 |x |C-7 |F7 |Bb^7 |Bb7 |Eh7 Eb-6|G-7 D-7|G-7 |x Z'
                }
            ]);
        });
        it('should handle Killer Joe, it ends with repeats following Z', () => {
            const songWithRepeats = 'irealb://%4B%69%6C%6C%65%72%20%4A%6F%65=%47%6F%6C%73%6F%6E%20%42%65%6E%6E%79==%4D%65%64%69%75%6D%20%53%77%69%6E%67=%43==%31%72%33%34%4C%62%4B%63%75%37%51%79%58%7C%72%41%43%39%58%79%51%79%58%7C%72%51%79%58%5A%4C%51%79%58%7C%51%72%79%58%7C%51%79%58%31%31%23%39%62%42%7C%51%4C%5A%58%79%51%2A%34%34%54%7B%2D%45%7C%51%79%45%68%37%58%79%51%79%58%37%41%7C%51%79%58%37%62%41%7C%51%58%79%37%2D%62%45%7C%51%79%58%39%62%37%41%7C%51%7C%41%62%37%58%42%2A%5B%7D%20%5A%4C%51%79%58%41%37%58%79%51%5A%4C%51%79%58%7C%72%51%79%58%7C%51%79%58%31%31%23%39%62%42%7C%51%79%58%39%43%41%2A%5B%5D%58%79%51%72%7C%7C%51%79%58%37%58%79%51%72%7C%58%79%51%20%5A%20==%30=%30===';

            const parser = new IRealProUrlParser();

            expect(parser.parse(songWithRepeats)).toEqual([
                {
                    title: 'Killer Joe',
                    author: 'Benny Golson',
                    style: 'Medium Swing',
                    key: 'C',
                    chordString: '{T44*AC9 |Bb9#11 |r|r|r|}[*BEh7 |A7b9 |Eb-7 |Ab7 |A7 |Ab7 |E-7 |A7 ][*AC9 |Bb9#11 |r|r|r|Z'
                }
            ]);
        });
        it('should handle Miles Ahead with + chord', () => {
            const songWithRepeats = 'irealb://%4D%69%6C%65%73%20%41%68%65%61%64=%44%61%76%69%73%20%4D%69%6C%65%73==%4D%65%64%69%75%6D%20%53%77%69%6E%67=%43==%31%72%33%34%4C%62%4B%63%75%37%20%78%20%5A%4C%34%43%5E%37%58%79%58%37%2D%47%7C%51%79%58%37%2D%44%5A%4C%78%20%20%5A%4C%20%78%20%5A%4C%20%6C%63%4B%51%79%51%4B%63%6C%20%34%54%41%2A%5B%37%68%45%5A%4C%58%79%51%4B%63%23%46%5A%4C%47%2F%2D%41%20%2D%41%5A%4C%37%20%45%37%42%7C%51%79%58%37%5E%62%42%5A%4C%20%6C%68%37%20%46%37%37%5E%46%5A%4C%51%79%58%37%2D%37%58%79%51%5D%37%2D%44%5A%4C%20%6C%63%4B%51%79%58%37%5E%5A%43%4C%20%6C%63%4B%51%79%58%37%2D%44%42%2A%5B%58%79%51%7C%47%41%7C%51%79%58%51%79%58%37%2D%4C%5A%46%5E%37%37%41%5A%4C%51%20%20%37%68%45%7C%51%79%58%2B%2A%37%2A%45%7C%51%79%58%37%68%42%7C%51%79%58%58%79%51%7C%44%37%43%70%70%7C%42%7C%51%79%58%51%7C%44%37%58%5A%4C%20%6C%63%4B%51%79%58%37%2D%44%7C%51%58%79%37%41%51%5B%59%5D%51%79%58%37%47%7C%51%79%47%37%73%75%73%79%58%37%47%7C%62%5E%37%58%79%51%7C%44%62%37%58%79%51%7C%43%5E%37%20%4C%5A%78%20%4C%5A%78%20%5A%20==%30=%30===';

            const parser = new IRealProUrlParser();

            expect(parser.parse(songWithRepeats)).toEqual([
                {
                    title: 'Miles Ahead',
                    author: 'Miles Davis',
                    style: 'Medium Swing',
                    key: 'C',
                    chordString: '[*AT44C^7 |x |x |x |D-7 |G-7 |x |x |F^7 |x |Bb^7 |B7 E7|A- A-/G|F#h7 F7|Eh7 |A7 ][*BD-7 |x |C^7 |x |D-7 |G-7 |\\ \\ C7|F^7 |Bh7 |E7+ |Eh7 Q|A7 |D-7 |G7 |D7 |G7 ]Y[QA7 |D-7 |x |G7sus |Bb^7 |Db7 |C^7 |x |x Z'
                }
            ]);
        });
        it('should handle Moanin\', it starts with N.C. and has Y{S*AF-7 Ab7|G7 C7b9|r|r|r| }', () => {
            const songWithRepeats = 'irealb://%4D%6F%61%6E%69%6E%27=%54%69%6D%6D%6F%6E%73%20%42%6F%62%62%79==%4D%65%64%69%75%6D%20%53%77%69%6E%67=%46%2D==%31%72%33%34%4C%62%4B%63%75%37%65%6E%69%46%3C%41%6E%20%42%62%79%58%5A%4C%51%79%58%7C%72%51%79%58%5A%4C%79%51%58%7C%72%51%79%58%5A%4C%20%6E%2C%46%5A%4C%51%72%7C%20%20%2A%34%34%54%7B%41%20%37%2D%62%2A%42%42%62%2D%20%39%62%37%46%7C%51%79%58%37%2D%46%5A%4C%23%39%37%43%20%39%62%37%47%5A%4C%39%62%41%20%37%42%37%4C%5A%42%5B%7D%20%20%3E%6F%53%20%3C%41%37%62%39%58%79%51%79%58%39%62%37%43%3E%65%6E%69%46%20%6C%20%61%2E%43%2E%44%3C%7C%51%79%58%37%68%47%7C%51%5D%59%7B%53%2A%47%5A%4C%39%62%20%20%7C%72%51%46%2D%37%20%41%79%58%7C%72%51%79%58%5A%4C%51%79%58%7C%72%79%51%58%5A%4C%39%62%37%43%20%37%47%5A%4C%37%62%51%4C%5A%58%79%3E%3A%73%6F%6C%42%5A%4C%37%42%3E%20%20%7D%5B%7C%51%79%58%37%2D%46%5A%4C%39%23%37%43%20%62%39%37%47%5A%4C%39%62%41%20%37%2D%62%42%42%2A%46%37%62%39%20%65%6E%69%46%3C%62%2D%37%20%41%62%39%4C%5A%47%37%62%39%58%79%51%7C%47%68%37%58%79%51%7C%3C%44%2E%53%2E%20%61%6C%20%46%69%6E%65%3E%43%37%62%39%58%79%51%5D%20==%30=%30===';

            const parser = new IRealProUrlParser();

            expect(parser.parse(songWithRepeats)).toEqual([
                {
                    title: 'Moanin\'',
                    author: 'Bobby Timmons',
                    style: 'Medium Swing',
                    key: 'F-',
                    chordString: '{T44*An Bb|F n |r|r|r| }[*BBb-7 Ab9|G7b9 C7#9|F-7 |F7b9 B7|Bb-7 Ab9|G7b9 |Gh7 |C7b9 ]Y{S*AF-7 Ab7|G7 C7b9|r|r|r| }[*BBb-7 Ab9|G7b9 C7#9|F-7 |F7b9 B7|Bb-7 Ab9|G7b9 |Gh7 |C7b9 ]'
                }
            ]);
        });
        it('should handle Brazilian Suite', () => {
            const songWithRepeats = 'irealb://%42%72%61%7A%69%6C%69%61%6E%20%53%75%69%74%65=%50%65%74%72%75%63%63%69%61%6E%69%20%4D%69%63%68%65%6C==%42%6F%73%73%61%20%4E%6F%76%61=%42%62%2D==%31%72%33%34%4C%62%4B%63%75%37%41%7C%51%79%58%34%41%62%2D%37%2A%7B%7D%51%79%58%37%2D%62%45%7C%51%79%58%2D%37%62%41%7C%51%79%58%37%2D%62%45%7C%51%79%58%41%41%62%2D%37%34%54%69%2A%7B%58%35%62%37%44%62%58%79%51%7C%62%37%62%45%7C%51%79%58%37%2D%62%44%7C%51%58%79%37%2D%62%45%7C%51%79%58%31%31%23%37%5E%45%39%58%79%51%7C%47%2F%37%2D%62%51%79%58%37%2D%37%58%79%51%7C%58%39%23%37%62%45%7C%51%79%58%39%62%37%62%7C%42%51%79%58%37%42%7C%51%79%58%35%23%37%5E%43%79%51%7C%41%62%62%44%7C%51%79%37%41%7C%51%79%39%58%79%51%5D%51%79%58%37%62%42%7C%51%79%58%37%68%46%7C%79%51%58%23%46%2F%37%42%7C%51%79%58%37%2D%62%41%7C%45%2D%37%58%62%37%62%45%7C%79%58%37%62%41%5E%37%58%79%51%2D%62%45%7C%51%79%58%37%2D%62%42%7C%51%79%37%58%5E%62%44%5A%4C%37%62%41%20%37%2D%62%45%7C%37%58%79%51%7C%44%7C%51%79%58%47%2F%37%2D%62%37%58%79%51%7C%37%2D%62%41%7C%51%79%58%37%62%45%7C%51%79%31%58%31%23%37%5E%62%45%7C%51%79%58%37%2D%62%42%58%79%51%7C%41%5E%62%44%7C%51%62%45%5A%4C%37%45%62%5E%37%23%51%79%58%39%62%37%62%45%7C%51%79%58%37%2D%44%62%7C%51%79%58%37%2D%62%45%7C%51%79%58%31%31%5D%7B%41%62%2D%7C%51%79%58%62%2D%37%4C%5A%41%62%2D%37%4C%5A%45%62%2D%37%20%7D%58%79%51%51%4C%5A%44%62%5E%37%4C%5A%44%62%5E%37%20%5A%20==%30=%30===';

            const parser = new IRealProUrlParser();

            expect(parser.parse(songWithRepeats)).toEqual([
                {
                    title: 'Brazilian Suite',
                    author: 'Michel Petrucciani',
                    style: 'Bossa Nova',
                    key: 'Bb-',
                    chordString: '{*iT44Ab-7 |Eb-7 |Ab-7 |Eb-7 }{*AAb-7 |Ab-7/Gb |E^7#11 |Eb-7 |Db-7 |Eb7b9 |D7b5 |Db7 |C^7#5 |B7 |Bb7b9 |Eb7#9 |Ab-7 |Eb7b9 ]Ab-7 |B7/F# |Fh7 |Bb7 |E-7 |A7 |D^7 |Eb-7 Ab7|Db^7 |Bb-7 |Eb-7 |Ab7 |Db^7 |Bb-7 |Eb^7#11 |Eb7 |Ab-7 |Ab-7/Gb |Eb^7#11 |Eb-7 |Db-7 |Eb7b9 ]{Ab-7|Eb-7|Ab-7|Eb-7 } Q|Db^7|Db^7 Z'
                }
            ]);
        });
        it('should handle Butterfly with fermata and a lot of N.C.', () => {
            const songWithRepeats = 'irealb://%42%75%74%74%65%72%66%6C%79=%48%61%6E%63%6F%63%6B%20%48%65%72%62%69%65==%46%75%6E%6B=%46%2D==%31%72%33%34%4C%62%4B%63%75%37%73%78%34%28%3C%34%46%2D%37%3C%2D%41%70%7C%51%79%58%3E%74%75%6F%68%67%75%72%6F%68%74%20%6C%65%65%66%20%78%20%66%6C%61%68%37%2C%20%4C%5A%34%54%69%2A%7B%20%31%31%2D%44%58%79%51%7C%70%31%31%2D%46%5A%4C%20%31%31%2D%41%70%7C%51%58%79%31%31%2D%46%41%2A%53%7B%7D%20%20%37%2D%41%58%79%51%7C%70%37%2D%46%3E%29%23%37%5E%62%41%6E%20%42%62%37%42%2F%37%5E%62%41%5A%4C%20%35%23%39%23%37%6C%41%6E%73%5A%4C%20%6E%20%5A%4C%20%6E%20%5A%4C%62%58%79%51%7C%42%2A%5B%7D%20%35%23%39%23%37%79%51%7C%41%62%6C%63%4B%51%79%58%73%75%73%33%31%62%45%7C%79%51%58%33%31%62%42%7C%51%79%58%62%42%2F%37%5E%20%4C%5A%45%62%58%62%42%2F%35%46%20%6E%6C%7C%6C%20%4C%5A%41%3E%65%6E%69%46%51%79%58%51%79%58%3C%51%2C%2F%43%57%73%70%70%7C%51%79%58%73%75%73%33%31%62%43%37%2F%45%2C%63%4B%51%79%58%7D%20%3E%61%64%41%2D%37%20%4C%20%2E%53%2E%44%51%79%58%51%79%58%3C%20%3E%33%78%3C%37%2D%41%70%7C%51%79%58%37%2D%46%7B%5A%61%6C%20%43%6F%70%5A%4C%37%2D%6F%38%36%2A%3C%51%20%20%59%7B%20%5A%4C%20%78%20%5A%4C%20%78%20%5A%4C%20%6E%3E%65%70%6F%36%36%2A%3C%20%2C%31%31%2D%46%51%78%20%20%7D%7B%79%58%51%79%58%70%65%6E%3E%42%62%31%33%20%4C%5A%78%20%4C%5A%78%20%4C%5A%78%20%20%7D%66%3C%44%2E%43%2E%20%61%6C%20%46%69%6E%65%3E%41%5E%37%23%31%31%58%79%51%5A%20==%30=%30===';

            const parser = new IRealProUrlParser();

            expect(parser.parse(songWithRepeats)).toEqual([
                {
                    title: 'Butterfly',
                    author: 'Herbie Hancock',
                    style: 'Funk',
                    key: 'F-',
                    chordString: '{*iT44F-7 |\\ A-7 |F-7 |\\ A-7 }{S*AF-11 |\\ A-11 |F-11 |\\ D-11 }[*Bn Bb7|n |n |n A7#9#5 |Ab^7/Bb |Ab^7#5/Bb |Ab^7/Bb |Bb13 |Eb13sus |x |Eb7#9#5 |x |Ab13sus |\\ \\ W/C QC7/E |n F-7|\\ A-7 |{F-7 |\\ A-7  } Y{QF-11  |x |x |x }{Bb13 |x |x |x }fA^7#11 Z'
                }
            ]);
        });

        it.skip('should handle song with misplaced prefix, transposed?', () => {});
        it.skip('should handle song without prefix', () => {});
        it.skip('should handle song with part 2 in url', () => {});
        it.skip('should handle additional properties: style, bpm, transpose, repeats', () => {});
    });

    describe('decrypt', () => {
        it('should handle empty string', () => {
            const parser = new IRealProUrlParser();

            expect(parser.decrypt('')).toBe('');
        });
        it('should handle valid string', () => {
            const parser = new IRealProUrlParser();
            const obfuscatedString = '7-bB14F^7X7^bBZL7F 7-C|QXy7^FZL7E 7-B|QyXyQ|N4T{A*L7bE ZA-7(NZLQyX} 7C 7-GLZ)7^bA(7D )7^bA2Bb-7L7bE ZL7A yQ|C-yX7^DZL7A 7-E|yQX7^bB[B*] 7F 7Q|E-7X7^FZ^FZL7Q|D-7|QyX7^F[A*] 7C7 -G|QyX7^CZL7G B-7 EyX7^D7-AZLC-7 FBZL7D 7-AZL7bE7 -bB|QyX7^bBZL7-7 E7|QyX7 D7LZG-7 C7LZF6XyQ|G-7 C7 Z';

            expect(parser.decrypt(obfuscatedString)).toBe('*A{T44F^7XyQ|B-7 E7LZF^7XyQ|C-7 F7LZBb^7XyQ|N1Bb-7 Eb7LZA-7(Ab^7) D7(Ab^7)LZG-7 C7 }XyQLZN2Bb-7 Eb7LZF^7XyQ|C-7 F7 ]*B[Bb^7XyQ|E-7 A7LZD^7XyQ|E-7 A7LZD^7XyQ|D-7 G7LZC^7XyQ|G-7 C7 ]*A[F^7XyQ|B-7 E7LZF^7XyQ|C-7 F7LZBb^7XyQ|Bb-7 Eb7LZA-7 D7LZB-7 E7LZA-7 D7LZG-7 C7LZF6XyQ|G-7 C7 Z');
        });
        it('should handle valid string', () => {
            const parser = new IRealProUrlParser();
            const obfuscatedString = '7-bB14F^7X7^bBZL7F 7-C|QXy7^FZL7E 7-B|QyXyQ|N4T{A*L7bE ZA-7(NZLQyX} 7C 7-GLZ)7^bA(7D )7^bA2Bb-7L7bE ZL7A yQ|C-yX7^DZL7A 7-E|yQX7^bB[B*] 7F 7Q|E-7X7^FZ^FZL7Q|D-7|QyX7^F[A*] 7C7 -G|QyX7^CZL7G B-7 EyX7^D7-AZLC-7 FBZL7D 7-AZL7bE7 -bB|QyX7^bBZL7-7 E7|QyX7 D7LZG-7 C7LZF6XyQ|G-7 C7 Z';

            expect(parser.decrypt(obfuscatedString)).toBe('*A{T44F^7XyQ|B-7 E7LZF^7XyQ|C-7 F7LZBb^7XyQ|N1Bb-7 Eb7LZA-7(Ab^7) D7(Ab^7)LZG-7 C7 }XyQLZN2Bb-7 Eb7LZF^7XyQ|C-7 F7 ]*B[Bb^7XyQ|E-7 A7LZD^7XyQ|E-7 A7LZD^7XyQ|D-7 G7LZC^7XyQ|G-7 C7 ]*A[F^7XyQ|B-7 E7LZF^7XyQ|C-7 F7LZBb^7XyQ|Bb-7 Eb7LZA-7 D7LZB-7 E7LZA-7 D7LZG-7 C7LZF6XyQ|G-7 C7 Z');
        });
        it('should handle valid string', () => {
            const parser = new IRealProUrlParser();
            const obfuscatedString = '7-E,74A-Xy-AA*[] 11-D 6-|DQyX-A|QyX6-D|Q9 sD-4Ti*[L96bE7 sG9L7h#F G/7^CZL7b^A 9-Al|,#G/7E,ZF^7 ^Fl|,Fl|,77susLDs 9-ASB*[] #GE/ G/7-F|QyX7^CZ-9,E-G 9DZ 7hAZ7LZEb7-FZLC/bA 7-C|yQX7^bDZLD/bB 7^ G-7LbB 7-/7E,9ZsG^7Fl|,7-E,7-Ds 9A-lC*[],7E ,7hB,^7 sGL5b7DCZLQ,A-9 ADZL96bE 7^F|YZ7Lh#F G/7^CZL7^b9 F/Gl|,#GQyXZQ|F-6/oc la .S.D  <G6/-F|QyX7^C|QyXGda>XyQyX7^XyQ  Y[QC^7 LZF-6/G LZC^7 LZF-6/G  sG#o,|lA-9,  Z';

            expect(parser.decrypt(obfuscatedString)).toBe('[*iT44A-XyQ|D-6XyQ|A-XyQ|D-6 D-11 ][*AA-9 sD-7,E-7,|lF^7 sG9,E7/G#,|lA-9 Ab^7LZC^7/G F#h7LZF^7 Eb69LZD9 G7susLZC^7XyQ|F-7/G E/G# ][*BSA-9 sD-9,E-7,|lF-7 Bb7LZEb^7 Bb/DLZDb^7XyQ|C-7 Ab/CLZF-7 G-7LZAh7 D7b5LZsG^7,Bh7, E7,][*ClA-9 sD-7,E-7,|lF^7 sG9,E7/G#,|lA-9 Ab^7LZC^7/G F#h7LZY|F^7 Eb69LZD9 F/G,QLZC^7XyQ|F-6/GXyQ|C^7XyQ|F-6/G<  D.S. al coda>XyQZXyQXyQ  Y[QC^7 LZF-6/G LZC^7 LZF-6/G  sG#o,|lA-9,  Z');
        });
    });

    describe('beautifyChordString', () => {
        it('should handle empty string', () => {
            const parser = new IRealProUrlParser();

            expect(parser.beautifyChordString('')).toBe('');
        });
        it('should handle valid string', () => {
            const decryptedString = '*A{T44C^7XyQ|C-7 F7LZBb^7XyQ|Bb-7 Eb7LZAb^7XyQ|D-7 G7#9LZN1C^7XyQ|D-7 G7 }XyQXyQ LZN2C^7XyQKcl  ]*B[D-7XyQ|G7XyQ|C^7/EXyQ|A7XyQ|Y|D-7XyQ|G7XyQ|C^7(C#-7)  (F#7)LZD-7 G7 ]*A[C^7XyQ|C-7 F7LZBb^7XyQ|Bb-7 Eb7LZAb^7XyQ|D-7 G7#9LZC^7XyQ|D-7 G7 Z';
            const parser = new IRealProUrlParser();

            expect(parser.beautifyChordString(decryptedString)).toBe('*A{T44C^7 |C-7 F7|Bb^7 |Bb-7 Eb7|Ab^7 |D-7 G7#9|N1C^7 |D-7 G7 } |N2C^7 |x ]*B[D-7 |G7 |C^7/E |A7 |Y|D-7 |G7 |C^7(C#-7) (F#7)|D-7 G7 ]*A[C^7 |C-7 F7|Bb^7 |Bb-7 Eb7|Ab^7 |D-7 G7#9|C^7 |D-7 G7 Z');
        });
        it('should remove s but leave sus', () => {
            const decryptedString = 'sG7XyQ|sC^7(C#sus)';
            const parser = new IRealProUrlParser();

            expect(parser.beautifyChordString(decryptedString)).toBe('G7 |C^7(C#sus)');
        });
        it('should handle all possible combinations', () => {
            const decryptedString = 'G7LZ|K|clC-7YYY   |<comment>   G7XyQ|F^,YY C-7Y';
            const parser = new IRealProUrlParser();

            expect(parser.beautifyChordString(decryptedString)).toBe('G7||xC-7Y | G7 |F^ Y C-7Y');
        });
    });
});