import {combineReducers} from '@reduxjs/toolkit';
import libraryReducer from './library-slice';

const reducer = combineReducers({
    library: libraryReducer
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
