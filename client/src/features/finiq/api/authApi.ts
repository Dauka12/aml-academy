import axios from 'axios';
import base_url from '../../../settings/base_url.js';
import { LoginRequest, LoginResponse } from '../types/auth';
import { RegisterStudentRequest, RegisterStudentResponse } from '../types/student';

interface ResetWithCodePayload {
    email: string;
    code: string;
    newPassword: string;
}

interface VerifyCodePayload {
    email: string;
    code: string;
}

// Create axios instance with base URL and default headers
const olympiadApi = axios.create({
    baseURL: `${base_url}/api/olympiad`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Custom type guard for Axios errors
interface AxiosError {
    response?: {
        data?: {
            message?: string;
        };
        status?: number;
    };
}

function isAxiosError(error: any): error is AxiosError {
    return error && typeof error === 'object' && 'response' in error;
}

// Add request interceptor to attach the token
olympiadApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('olympiad_token');
        if (token) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const registerStudent = async (studentData: RegisterStudentRequest): Promise<RegisterStudentResponse> => {
    try {
        const response = await olympiadApi.post<RegisterStudentResponse>('/auth/register', studentData);
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            // Return the exact error message from the backend
            if (error.response?.status === 400 && error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
        throw new Error('Registration failed');
    }
};

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await olympiadApi.post<LoginResponse>('/auth/login', credentials);
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Ошибка авторизации');
        }
        throw error;
    }
};

export const logoutUser = (): void => {
    localStorage.removeItem('olympiad_token');
    localStorage.removeItem('olympiad_user');
};

export const sendResetCode = async (email: string): Promise<string> => {
    try {
        const response = await olympiadApi.post<string>('/auth/send-reset-code', { email });
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Не удалось отправить код подтверждения');
        }
        throw new Error('Не удалось отправить код подтверждения');
    }
};

export const verifyResetCode = async (payload: VerifyCodePayload): Promise<string> => {
    try {
        const response = await olympiadApi.post<string>('/auth/verify-reset-code', payload);
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Код подтверждения недействителен');
        }
        throw new Error('Код подтверждения недействителен');
    }
};

export const resetPasswordWithCode = async (payload: ResetWithCodePayload): Promise<string> => {
    try {
        const response = await olympiadApi.post<string>('/auth/reset-password-with-code', payload);
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Не удалось сбросить пароль');
        }
        throw new Error('Не удалось сбросить пароль');
    }
};