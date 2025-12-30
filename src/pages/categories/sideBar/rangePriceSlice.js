import { createSlice } from "@reduxjs/toolkit";

const initState = {
    regex: null,
    minPrice: null,
    maxPrice: null
}

export const rangePriceSlice = createSlice({
    name: 'filter',
    initialState: initState,
    reducers: {
        rangePrice(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});