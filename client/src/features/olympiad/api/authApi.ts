import axios from 'axios';
import { LoginRequest, LoginResponse } from '../types/auth';
import { RegisterStudentRequest, RegisterStudentResponse } from '../types/student';

// Create axios instance with base URL and default headers
const olympiadApi = axios.create({
    baseURL: 'https://localhost:8443/api/olympiad',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to attach the token
olympiadApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('olympiad_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const registerStudent = async (studentData: RegisterStudentRequest): Promise<RegisterStudentResponse> => {
    try {
        // This is a placeholder - replace with actual API endpoint when available
        const response = await olympiadApi.post<RegisterStudentResponse>('/auth/register', studentData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
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
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Ошибка авторизации');
        }
        throw error;
    }
};

export const logoutUser = (): void => {
    localStorage.removeItem('olympiad_token');
    localStorage.removeItem('olympiad_user');
};