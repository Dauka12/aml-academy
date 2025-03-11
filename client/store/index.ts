// ...existing code...

// Import the auth reducer
import authReducer from '../features/olympiad/store/auth/authSlice';

// Add to your root reducer configuration
const rootReducer = {
  // ...existing reducers...
  auth: authReducer,
};

// ...existing code...

// Update RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
