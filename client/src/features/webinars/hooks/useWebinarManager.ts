import { useState, useEffect, useCallback, useMemo } from 'react';
import { Webinar } from '../types/webinar';
import { WebinarSignup } from '../types/webinarSignup';
import webinarApi, { 
  CreateWebinarData,
  UpdateWebinarData,
  WebinarSignupData,
  GuestSignupData
} from '../api/webinarApi';
import {
  filterUpcomingWebinars,
  filterPastWebinars,
  sortWebinarsByDateAsc,
  sortWebinarsByDateDesc,
  sortWebinarsByTitleAsc,
  sortWebinarsByTitleDesc,
  searchWebinars,
  sortBysignupsCount
} from '../utils/webinarHelpers';

/**
 * Hook for managing webinars
 */
const useWebinarManager = () => {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [webinarsAdmin, setWebinarsAdmin] = useState<Webinar[]>([]);
  const [currentWebinar, setCurrentWebinar] = useState<Webinar | null>(null);
  const [signups, setSignups] = useState<WebinarSignup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Get all webinars
   */
  const fetchWebinars = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await webinarApi.getAllWebinars();
      setWebinars(data);
    } catch (err) {
      setError('Error fetching webinars');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWebinarsAdmin = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await webinarApi.getAllWebinarsAdmin();
      console.log('Fetched webinars for admin:', data);
      setWebinarsAdmin(data);
    } catch (err) {
      setError('Error fetching webinars');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);
  /**
   * Get a single webinar by id
   */
  const fetchWebinar = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await webinarApi.getWebinarById(id);
      setCurrentWebinar(data);
      return data;
    } catch (err) {
      setError('Error fetching webinar');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a new webinar
   */
  const createWebinar = useCallback(async (data: CreateWebinarData) => {
    setLoading(true);
    setError(null);
    try {
      const newWebinar = await webinarApi.createWebinar(data);
      setWebinars(prev => [...prev, newWebinar]);
      return newWebinar;
    } catch (err) {
      setError('Error creating webinar');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update an existing webinar
   */
  const updateWebinar = useCallback(async (id: number, data: UpdateWebinarData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedWebinar = await webinarApi.updateWebinar(id, data);
      
      setWebinars(prev => prev.map(webinar => 
        webinar.id === id ? updatedWebinar : webinar
      ));
      
      if (currentWebinar && currentWebinar.id === id) {
        setCurrentWebinar(updatedWebinar);
      }
      
      return updatedWebinar;
    } catch (err) {
      setError('Error updating webinar');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [currentWebinar]);

  /**
   * Delete a webinar
   */
  const deleteWebinar = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await webinarApi.deleteWebinar(id);
      setWebinars(prev => prev.filter(webinar => webinar.id !== id));
      
      if (currentWebinar && currentWebinar.id === id) {
        setCurrentWebinar(null);
      }
      
      return true;
    } catch (err) {
      setError('Error deleting webinar');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [currentWebinar]);

  /**
   * Sign up for a webinar (authorized user)
   */
  const signupForWebinar = useCallback(async (webinarId: number, data: WebinarSignupData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await webinarApi.signupForWebinar(webinarId, data);
      return result;
    } catch (err) {
      setError('Error signing up for webinar');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Guest signup for a webinar
   */
  const guestSignupForWebinar = useCallback(async (webinarId: number, data: GuestSignupData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await webinarApi.guestSignupForWebinar(webinarId, data);
      return result;
    } catch (err) {
      setError('Error signing up for webinar as guest');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get signups for a webinar (admin only)
   */
  const fetchWebinarSignups = useCallback(async (webinarId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await webinarApi.getWebinarSignups(webinarId);
      setSignups(data);
      return data;
    } catch (err) {
      setError('Error fetching webinar signups');
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get signup count for a webinar
   */
  const fetchsignupsCount = useCallback(async (webinarId: number) => {
    setLoading(true);
    setError(null);
    try {
      const count = await webinarApi.getsignupsCount(webinarId);
      return count;
    } catch (err) {
      setError('Error fetching signup count');
      console.error(err);
      return 0;
    } finally {
      setLoading(false);
    }
  }, []);

  // Filtering and sorting functions
  const getUpcomingWebinars = useCallback(() => {
    return filterUpcomingWebinars(webinars);
  }, [webinars]);

  const getPastWebinars = useCallback(() => {
    return filterPastWebinars(webinars);
  }, [webinars]);

  const getWebinarsSortedByDate = useCallback((ascending = false) => {
    return ascending ? sortWebinarsByDateAsc(webinars) : sortWebinarsByDateDesc(webinars);
  }, [webinars]);

  const getWebinarsSortedByTitle = useCallback((ascending = true) => {
    return ascending ? sortWebinarsByTitleAsc(webinars) : sortWebinarsByTitleDesc(webinars);
  }, [webinars]);

  const getWebinarsSortedByPopularity = useCallback(() => {
    return sortBysignupsCount(webinars);
  }, [webinars]);

  const searchWebinarsByQuery = useCallback((query: string) => {
    return searchWebinars(webinars, query);
  }, [webinars]);

  // Combined filtering and sorting
  const getFilteredAndSortedWebinars = useCallback((
    options: {
      search?: string;
      showUpcoming?: boolean;
      showPast?: boolean;
      sortBy?: 'date' | 'title' | 'popularity';
      sortDirection?: 'asc' | 'desc';
    }
  ) => {
    let filtered = [...webinars];
    
    // Apply search filter
    if (options.search) {
      filtered = searchWebinars(filtered, options.search);
    }
    
    // Apply time filter
    if (options.showUpcoming && !options.showPast) {
      filtered = filterUpcomingWebinars(filtered);
    } else if (options.showPast && !options.showUpcoming) {
      filtered = filterPastWebinars(filtered);
    }
    
    // Apply sorting
    if (options.sortBy === 'date') {
      filtered = options.sortDirection === 'asc' 
        ? sortWebinarsByDateAsc(filtered) 
        : sortWebinarsByDateDesc(filtered);
    } else if (options.sortBy === 'title') {
      filtered = options.sortDirection === 'asc' 
        ? sortWebinarsByTitleAsc(filtered) 
        : sortWebinarsByTitleDesc(filtered);
    } else if (options.sortBy === 'popularity') {
      filtered = sortBysignupsCount(filtered);
    }
    
    return filtered;
  }, [webinars]);

  // Fetch webinars on mount
  useEffect(() => {
    fetchWebinars();
  }, [fetchWebinars]);

  useEffect(() => {
    fetchWebinarsAdmin();
  }, [fetchWebinarsAdmin]);
  return {
    webinars,
    webinarsAdmin,
    currentWebinar,
    signups,
    loading,
    error,
    fetchWebinars,
    fetchWebinarsAdmin,
    fetchWebinar,
    createWebinar,
    updateWebinar,
    deleteWebinar,
    signupForWebinar,
    guestSignupForWebinar,
    fetchWebinarSignups,
    fetchsignupsCount,
    // Filtering and sorting functions
    getUpcomingWebinars,
    getPastWebinars,
    getWebinarsSortedByDate,
    getWebinarsSortedByTitle,
    getWebinarsSortedByPopularity,
    searchWebinarsByQuery,
    getFilteredAndSortedWebinars
  };
};

export default useWebinarManager;
