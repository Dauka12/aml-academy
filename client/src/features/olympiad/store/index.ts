import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.ts';
import examReducer from './slices/examSlice.ts';
import registrationReducer from './slices/registrationSlice.ts';

export const olympiadStore = configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
    exam: examReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof olympiadStore.getState>;
export type AppDispatch = typeof olympiadStore.dispatch;