import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { registerStudent } from '../../api/authApi.ts';
import { RegisterStudentRequest, RegisterStudentResponse } from '../../types/student.ts';

interface RegistrationState {
    isLoading: boolean;
    success: boolean;
    error: string | null;
    specificError: string | null; // Added field for specific error identification
}

const initialState: RegistrationState = {
    isLoading: false,
    success: false,
    error: null,
    specificError: null, // Initialize new field
};

export const registerStudentThunk = createAsyncThunk<
    RegisterStudentResponse,
    RegisterStudentRequest,
    { rejectValue: { message: string, isSpecific: boolean } }
>('olympiadRegistration/register', async (studentData, { rejectWithValue }) => {
    try {
        const response = await registerStudent(studentData);
        return response;
    } catch (error) {
        if (error instanceof Error) {
            // Check for the specific IIN error
            const isIinError = error.message === 'Student with this IIN already exists';
            return rejectWithValue({ 
                message: error.message, 
                isSpecific: isIinError 
            });
        }
        return rejectWithValue({ 
            message: 'Unknown error occurred', 
            isSpecific: false 
        });
    }
});

const registrationSlice = createSlice({
    name: 'olympiadRegistration',
    initialState,
    reducers: {
        resetRegistration: (state) => {
            state.success = false;
            state.error = null;
            state.specificError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerStudentThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.specificError = null;
            })
            .addCase(registerStudentThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.success = true;
                state.error = null;
                state.specificError = null;
            })
            .addCase(registerStudentThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                
                if (action.payload?.isSpecific) {
                    state.specificError = action.payload.message;
                    state.error = null;
                } else {
                    state.error = action.payload?.message || 'Ошибка при регистрации';
                    state.specificError = null;
                }
            });
    },
});

export const { resetRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;