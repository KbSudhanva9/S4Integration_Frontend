// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './AuthSlice';

const Store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});

export default Store;
