import axios from 'axios';
import base_url from '../../../settings/base_url.js';

const API_URL = `${base_url}/api/olympiad`;

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add request interceptor for auth token
api.interceptors.request.use(
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

// Statistics API
export const getStudentCount = async (): Promise<Record<string, number>> => {
    try {
        const response = await api.get<Record<string, number>>('/exam/statistics/students/count');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Ошибка при получении статистики');
    }
};
