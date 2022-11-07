import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './countriesSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    countries : countriesReducer,
    theme : themeReducer,
  },
});
