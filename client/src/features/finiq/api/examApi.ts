
import axios from 'axios';
import base_url from '../../../settings/base_url.js';
import {
    ExamCreateRequest,
    ExamQuestionRequest,
    ExamQuestionResponse,
    ExamResponse
} from '../types/exam';
import { TestCategory } from '../types/testCategory';

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

// Exams API
export const createExam = async (examData: ExamCreateRequest): Promise<ExamResponse> => {
    try {
        const response = await api.post<ExamResponse>('/exam/create', examData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Ошибка при создании экзамена');
    }
};

export const getAllExams = async (): Promise<ExamResponse[]> => {
    try {
        const response = await api.get<ExamResponse[]>('/exam/all');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Ошибка при получении списка экзаменов');
    }
};

export type RewardTypeAPI = 'certificate' | 'diploma';
export interface RewardEligibilityAPIResponse {
    rewardType?: RewardTypeAPI | RewardTypeAPI[]; // может прийти строка или массив
}

export const getCertificate = async (examSessionId: number): Promise<Blob> => {
    try {
        const response = await api.get(`/exam/certificate/${examSessionId}`, { responseType: 'blob' });
        return response.data as Blob;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Ошибка при получении сертификата');
    }
};

export const getDiploma = async (examSessionId: number): Promise<Blob> => {
    try {
        const response = await api.get(`/exam/diploma/${examSessionId}`, { responseType: 'blob' });
        return response.data as Blob;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Ошибка при получении диплома');
    }
};

export const getRewardEligibility = async (examSessionId: number): Promise<RewardEligibilityAPIResponse> => {
    try {
        // endpoint в slice использует 'eligibile' – синхронизируемся
        const response = await api.get<RewardEligibilityAPIResponse>(`/exam/reward/eligible/${examSessionId}`);
        console.log('Reward eligibility response: ', response);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Ошибка при получении информации о достижении');
    }
};

export const getAllStudentExams = async (): Promise<ExamResponse[]> => {
    try {
        const response = await api.get<ExamResponse[]>('/exam/student/all');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Ошибка при получении списка экзаменов');
    }
};

export const getExamById = async (id: number): Promise<ExamResponse> => {
    try {
        const response = await api.get<ExamResponse>(`/exam/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Ошибка при получении экзамена');
    }
};

export const deleteExam = async (id: number): Promise<void> => {
    try {
        await api.delete(`/exam/${id}`);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Ошибка при удалении экзамена');
    }
};

// Questions API
export const createQuestion = async (questionData: ExamQuestionRequest, testId: number): Promise<ExamQuestionResponse> => {
    try {
        const response = await api.post<ExamQuestionResponse>(`/exam-question/create/${testId}`, questionData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Ошибка при создании вопроса');
    }
};

export const updateQuestion = async (questionData: ExamQuestionRequest, id: number): Promise<void> => {
    try {
        await api.patch(`/exam-question/${id}`, questionData);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Ошибка при обновлении вопроса');
    }
};

export const deleteQuestion = async (id: number): Promise<void> => {
    try {
        await api.delete(`/exam-question/${id}`);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Ошибка при удалении вопроса');
    }
};

export const getAllCategories = async (): Promise<TestCategory[]> => {
    try {
        const response = await api.get<TestCategory[]>('/exam/all-categories');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Ошибка при получении категорий');
    }
};