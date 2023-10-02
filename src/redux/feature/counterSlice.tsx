import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ICounter {
  count: number;
}

const initialState: ICounter = {
  count: 0,
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        }
    }
});

export const {increment} = counterSlice.actions;
export const counterSelector = (state: RootState) => state.counterReducer;
export default counterSlice.reducer;
