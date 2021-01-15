import IRealProUrlParser from '../IRealProUrlParser';
import IRealProChartModel from '../IRealProChartModel';
import allJazzSongsUrls from '../playlists/jazz';

describe('UrlParser and ChartModel integration', () => {
    it('should handle all jazz songs', () => {
        const parser = new IRealProUrlParser();

        expect(parser.parse(allJazzSongsUrls[0]).length).toBe(325);
        expect(parser.parse(allJazzSongsUrls[1]).length).toBe(325);
        expect(parser.parse(allJazzSongsUrls[2]).length).toBe(325);
        expect(parser.parse(allJazzSongsUrls[3]).length).toBe(325);
        expect(parser.parse(allJazzSongsUrls[4]).length).toBe(50);
    });
    it('should be able to parse and create model for all jazz songs part 1', () => {
        const parser = new IRealProUrlParser();

        expect(() => {
            parser.parse(allJazzSongsUrls[0]).forEach(songProps => {
                const model = new IRealProChartModel(songProps);

                expect(model.title.length).not.toBe(0);
                expect(model.author.length).not.toBe(0);
                expect(model.style.length).not.toBe(0);
                expect(model.key.length).not.toBe(0);
                expect(model.chordString.length).not.toBe(0);
                expect(model.segments.length).not.toBe(0);
            });
        }).not.toThrow();
    });
    it('should be able to parse and create model for all jazz songs part 2', () => {
        const parser = new IRealProUrlParser();

        expect(() => {
            parser.parse(allJazzSongsUrls[1]).forEach(songProps => {
                const model = new IRealProChartModel(songProps);

                expect(model.title.length).not.toBe(0);
                expect(model.author.length).not.toBe(0);
                expect(model.style.length).not.toBe(0);
                expect(model.key.length).not.toBe(0);
                expect(model.chordString.length).not.toBe(0);
                expect(model.segments.length).not.toBe(0);
            });
        }).not.toThrow();

    });
    it('should be able to parse and create model for all jazz songs part 3', () => {
        const parser = new IRealProUrlParser();

        expect(() => {
            parser.parse(allJazzSongsUrls[2]).forEach(songProps => {
                const model = new IRealProChartModel(songProps);

                expect(model.title.length).not.toBe(0);
                expect(model.author.length).not.toBe(0);
                expect(model.style.length).not.toBe(0);
                expect(model.key.length).not.toBe(0);
                expect(model.chordString.length).not.toBe(0);
                expect(model.segments.length).not.toBe(0);
            });
        }).not.toThrow();
    });
    it('should be able to parse and create model for all jazz songs part 4', () => {
        const parser = new IRealProUrlParser();

        expect(() => {
            parser.parse(allJazzSongsUrls[3]).forEach(songProps => {
                const model = new IRealProChartModel(songProps);

                expect(model.title.length).not.toBe(0);
                expect(model.author.length).not.toBe(0);
                expect(model.style.length).not.toBe(0);
                expect(model.key.length).not.toBe(0);
                expect(model.chordString.length).not.toBe(0);
                expect(model.segments.length).not.toBe(0);

                model.segments.forEach(segment => {
                    segment.data.forEach(bar => {
                        console.log(bar.chords, model.title);
                        expect(bar.chords?.split(' ').join('')).toEqual(bar.harmony?.map(chord => {
                            return [chord.root, chord.shift, chord.quality, chord.inversion]
                                .filter(item => item)
                                .join('');
                        }).join(''));
                    });
                });
            });
        }).not.toThrow();
    });
    it('should be able to parse and create model for all jazz songs part 5', () => {
        const parser = new IRealProUrlParser();

        expect(() => {
            parser.parse(allJazzSongsUrls[4]).forEach(songProps => {
                const model = new IRealProChartModel(songProps);

                expect(model.title.length).not.toBe(0);
                expect(model.author.length).not.toBe(0);
                expect(model.style.length).not.toBe(0);
                expect(model.key.length).not.toBe(0);
                expect(model.chordString.length).not.toBe(0);
                expect(model.segments.length).not.toBe(0);

                // model.segments.forEach(segment => {
                //     segment.data.forEach(bar => {
                //         expect(bar.chords?.split(' ').join('')).toEqual(bar.harmony?.map(chord => {
                //             return [chord.root, chord.shift, chord.quality, chord.inversion]
                //                 .filter(item => item)
                //                 .join('');
                //         }).join(''));
                //     });
                // });
            });
        }).not.toThrow();
    });

    // it('should export', done => {
    //     const parser = new IRealProUrlParser();
    //     const models = [];
    //     const strings = [];
    //
    //     parser.parse(allJazzSongsUrls[0]).forEach(props => {
    //         strings.push(props);
    //         models.push(new IRealProChartModel(props));
    //     });
    //     parser.parse(allJazzSongsUrls[1]).forEach(props => {
    //         strings.push(props);
    //         models.push(new IRealProChartModel(props));
    //     });
    //     parser.parse(allJazzSongsUrls[2]).forEach(props => {
    //         strings.push(props);
    //         models.push(new IRealProChartModel(props));
    //     });
    //     parser.parse(allJazzSongsUrls[3]).forEach(props => {
    //         strings.push(props);
    //         models.push(new IRealProChartModel(props));
    //     });
    //     parser.parse(allJazzSongsUrls[4]).forEach(props => {
    //         strings.push(props);
    //         models.push(new IRealProChartModel(props));
    //     });
    //
    //     fs.writeFile(
    //         path.join(__dirname, '../../../../all-jazz-model-format.json'),
    //         JSON.stringify(models, null, '    '),
    //         'utf8',
    //         () => {
    //             fs.writeFile(
    //                 path.join(__dirname, '../../../../all-jazz-string-format.json'),
    //                 JSON.stringify(strings, null, '    '),
    //                 'utf8',
    //                 () => {
    //                     done();
    //                 }
    //             );
    //         }
    //     );
    // });
});
