import axios from 'axios';
import base_url from '../../../settings/base_url.js';
import {
    SessionExamResponse,
    StudentExamSessionRequest,
    StudentExamSessionResponses,
    UpdateAnswerRequest,
    SubmitAnswersRequest,
} from '../types/testSession';

const API_URL = `${base_url}/api/olympiad/exam/session`;

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

// Start an exam session
export const startExamSession = async (request: StudentExamSessionRequest): Promise<SessionExamResponse> => {
    try {
        const response = await api.post<SessionExamResponse>('/start', request);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to start exam session');
    }
};

// End an exam session with all answers
export const endExamSession = async (examSessionId: number, answers?: { answers: { questionId: number, selectedOptionId: number }[] }): Promise<SessionExamResponse> => {
    try {
        const response = await api.post<SessionExamResponse>(
            `/end-session/${examSessionId}`, 
            answers || { answers: [] }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to end exam session');
    }
};

// Get a specific exam session
export const getExamSession = async (examSessionId: number): Promise<SessionExamResponse> => {
    try {
        const response = await api.post<SessionExamResponse>(`/student/${examSessionId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to retrieve exam session');
    }
};

// Get all sessions for the authenticated student
export const getStudentExamSessions = async (): Promise<StudentExamSessionResponses[]> => {
    try {
        const response = await api.get<StudentExamSessionResponses[]>('/student');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to retrieve exam sessions');
    }
};

// Update an answer during an active exam
export const updateAnswer = async (request: UpdateAnswerRequest): Promise<void> => {
    try {
        await api.post('/answer/update', request);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to update answer');
    }
};

// Delete an answer during an active exam
export const deleteAnswer = async (request: UpdateAnswerRequest): Promise<void> => {
    try {
        await api.request({
            url: '/answer/delete',
            method: 'DELETE',
            data: request,
        });
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to delete answer');
    }
};