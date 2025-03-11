import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser as loginApi, logoutUser as logoutApi } from '../../api/authApi.ts';
import { AuthState, LoginRequest, LoginResponse } from '../../types/auth.ts';

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
};

// Check if user is already logged in from localStorage
const storedToken = localStorage.getItem('olympiad_token');
const storedUser = localStorage.getItem('olympiad_user');

if (storedToken && storedUser) {
    initialState.isAuthenticated = true;
    initialState.token = storedToken;
    initialState.user = JSON.parse(storedUser);
}

export const loginUser = createAsyncThunk<
    LoginResponse,
    LoginRequest,
    { rejectValue: string }
>('olympiadAuth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await loginApi(credentials);
        // Store token and user in localStorage for persistence
        localStorage.setItem('olympiad_token', response.token);
        localStorage.setItem('olympiad_user', JSON.stringify(response.user));
        return response;
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue('Неизвестная ошибка');
    }
});

export const logoutUser = createAsyncThunk('olympiadAuth/logout', async () => {
    logoutApi();
    return null;
});

const authSlice = createSlice({
    name: 'olympiadAuth',
    initialState,
    reducers: {
        clearAuthError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка авторизации';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.error = null;
            });
    },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;