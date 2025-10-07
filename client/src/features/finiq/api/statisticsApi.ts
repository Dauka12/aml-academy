import axios from 'axios';
import base_url from '../../../settings/base_url.js';
import type { RegionCategoryTopStudents } from '../types/exam.ts';

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

export const getTopStudentsByRegion = async (regionId: number): Promise<RegionCategoryTopStudents[]> => {
    try {
        const response = await api.get<RegionCategoryTopStudents[]>(`/exam/statistics/top-students/region/${regionId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Не удалось загрузить статистику по региону');
    }
};

export const exportTopStudentsByRegionExcel = async (
    regionId: number
): Promise<{ blob: Blob; filename?: string }> => {
    try {
        const response = await api.get<Blob>(
            `/exam/statistics/top-students/region/${regionId}/export/excel`,
            {
                responseType: 'blob'
            }
        );

        const contentDisposition = response.headers?.['content-disposition'];
        let filename: string | undefined;

        if (contentDisposition) {
            const match = contentDisposition.match(/filename\*=UTF-8''(.+)|filename="([^"]+)"/);
            if (match) {
                filename = decodeURIComponent(match[1] || match[2]);
            }
        }

        return { blob: response.data, filename };
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Не удалось скачать Excel-файл');
    }
};
