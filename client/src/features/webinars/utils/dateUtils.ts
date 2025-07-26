/**
 * Converts date array from API format [year, month, day, hour, minute] to Date object
 * @param dateArray - Array representing date [year, month, day, hour, minute]
 * @returns JavaScript Date object
 */
export const convertDateFromArray = (dateArray: number[]): Date => {
  if (!dateArray || dateArray.length < 5) {
    return new Date();
  }
  
  // Note: JavaScript months are 0-based (0 = January, 11 = December)
  // But our API uses 1-based months, so we subtract 1
  const [year, month, day, hour, minute] = dateArray;
  return new Date(year, month - 1, day, hour, minute);
};

/**
 * Formats a date for display in a user-friendly format
 * @param date - Date object or date array
 * @param includeTime - Whether to include time in the output
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | number[], 
  includeTime = true, 
  locale = 'ru-RU'
): string => {
  const dateObj = Array.isArray(date) ? convertDateFromArray(date) : date;
  
  const dateOptions: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric'
  };
  
  if (includeTime) {
    return dateObj.toLocaleString(locale, {
      ...dateOptions,
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  return dateObj.toLocaleDateString(locale, dateOptions);
};

/**
 * Checks if a webinar date is in the past
 * @param dateArray - Array representing date [year, month, day, hour, minute]
 * @returns boolean - true if the webinar is in the past
 */
export const isWebinarInPast = (dateArray: number[]): boolean => {
  const webinarDate = convertDateFromArray(dateArray);
  const now = new Date();
  return webinarDate < now;
};

/**
 * Formats duration in minutes to a human-readable string
 * @param minutes - Duration in minutes
 * @returns Formatted duration string (e.g., "1 hour 30 minutes", "45 minutes")
 */
export const formatDuration = (minutes: number, locale = 'ru-RU'): string => {
  if (!minutes || minutes <= 0) {
    return '';
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours > 0 && remainingMinutes > 0) {
    return `${hours} ч ${remainingMinutes} мин`;
  } else if (hours > 0) {
    return `${hours} ч`;
  } else {
    return `${remainingMinutes} мин`;
  }
};
