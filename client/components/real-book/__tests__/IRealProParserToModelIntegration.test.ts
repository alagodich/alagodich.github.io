import IRealProUrlParser from '../IRealProUrlParser';
import IRealProChartModel from '../IRealProChartModel';
import allJazzSongsUrls from '../playlists/jazz';
import allLatinSongsUrls from '../playlists/latin';
import allPopSongsUrls from '../playlists/pop';
// import allDixieSongsUrls from '../playlists/dixie';
import {IIRealProChartModelProps} from '../types';
import fs from 'fs';
import path from 'path';
// import {varDump} from '../../../../server/utils';

describe('UrlParser and ChartModel integration', () => {
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
                expect(model.errors.length).toBe(0);
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
                expect(model.errors.length).toBe(0);
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
                expect(model.errors.length).toBe(0);
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
                expect(model.errors.length).toBe(0);
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
                expect(model.errors.length).toBe(0);
            });
        }).not.toThrow();
    });

    it('should be able to parse and create model for all latin songs', () => {
        const parser = new IRealProUrlParser();
        const errors: Array<{ playlist: string; title: string; errors: string[] }> = [];

        allLatinSongsUrls.forEach(playlist => {

            expect(() => {
                parser.parse(playlist.url).forEach(songProps => {
                    const model = new IRealProChartModel(songProps);

                    expect(model.title.length).not.toBe(0);
                    expect(model.author.length).not.toBe(0);
                    expect(model.style.length).not.toBe(0);
                    expect(model.key.length).not.toBe(0);
                    expect(model.chordString.length).not.toBe(0);
                    expect(model.segments.length).not.toBe(0);

                    if (model.errors.length > 0) {
                        errors.push({playlist: playlist.title, title: model.title, errors: model.errors});
                    }
                });
            }).not.toThrow();

        });

        expect(errors).toEqual([
            {
                playlist: 'Samba de Roda List',
                title: 'Alguém me Avisou',
                errors: ['Repeating empty bars [ r']
            },
            {
                playlist: 'Samba de Roda List',
                title: 'Amor e Festança',
                errors: ['Closing bar as a first part: [ ||||Z.']
            },
            {
                playlist: 'Samba de Roda List',
                title: 'Aquarela Brasileira',
                errors: ['Repeating empty bars [ r']
            },
            {
                playlist: 'Samba de Roda List',
                title: 'Boca Sem Dente  - AAB AB',
                errors: ['Repeating empty bars [ r']
            },
            {
                playlist: 'Samba de Roda List',
                title: 'Castelo de Cera - AB CB',
                errors: ['Repeating empty bars { r']
            },
            {
                playlist: 'Samba de Roda List',
                title: 'Favela 2',
                errors: ['Repeating empty bars { r']
            },
            {
                playlist: 'Samba de Roda List',
                title: 'Samba Pras Moças - In ABA C',
                errors: ['Repeating empty bars { r', 'Repeating empty bars [ r']
            }
        ]);
    });

    it('should be able to parse and create model for all pop songs', () => {
        const parser = new IRealProUrlParser();
        const errors: Array<{ playlist: string; title: string; errors: string[] }> = [];

        allPopSongsUrls.forEach(playlist => {

            expect(() => {
                parser.parse(playlist.url).forEach(songProps => {
                    const model = new IRealProChartModel(songProps);

                    expect(model.title.length).not.toBe(0);
                    expect(model.author.length).not.toBe(0);
                    expect(model.style.length).not.toBe(0);
                    expect(model.key.length).not.toBe(0);
                    expect(model.chordString.length).not.toBe(0);
                    expect(model.segments.length).not.toBe(0);

                    if (model.errors.length > 0) {
                        errors.push({playlist: playlist.title, title: model.title, errors: model.errors});
                    }
                });
            }).not.toThrow();

        });

        expect(errors).toEqual([]);
    });

    // xit('// TODO this throws. Should be able to parse and create model for all dixieland jazz songs', () => {
    //     const parser = new IRealProUrlParser();
    //     const errors: Array<{ playlist: string; title: string; errors: string[] }> = [];
    //
    //     allDixieSongsUrls.forEach(playlist => {
    //
    //         expect(() => {
    //             parser.parse(playlist.url).forEach(songProps => {
    //                 const model = new IRealProChartModel(songProps);
    //
    //                 expect(model.title.length).not.toBe(0);
    //                 expect(model.author.length).not.toBe(0);
    //                 expect(model.style.length).not.toBe(0);
    //                 expect(model.key.length).not.toBe(0);
    //                 expect(model.chordString.length).not.toBe(0);
    //                 expect(model.segments.length).not.toBe(0);
    //
    //                 if (model.errors.length > 0) {
    //                     errors.push({playlist: playlist.title, title: model.title, errors: model.errors});
    //                 }
    //             });
    //         }).not.toThrow();
    //
    //     });
    //
    //     expect(errors.length).toBe(0);
    // });

    xit('should export', done => {
        const parser = new IRealProUrlParser();
        const models: IRealProChartModel[] = [];
        const strings: IIRealProChartModelProps[] = [];

        parser.parse(allJazzSongsUrls[0]).forEach(props => {
            strings.push(props);
            models.push(new IRealProChartModel(props));
        });
        parser.parse(allJazzSongsUrls[1]).forEach(props => {
            strings.push(props);
            models.push(new IRealProChartModel(props));
        });
        parser.parse(allJazzSongsUrls[2]).forEach(props => {
            strings.push(props);
            models.push(new IRealProChartModel(props));
        });
        parser.parse(allJazzSongsUrls[3]).forEach(props => {
            strings.push(props);
            models.push(new IRealProChartModel(props));
        });
        parser.parse(allJazzSongsUrls[4]).forEach(props => {
            strings.push(props);
            models.push(new IRealProChartModel(props));
        });

        fs.writeFile(
            path.join(__dirname, '../../../../all-jazz-model-format.json'),
            JSON.stringify(models),
            'utf8',
            () => {
                fs.writeFile(
                    path.join(__dirname, '../../../../all-jazz-string-format.json'),
                    JSON.stringify(strings),
                    'utf8',
                    () => {
                        done();
                    }
                );
            }
        );
    });
});
