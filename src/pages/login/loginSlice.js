import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchDataFromAPI } from '../../ultis/api';
import { IDX_BE_URL } from '../../ultis/setting';
import { postDataToAPI } from '../../ultis/postApi';
import axios from 'axios';

const initState = {
    auth: false,
    userInfo: {},
    loading: false,
    error: null,
}

// Async thunk for login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
      try {
        const data = await postDataToAPI('/api/user/login', userData);
        if (data?.authenticated) {
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('refreshToken', data.refreshToken);
          console.log("loginUser data: ", data);
          const userInfo = await fetchDataFromAPI('/api/user/me', data.token);
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          return userInfo; // Return userInfo as the fulfilled payload
        } else {
          return rejectWithValue('Username or password incorrect');
        }
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);

// Async thunk for login
export const loginUserGoogle = createAsyncThunk(
  'auth/loginGoogle',
  async ({ jwt, refreshToken }, { rejectWithValue }) => {
    try {
        localStorage.setItem('jwt', jwt);
        localStorage.setItem('refreshToken', refreshToken);
        const userInfo = await fetchDataFromAPI('/api/user/me', jwt);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        return userInfo; // Return userInfo as the fulfilled payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserInfo = createAsyncThunk(
    'auth/fetchUserInfo',
    async (_, { rejectWithValue }) => {
      const jwt = localStorage.getItem("jwt");
      try {
        if (jwt) {
          const userInfo = await fetchDataFromAPI("/api/user/me", jwt);
          if (userInfo?.error) {
            return rejectWithValue(userInfo.message || 'Lỗi lấy thông tin người dùng');
          }
          return userInfo;
        } else {
          const { data } = await axios.get(IDX_BE_URL + "/api/user/google/me", {
            withCredentials: true
          });
          return data;
        }
      } catch (err) {
        return rejectWithValue(err.message || 'Lỗi lấy thông tin người dùng');
      }
    }
);

// Async thunk: logout
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
      try {
        const isOauth = JSON.parse(localStorage.getItem("userInfo"))?.isOauth;
        if (isOauth) {
          await axios.get(IDX_BE_URL + "/logout", {
            withCredentials: true
          });
        }
        localStorage.clear();
      } catch (err) {
        return rejectWithValue(err.message || 'Lỗi đăng xuất');
      }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => { 
        builder
            // login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.auth = true;
                state.userInfo = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
          
          // login with Google
            .addCase(loginUserGoogle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUserGoogle.fulfilled, (state, action) => {
                state.loading = false;
                state.auth = true;
                state.userInfo = action.payload;
            })
            .addCase(loginUserGoogle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        
            // fetch user info
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.auth = true;
                state.userInfo = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
              state.auth = false;
              state.userInfo = {};
              state.loading = false;
              state.error = action.payload;
            })
        
            // logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.auth = false;
                state.userInfo = {};
                state.loading = false;
                state.error = null;
            });
    }
});