import axios from 'axios';
import { LoginRequest, LoginResponse } from '../types/auth';
import { RegisterStudentRequest, RegisterStudentResponse } from '../types/student';

// Create axios instance with base URL and default headers
const olympiadApi = axios.create({
    baseURL: '/olympiad/api',
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
        // This is a placeholder - will be replaced with actual API call when ready
        // For now, simulate API call with mock data

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock successful response for testing
        if (credentials.iin === '123456789012' && credentials.password === 'password') {
            const response: LoginResponse = {
                token: 'mock-jwt-token',
                user: {
                    id: 1,
                    firstname: 'Айдар',
                    lastname: 'Нурланов',
                    middlename: 'Саматович',
                    iin: '123456789012',
                    phone: '+7 (777) 123-45-67',
                    university: 'Казахский Национальный Университет',
                    email: 'aidar@example.com'
                }
            };

            return response;
        }

        // Mock error for invalid credentials
        throw new Error('Неверный ИИН или пароль');
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