// Re-export the main routes component
export { default as WebinarRoutes } from './WebinarRoutes';

// Re-export page components
export { default as WebinarLanding } from './pages/WebinarLanding.tsx';
export { default as WebinarDetails } from './pages/WebinarDetails.tsx';
export { default as WebinarManager } from './pages/WebinarManager.tsx';
export { default as WebinarRegistration } from './pages/WebinarRegistration.tsx';
export { default as WebinarsList } from './pages/WebinarsList.tsx';
export { default as UpcomingWebinars } from './pages/UpcomingWebinars.tsx';
export { default as PastWebinars } from './pages/PastWebinars.tsx';

// Re-export hooks
export { default as useWebinarManager } from './hooks/useWebinarManager.ts';

// Re-export types
export type { Webinar } from './types/webinar.ts';
export type { WebinarSignup } from './types/webinarSignup.ts';

// Export constants
export const WEBINAR_ROUTES = {
  ROOT: '/webinars',
  DETAILS: '/webinars/details',
  REGISTER: '/webinars/register',
  MANAGER: '/webinars/manager',
  ALL: '/webinars/all',
  UPCOMING: '/webinars/upcoming',
  PAST: '/webinars/past',
};

// Re-export UI components
export { default as WebinarCardComponent } from './components/cards/WebinarCard';
export { default as WebinarsListComponent } from './components/shared/WebinarsList';
export { default as WebinarFilterComponent } from './components/shared/WebinarFilter';
export { default as WebinarFormComponent } from './components/forms/WebinarForm';

// Re-export layout components
export { default as WebinarLayout } from './components/layout/WebinarLayout';

// Re-export page components for manager
export { default as WebinarStatsCards } from './pages/components/WebinarStatsCards';
export { default as WebinarFilters } from './pages/components/WebinarFilters';
export { default as WebinarTable } from './pages/components/WebinarTable';
export { default as WebinarModal } from './pages/components/WebinarModal';

// Re-export utilities
export * from './utils/webinarHelpers';
export * from './utils/validation';
export * from './utils/translations';
export { WebinarTranslationsProvider, useWebinarTranslations } from './utils/translationsContext';

// Re-export API
export { default as webinarApi } from './api/webinarApi';
export { default as axiosWithAuth } from './api/axiosInterceptor';
export type {
  CreateWebinarData,
  UpdateWebinarData,
  WebinarSignupData,
  GuestSignupData
} from './api/webinarApi';
