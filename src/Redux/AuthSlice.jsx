import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  // role: null,
  user: null,
  // email: null
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token;
      // state.role = action.payload.role;
      state.user = action.payload.user;
      // state.email = action.payload.email;
    },
    clearAuth: (state) => {
      state.token = null;
      // state.role = null;
      state.user = null;
      // state.email = null;
    },
    // setEmail: (state, action) =>{
    //   state.email = action.payload.email;
    // },
    // clearEmail: (state) =>{
    //   state.email = null;
    // }
  },
});

export const { setAuth, clearAuth } = AuthSlice.actions;

export const authReducer1 = AuthSlice.reducer;
