import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null
}

const AuthSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setEmail: (state, action) =>{
      state.email = action.payload.email;
    },
    clearEmail: (state) =>{
      state.email = null;
    }
  },
});

export const { setEmail, clearEmail } = AuthSlice.actions;

export const authReducer2 = AuthSlice.reducer;
