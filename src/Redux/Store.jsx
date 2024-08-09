// // src/store/index.js
// import { configureStore } from '@reduxjs/toolkit';
// import { authReducer } from './AuthSlice';

// const Store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export default Store;


// src/store/index.js

import { configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from './localStorage';
import { authReducer1 } from './AuthSlice';
// import { authReducer2 } from '../Components/VendorInvoicing/ReduxAuth';

const preloadedState = loadState(); // Load state from localStorage

const store = configureStore({
  reducer: {
    auth: authReducer1,
    // email: authReducer2,
  },
  preloadedState, // Set preloaded state
});

// Save state to localStorage on every change
store.subscribe(() => {
  saveState(store.getState().auth);
});

export default store;
