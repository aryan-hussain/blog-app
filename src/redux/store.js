import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './slices/blogSlice';
import articleSlice from './slices/articleSlice';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    articles:articleSlice
  },
});