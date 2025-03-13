import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import examReducer from './slices/examSlice';
import registrationReducer from './slices/registrationSlice';

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