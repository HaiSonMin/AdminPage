import { configureStore } from '@reduxjs/toolkit';
import { layoutSlice } from './slices';
const store = configureStore({
  reducer: {
    layout: layoutSlice,
  },
});

export default store;
