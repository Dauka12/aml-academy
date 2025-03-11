import axios from 'axios';
import { RegisterStudentRequest, RegisterStudentResponse } from '../types/student';

// Create axios instance with base URL and default headers
const olympiadApi = axios.create({
    baseURL: '/olympiad/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

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