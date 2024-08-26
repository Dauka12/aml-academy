// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import answersReducer from './slices/answersSlice.js';
import taskReducer from './slices/taskSlice.js';

export const store = configureStore({
  reducer: {
    answers: answersReducer,
    tasks: taskReducer
  },
});

