import { useState, useEffect } from 'react';
import webinarApi from '../api/webinarApi';
import { Webinar } from '../types/webinar';
import { WebinarSignup } from '../types/webinarSignup';

interface AdminWebinarHookResult {
  webinars: Webinar[];
  selectedWebinar: Webinar | null;
  participants: WebinarSignup[];
  loading: boolean;
  detailsLoading: boolean;
  participantsLoading: boolean;
  error: string | null;
  fetchWebinars: () => Promise<void>;
  fetchWebinarDetails: (id: number) => Promise<void>;
  fetchParticipants: (id: number) => Promise<void>;
  deleteWebinar: (id: number) => Promise<void>;
}

/**
 * Custom hook for managing admin webinar data
 * Provides comprehensive data and operations for admin webinar management
 */
export const useAdminWebinars = (): AdminWebinarHookResult => {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);
  const [participants, setParticipants] = useState<WebinarSignup[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [participantsLoading, setParticipantsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all webinars with detailed information for admins
  const fetchWebinars = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await webinarApi.getAdminWebinars();
      
      // API возвращает данные в формате { data: { webinars: [...] } }
      if (response && response.data && response.data.webinars) {
        setWebinars(response.data.webinars);
      } else {
        setWebinars([]);
      }
    } catch (err) {
      console.error('Failed to fetch admin webinars:', err);
      setError('Failed to fetch webinars. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch detailed info for a single webinar
  const fetchWebinarDetails = async (id: number) => {
    try {
      setDetailsLoading(true);
      setError(null);
      const data = await webinarApi.getAdminWebinarDetails(id);
      setSelectedWebinar(data);
    } catch (err) {
      console.error(`Failed to fetch webinar details for ID ${id}:`, err);
      setError('Failed to fetch webinar details. Please try again.');
    } finally {
      setDetailsLoading(false);
    }
  };

  // Fetch participants for a webinar
  const fetchParticipants = async (id: number) => {
    try {
      setParticipantsLoading(true);
      setError(null);
      const data = await webinarApi.getWebinarSignups(id);
      setParticipants(data);
    } catch (err) {
      console.error(`Failed to fetch participants for webinar ID ${id}:`, err);
      setError('Failed to fetch participant data. Please try again.');
    } finally {
      setParticipantsLoading(false);
    }
  };

  // Delete a webinar
  const deleteWebinar = async (id: number) => {
    try {
      await webinarApi.deleteWebinar(id);
      // Update local state after deletion
      setWebinars(webinars.filter(w => w.id !== id));
    } catch (err) {
      console.error(`Failed to delete webinar ID ${id}:`, err);
      throw new Error('Failed to delete webinar. Please try again.');
    }
  };

  // Load webinars on initial mount
  useEffect(() => {
    fetchWebinars();
  }, []);

  return {
    webinars,
    selectedWebinar,
    participants,
    loading,
    detailsLoading,
    participantsLoading,
    error,
    fetchWebinars,
    fetchWebinarDetails,
    fetchParticipants,
    deleteWebinar
  };
};

export default useAdminWebinars;
