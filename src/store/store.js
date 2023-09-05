import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './slice';

const store = configureStore({
  reducer: dataSlice,
  middleware: [],
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [],
});

export default store;
