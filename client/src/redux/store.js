// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import localStorageMiddleware from './localStorageMiddleware';
import newsReducer from './slices/newsSlice';

const preloadedState = {
    news: JSON.parse(localStorage.getItem('news') || '{}'),
};


const store = configureStore({
    reducer: {
        news: newsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
    preloadedState,
});

export default store;
