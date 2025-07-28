import { Webinar } from '../types/webinar';
import { WebinarSignup } from '../types/webinarSignup';
import base_url from '../../../settings/base_url';
import axiosWithAuth from './axiosInterceptor';

// Types for request payloads
export interface CreateWebinarData {
  title: string;
  description?: string;
  startDate: string;
  link?: string;
  isActive?: boolean;
  imageFile?: File | null;
}

export interface UpdateWebinarData {
  title?: string;
  description?: string;
  startDate?: string;
  link?: string;
  isActive?: boolean;
  imageFile?: File | null;
}

export interface WebinarSignupData {
  questions?: string;
}

export interface GuestSignupData {
  email: string;
  name: string;
  questions?: string;
}

// Base API URL
const API_URL = `${base_url}/api/webinars`;

/**
 * Webinar API service
 */
const webinarApi = {
  /**
   * Get all webinars
   */
  getAllWebinars: async (): Promise<Webinar[]> => {
    const response = await axiosWithAuth.get(API_URL);
    return response.data;
  },
  getAllWebinarsAdmin: async (): Promise<Webinar[]> => {
    const response = await axiosWithAuth.get(`${API_URL}/admin/all`);
    console.log('Fetched webinars for admin:', response.data.data);
    
    return response.data;
  },

  /**
   * Get a single webinar by ID
   */
  getWebinarById: async (id: number): Promise<Webinar> => {
    const response = await axiosWithAuth.get(`${API_URL}/${id}`);
    return response.data;
  },

  /**
   * Create a new webinar
   */
  createWebinar: async (data: CreateWebinarData): Promise<Webinar> => {
    const formData = new FormData();
    formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    formData.append('startDate', data.startDate);
    if (data.link) formData.append('link', data.link);
    if (data.isActive !== undefined) formData.append('isActive', String(data.isActive));
    if (data.imageFile) formData.append('imageFile', data.imageFile);

    const response = await axiosWithAuth.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
    
    return response.data;
  },

  /**
   * Update an existing webinar
   */
  updateWebinar: async (id: number, data: UpdateWebinarData): Promise<Webinar> => {
    const formData = new FormData();
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.startDate) formData.append('startDate', data.startDate);
    if (data.link) formData.append('link', data.link);
    if (data.isActive !== undefined) formData.append('isActive', String(data.isActive));
    if (data.imageFile) formData.append('imageFile', data.imageFile);

    const response = await axiosWithAuth.put(`${API_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },

  /**
   * Delete a webinar
   */
  deleteWebinar: async (id: number): Promise<void> => {
    await axiosWithAuth.delete(`${API_URL}/${id}`);
  },

  /**
   * Signup for a webinar (authenticated user)
   */
  signupForWebinar: async (webinarId: number, data: WebinarSignupData): Promise<WebinarSignup> => {
    const response = await axiosWithAuth.post(`${API_URL}/${webinarId}/signup`, data);
    return response.data;
  },

  /**
   * Guest signup for a webinar
   */
  guestSignupForWebinar: async (webinarId: number, data: GuestSignupData): Promise<WebinarSignup> => {
    const response = await axiosWithAuth.post(`${API_URL}/${webinarId}/signup/guest`, data);
    return response.data;
  },

  /**
   * Get signups for a webinar (admin only)
   */
  getWebinarSignups: async (webinarId: number): Promise<WebinarSignup[]> => {
    const response = await axiosWithAuth.get(`${API_URL}/${webinarId}/signups`);
    return response.data;
  },

  /**
   * Get signup count for a webinar
   */
  getsignupsCount: async (webinarId: number): Promise<number> => {
    const response = await axiosWithAuth.get(`${API_URL}/${webinarId}/signups/count`);
    return response.data;
  },

  /**
   * Get detailed webinars information for admins/managers
   * Includes full participant information and extended details
   */
  getAdminWebinars: async (): Promise<{data: {webinars: Webinar[]}}> => {
    const response = await axiosWithAuth.get(`${API_URL}/admin/all`);
    return response.data;
  },
  
  /**
   * Get detailed information for a single webinar (admin only)
   * Includes full participant information and extended details
   */
  getAdminWebinarDetails: async (webinarId: number): Promise<Webinar> => {
    const response = await axiosWithAuth.get(`${API_URL}/admin/${webinarId}`);
    return response.data;
  }
};

export default webinarApi;
