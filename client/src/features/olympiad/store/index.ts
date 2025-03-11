import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './slices/registrationSlice.ts';

export const olympiadStore = configureStore({
    reducer: {
        registration: registrationReducer,
    },
});

export type RootState = ReturnType<typeof olympiadStore.getState>;
export type AppDispatch = typeof olympiadStore.dispatch;