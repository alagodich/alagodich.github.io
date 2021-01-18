import {combineReducers} from '@reduxjs/toolkit';
import libraryReducer from './library-slice';
import chartReducer from './chart-slice';

const reducer = combineReducers({
    library: libraryReducer,
    chart: chartReducer
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
