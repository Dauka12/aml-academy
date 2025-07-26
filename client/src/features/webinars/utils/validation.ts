import { Webinar } from '../types/webinar';

/**
 * Validate webinar form fields
 */
export const validateWebinarForm = (webinar: Partial<Webinar>): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Check title
  if (!webinar.title || webinar.title.trim() === '') {
    errors.title = 'Title is required';
  } else if (webinar.title.length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }

  // Check description
  if (webinar.description === '') {
    errors.description = 'Description cannot be empty if provided';
  }

  // Check dates
  if (!webinar.startDate) {
    errors.startDate = 'Start date is required';
  }
  
  // Check link if provided
  if (webinar.link && !isValidUrl(webinar.link)) {
    errors.link = 'Please enter a valid URL';
  }

  // Check image URL if provided
  if (webinar.imageUrl && !isValidUrl(webinar.imageUrl)) {
    errors.imageUrl = 'Please enter a valid image URL';
  }

  return errors;
};

/**
 * Check if a string is a valid URL
 */
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Check if form has errors
 */
export const hasErrors = (errors: Record<string, string>): boolean => {
  return Object.keys(errors).length > 0;
};

/**
 * Check if required fields are filled
 */
export const isFormComplete = (webinar: Partial<Webinar>): boolean => {
  return Boolean(
    webinar.title && 
    webinar.startDate &&
    webinar.isActive !== undefined
  );
};
