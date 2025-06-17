import { createSlice } from "@reduxjs/toolkit";

const initState = {
    minPrice: null,
    maxPrice: null
}

export const rangePriceSlice = createSlice({
    name: 'filter',
    initialState: initState,
    reducers: {
        rangePrice(state, action) {
            state.minPrice = action.payload.minPrice;
            state.maxPrice = action.payload.maxPrice;
        },
    },
});