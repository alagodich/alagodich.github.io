import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IIRealProChartModelProps} from '../types';
import {AppThunk} from './index';
import IRealProUrlParser from '../IRealProUrlParser';
import {default as _escapeRegExp} from 'lodash/escapeRegExp';
import {default as _filter} from 'lodash/filter';

interface ILibraryState {
    displayType: 'playlist' | 'chart';
    songs: IIRealProChartModelProps[];
    filteredSongs: IIRealProChartModelProps[];
    isLoading: boolean;
    error: string | null;
    activePlaylist: string | null;
    activeSong: number | null;
    searchFilter: string;
    showAnalyzeSegment: boolean;
}

interface ILibraryLoadPayload {
    playlist: string;
    songs: IIRealProChartModelProps[];
}

const initialState: ILibraryState = {
    displayType: 'playlist',
    songs: [],
    filteredSongs: [],
    isLoading: false,
    error: null,
    activePlaylist: null,
    activeSong: null,
    searchFilter: '',
    showAnalyzeSegment: false
};

const librarySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
            state.searchFilter = '';
        },
        setPlaylist(state, action: PayloadAction<ILibraryLoadPayload>) {
            state.activePlaylist = action.payload.playlist;
            state.songs = action.payload.songs;
            state.filteredSongs = action.payload.songs;
            state.isLoading = false;
            state.searchFilter = '';
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.isLoading = false;
            state.searchFilter = '';
        },
        setActiveChart(state, action: PayloadAction<number>) {
            state.displayType = 'chart';
            state.activeSong = action.payload;
            state.isLoading = false;
        },
        closeActiveChart(state) {
            state.displayType = 'playlist';
            state.activeSong = null;
            state.error = null;
        },
        setSearchFilter(state, action: PayloadAction<string>) {
            const regExp = new RegExp(_escapeRegExp(action.payload), 'i');
            const isMatch = (item: IIRealProChartModelProps) => regExp.test(item.title + item.author);

            state.filteredSongs = _filter(state.songs, isMatch);
            state.searchFilter = action.payload;
        },
        toggleAnalyzeSegment(state) {
            state.showAnalyzeSegment = !state.showAnalyzeSegment;
        }
    }
});

export const {
    startLoading,
    setPlaylist,
    setError,
    setActiveChart,
    closeActiveChart,
    setSearchFilter,
    toggleAnalyzeSegment
} = librarySlice.actions;

export default librarySlice.reducer;

export const loadSong = (playlist: string, songId: number): AppThunk => (dispatch, getState) => {
    if (getState().library.activePlaylist !== playlist) {
        dispatch(fetchPlaylist(playlist, songId));
    } else if (!getState().library.songs[songId]) {
        dispatch(setError(`Cannot find song number ${songId}`));
    } else {
        dispatch(setActiveChart(songId));
    }
};

export const fetchPlaylist = (name: string, songId?: number): AppThunk => dispatch => {
    dispatch(startLoading());
    // eslint-disable-next-line no-inline-comments
    import(
        /* webpackChunkName: "[request]" */
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        /* webpackPreload: true */
        // TODO set module: ESNext in tsconfig for this to work
        `./../playlists/${name}`
    )
        .then(data => {
            const parser = new IRealProUrlParser();
            const songs: IIRealProChartModelProps[] = [];

            data.default.forEach((chunk: string | {title: string; url: string}) => {
                if (typeof chunk === 'string') {
                    songs.push(...parser.parse(chunk));
                } else {
                    songs.push(...parser.parse(chunk.url));
                }
            });

            const indexedSongs = songs.map((song, index) => {
                song.id = index;
                return song;
            });

            dispatch(setPlaylist({songs: indexedSongs, playlist: name}));

            if (songId !== undefined) {
                if (!indexedSongs[songId]) {
                    dispatch(setError(`Cannot find song number ${songId}`));
                } else {
                    dispatch(setActiveChart(songId));
                }
            }
        })
        .catch(error => {
            dispatch(setError(error.toString()));
        });
};
