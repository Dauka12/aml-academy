/**
 * Validates webinar data before submission to API
 * @param data - Webinar data to validate
 * @returns Error message if validation fails, null otherwise
 */
export const isValidWebinarData = (data: any): string | null => {
  // Check required fields
  if (!data.title || data.title.trim() === '') {
    return 'Название вебинара обязательно';
  }
  
  // Validate start date (must be a valid date object)
  if (!data.startDate || !(data.startDate instanceof Date) || isNaN(data.startDate.getTime())) {
    return 'Дата и время начала вебинара должны быть указаны корректно';
  }
  
  // Duration must be a positive number if specified
  if (data.duration !== undefined && (isNaN(data.duration) || data.duration <= 0)) {
    return 'Длительность должна быть положительным числом минут';
  }
  
  // Max participants must be a positive number if specified
  if (data.maxParticipants !== undefined && (isNaN(data.maxParticipants) || data.maxParticipants < 0)) {
    return 'Максимальное количество участников должно быть положительным числом';
  }
  
  // Meeting URL format (if provided)
  if (data.meetingUrl && data.meetingUrl.trim() !== '') {
    try {
      new URL(data.meetingUrl);
    } catch {
      return 'URL встречи имеет неверный формат';
    }
  }
  
  // Recording URL format (if provided)
  if (data.recordingUrl && data.recordingUrl.trim() !== '') {
    try {
      new URL(data.recordingUrl);
    } catch {
      return 'URL записи имеет неверный формат';
    }
  }
  
  // All validations passed
  return null;
};
