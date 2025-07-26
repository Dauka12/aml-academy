import { Webinar } from '../types/webinar';

/**
 * Format date for display
 */
export const formatDate = (dateValue: any): string => {
  try {
    const date = convertDateFromArray(dateValue);
    return date.toLocaleDateString();
  } catch (e) {
    console.error('Error formatting date:', e, dateValue);
    return 'Invalid date';
  }
};

/**
 * Format time for display
 */
export const formatTime = (dateValue: any): string => {
  try {
    const date = convertDateFromArray(dateValue);
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  } catch (e) {
    console.error('Error formatting time:', e, dateValue);
    return 'Invalid time';
  }
};

/**
 * Format datetime for display
 */
export const formatDateTime = (dateValue: any): string => {
  try {
    const date = convertDateFromArray(dateValue);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  } catch (e) {
    console.error('Error formatting datetime:', e, dateValue);
    return 'Invalid date/time';
  }
};

/**
 * Check if a webinar is in the past
 */
export const isWebinarPast = (webinar: Webinar): boolean => {
  return convertDateFromArray(webinar.startDate) < new Date();
};

/**
 * Check if a webinar is upcoming
 */
export const isWebinarUpcoming = (webinar: Webinar): boolean => {
  return convertDateFromArray(webinar.startDate) > new Date();
};

/**
 * Get active webinars
 */
export const getActiveWebinars = (webinars: Webinar[]): Webinar[] => {
  return webinars.filter(webinar => webinar.isActive);
};

export const convertDateFromArray = (dateValue: any): Date => {
  try {
    if (Array.isArray(dateValue)) {
      // Формат бэкенда [year, month, day, hour, minute]
      return new Date(
        dateValue[0],     // год
        dateValue[1] - 1, // месяц (0-11 в JS)
        dateValue[2],     // день
        dateValue[3],     // час
        dateValue[4]      // минута
      );
    }
    // Если передана строка или другой формат
    return new Date(dateValue);
  } catch (e) {
    console.error('Error converting date:', e, dateValue);
    return new Date(); // Возвращаем текущую дату в случае ошибки
  }
};

/**
 * Sort webinars by date (newest first)
 */
export const sortWebinarsByDateDesc = (webinars: Webinar[]): Webinar[] => {
  return [...webinars].sort((a, b) => 
    convertDateFromArray(b.startDate).getTime() - convertDateFromArray(a.startDate).getTime()
  );
};

/**
 * Sort webinars by date (oldest first)
 */
export const sortWebinarsByDateAsc = (webinars: Webinar[]): Webinar[] => {
  return [...webinars].sort((a, b) => 
    convertDateFromArray(a.startDate).getTime() - convertDateFromArray(b.startDate).getTime()
  );
};

/**
 * Sort webinars by title (A-Z)
 */
export const sortWebinarsByTitleAsc = (webinars: Webinar[]): Webinar[] => {
  return [...webinars].sort((a, b) => a.title.localeCompare(b.title));
};

/**
 * Sort webinars by title (Z-A)
 */
export const sortWebinarsByTitleDesc = (webinars: Webinar[]): Webinar[] => {
  return [...webinars].sort((a, b) => b.title.localeCompare(a.title));
};

/**
 * Filter webinars by signup count
 */
export const sortBysignupsCount = (webinars: Webinar[]): Webinar[] => {
  return [...webinars].sort((a, b) => {
    const countA = a.signupsCount || 0;
    const countB = b.signupsCount || 0;
    return countB - countA;
  });
};

/**
 * Filter upcoming webinars
 */
export const filterUpcomingWebinars = (webinars: Webinar[]): Webinar[] => {
  return webinars.filter(isWebinarUpcoming);
};

/**
 * Filter past webinars
 */
export const filterPastWebinars = (webinars: Webinar[]): Webinar[] => {
  return webinars.filter(isWebinarPast);
};

/**
 * Search webinars by query
 */
export const searchWebinars = (webinars: Webinar[], query: string): Webinar[] => {
  if (!query) return webinars;
  
  const lowercaseQuery = query.toLowerCase();
  return webinars.filter(webinar => 
    webinar.title.toLowerCase().includes(lowercaseQuery) ||
    (webinar.description && webinar.description.toLowerCase().includes(lowercaseQuery))
  );
};

/**
 * Get webinar URL
 */
export const getWebinarUrl = (webinar: Webinar): string => {
  return webinar.link || '';
};

/**
 * Format signup count for display
 */
export const formatsignupsCount = (webinar: Webinar): string => {
  return webinar.signupsCount ? `${webinar.signupsCount} registered` : 'No registrations yet';
};
