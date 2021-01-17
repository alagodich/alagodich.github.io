import {configureStore, Action} from '@reduxjs/toolkit';
import reducer, {RootState} from './reducer';
import {ThunkAction} from 'redux-thunk';

const store = configureStore({reducer});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
export default store;
