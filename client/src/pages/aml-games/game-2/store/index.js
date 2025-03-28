// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import answersReducer from './slices/answersSlice.js';
import taskReducer from './slices/taskSlice.jsx';

export const storeGame = configureStore({
  reducer: {
    answers: answersReducer,
    tasks: taskReducer
  },
});

