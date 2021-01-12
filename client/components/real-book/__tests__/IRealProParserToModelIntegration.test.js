import IRealProUrlParser from '../IRealProUrlParser';
import IRealProChartModel from '../IRealProChartModel';
const allJazzSongsUrls = require('../playlists/jazz');

describe('', () => {
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
            });
        }).not.toThrow();
    });
});
