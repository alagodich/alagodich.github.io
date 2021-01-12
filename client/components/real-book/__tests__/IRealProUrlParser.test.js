/* eslint max-len: 0 */

import IRealProUrlParser from '../IRealProUrlParser';
const allJazzSongsUrls = require('../playlists/jazz');

describe('IRealProUrlParser', () => {

    describe('parse', () => {
        it('should init empty', () => {
            const parser = new IRealProUrlParser();

            expect(parser.parse()).toEqual([]);
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

        it('should handle all jazz songs', () => {
            const parser = new IRealProUrlParser();

            expect(parser.parse(allJazzSongsUrls[0]).length).toBe(325);
            expect(parser.parse(allJazzSongsUrls[1]).length).toBe(325);
            expect(parser.parse(allJazzSongsUrls[2]).length).toBe(325);
            expect(parser.parse(allJazzSongsUrls[3]).length).toBe(325);
            expect(parser.parse(allJazzSongsUrls[4]).length).toBe(50);
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
