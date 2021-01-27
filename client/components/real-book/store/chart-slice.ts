import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TChordNotation} from '../types';

interface IChartSliceState {
    notation: TChordNotation;
}

const initialState: IChartSliceState = {
    notation: 'symbolic'
};

const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        setNotation(state, action: PayloadAction<TChordNotation>) {
            if (action.payload === 'symbolic') {
                state.notation = 'symbolic';
            } else if (action.payload === 'numeric') {
                state.notation = 'numeric';
            } else if (action.payload === 'berklee') {
                state.notation = 'berklee';
            }
        }
    }
});

export const {setNotation} = chartSlice.actions;
export default chartSlice.reducer;
