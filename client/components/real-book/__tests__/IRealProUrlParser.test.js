/* eslint max-len: 0 */

import IRealProUrlParser from '../IRealProUrlParser';
const allJazzSongsUrls = require('../playlists/all-jazz-songs');

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
                    author: 'Waller Fats',
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
                    author: 'Brothers Allman',
                    style: 'Rock Pop',
                    key: 'E',
                    chordString: '{*iE |F#- |G#- |F#- |[*AE |F#- |G#- |F#- |E |F#- |A B|C#- D|E F#-|G#- A|C |fB }|*iE |F#- |G#- |F#- |*BE |D |A |B |C#- |A |B |fB |[*AE |F#- |G#- |F#- |E |F#- |A B|C#- D|E F#-|G#- A|C |fB }|E |F#- |C |fB |{*iE |F#- |G#- |F#- }'
                },
                {
                    title: 'Honeysuckle Rose',
                    author: 'Waller Fats',
                    style: 'Up Tempo Swing',
                    key: 'F',
                    chordString: '*A{T44G-7 C7|G-7 C7|G-7 C7|G-7 C7|F6 F7/A|Bb6 C7|N1F6 Bb7|A-7 D7 } |N2F6 |x ]*B[F7 |x |Bb6 |x |G7 |x |C7 |x ]*A[G-7 C7|G-7 C7|G-7 C7|G-7 C7|F6 F7/A|Bb6 C7|UF6 Bb7|A-7 D7 Z'
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

            expect(parser.beautifyChordString(decryptedString)).toBe('G7 xC-7Y | G7 |F^ Y C-7Y');
        });
    });
});
