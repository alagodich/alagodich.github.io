import {createSlice} from '@reduxjs/toolkit';
import {IChordNotation} from '../types';

interface IChartSliceState {
    notation: IChordNotation;
}

const initialState: IChartSliceState = {
    notation: 'symbolic'
};

const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        toggleNotation(state) {
            if (state.notation === 'symbolic') {
                state.notation = 'numeric';
            } else if (state.notation === 'numeric') {
                state.notation = 'symbolic';
            }
        }
    }
});

export const {toggleNotation} = chartSlice.actions;
export default chartSlice.reducer;
