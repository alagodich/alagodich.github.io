/* eslint max-len: 0 */

import {useSelector} from 'react-redux';
import allJazzSongsUrls from '../playlists/jazz';
import allLatinSongsUrls from '../playlists/latin';
import allPopSongsUrls from '../playlists/pop';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => jest.fn(() => {
    })
}));

jest.mock('react-router-dom', () => ({
    useHistory: () => {
    }
}));

import Chart from '../Chart';
import React from 'react';
import {create} from 'react-test-renderer';
import IRealProUrlParser from '../IRealProUrlParser';
import {IIRealProChartModelProps} from '../types';

const emptyBootstrapProps = {match: {params: {playlist: 'jazz', songId: 2}}, history: {}, location: {}} as any;


describe('Chart Component Smoke Test', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    function renderSongsInAllNotations(songProps: IIRealProChartModelProps) {
        (useSelector as any).mockImplementation(() => ({
            songs: [songProps],
            activePlaylist: 'jazz',
            activeSong: 0
        }));

        create(<Chart {...emptyBootstrapProps} />);

        // If heavy test needed for all notations
        // (useSelector as any).mockImplementation(() => ({
        //     songs: [songProps],
        //     activePlaylist: 'jazz',
        //     activeSong: 0,
        //     notation: 'numeric'
        // }));
        //
        // create(<Chart {...emptyBootstrapProps} />);
        //
        // (useSelector as any).mockImplementation(() => ({
        //     songs: [songProps],
        //     activePlaylist: 'jazz',
        //     activeSong: 0,
        //     notation: 'berklee'
        // }));
        //
        // create(<Chart {...emptyBootstrapProps} />);
    }

    it('should render all jazz part 1', () => {
        const parser = new IRealProUrlParser();

        expect(() => {
            parser.parse(allJazzSongsUrls[0]).forEach(songProps => {
                renderSongsInAllNotations(songProps);
            });
        }).not.toThrow();
    });
    it('should render all jazz part 2', () => {
        const parser = new IRealProUrlParser();

        expect(() => {
            parser.parse(allJazzSongsUrls[1]).forEach(songProps => {
                renderSongsInAllNotations(songProps);
            });
        }).not.toThrow();
    });
    it('should render all jazz part 3', () => {
        const parser = new IRealProUrlParser();

        expect(() => {
            parser.parse(allJazzSongsUrls[2]).forEach(songProps => {
                renderSongsInAllNotations(songProps);
            });
        }).not.toThrow();
    });
    it('should render all jazz part 4', () => {
        const parser = new IRealProUrlParser();

        expect(() => {
            parser.parse(allJazzSongsUrls[3]).forEach(songProps => {
                renderSongsInAllNotations(songProps);
            });
        }).not.toThrow();
    });
    it('should render all jazz part 5', () => {
        const parser = new IRealProUrlParser();

        expect(() => {
            parser.parse(allJazzSongsUrls[4]).forEach(songProps => {
                renderSongsInAllNotations(songProps);
            });
        }).not.toThrow();
    });

    it('should render all latin songs', () => {
        const parser = new IRealProUrlParser();

        expect(() => {
            allLatinSongsUrls.forEach(playlist => {
                parser.parse(playlist.url).forEach(songProps => {
                    renderSongsInAllNotations(songProps);
                });
            });
        }).not.toThrow();
    });

    it('should render all pop songs', () => {
        const parser = new IRealProUrlParser();

        expect(() => {
            allPopSongsUrls.forEach(playlist => {
                parser.parse(playlist.url).forEach(songProps => {
                    renderSongsInAllNotations(songProps);
                });
            });
        }).not.toThrow();
    });

});
