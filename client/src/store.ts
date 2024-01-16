import { configureStore } from '@reduxjs/toolkit';
import { layoutSlice, itemSlice } from './slices';
const store = configureStore({
  reducer: {
    item: itemSlice,
    layout: layoutSlice,
  },
});

export default store;
