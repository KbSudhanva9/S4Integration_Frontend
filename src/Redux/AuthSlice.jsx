import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  // role: null,
  user: null,
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token;
      // state.role = action.payload.role;
      state.user = action.payload.user;
    },
    clearAuth: (state) => {
      state.token = null;
      // state.role = null;
      state.user = null;
    },
  },
});

export const { setAuth, clearAuth } = AuthSlice.actions;

export const authReducer = AuthSlice.reducer;
