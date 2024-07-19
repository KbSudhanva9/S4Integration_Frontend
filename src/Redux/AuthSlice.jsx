// src/store/AuthSlice.js
import { createSlice } from '@reduxjs/toolkit';

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    // token: null,
    // role: null,
  },
  reducers: {
    setAuth: (state, action) => {
    //   state.token = action.payload.token;
    //   state.role = action.payload.role;
    },
    clearAuth: (state) => {
    //   state.token = null;
    //   state.role = null;
    },
  },
});

export const { setAuth, clearAuth } = AuthSlice.actions;

export default AuthSlice.reducer;
