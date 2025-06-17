import { createSlice } from '@reduxjs/toolkit'

const initState = {
    auth: false,
    userInfo: {}
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        saveUserLogin: (state, action) => {
            state.auth = true;
            state.userInfo = action.payload;
        },
        saveUserLogout: (state) => {
            state.auth = false;
            state.userInfo = {};
        }
    }
});