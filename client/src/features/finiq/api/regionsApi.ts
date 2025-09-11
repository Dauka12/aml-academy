import axios from 'axios';
import base_url from '../../../settings/base_url.js';

// Region interface
export interface Region {
    id: number;
    nameRus: string;
    nameKaz: string;
}

const API_URL = `${base_url}/api`;

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Get all regions
export const getAllRegions = async (): Promise<Region[]> => {
    try {
        const response = await api.get<Region[]>('/regions');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Ошибка при получении списка регионов');
    }
};