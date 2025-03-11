// Re-export the main routes component
export { default as OlympiadRoutes } from './OlympiadRoutes';

// Re-export page components
export { default as OlympiadLogin } from './pages/Login';
export { default as OlympiadRegistration } from './pages/Registration';

// Re-export context providers and hooks
export { OlympiadAuthProvider, useAuth } from './context/OlympiadAuthContext';

// Re-export types
export type { AuthUser } from './types/auth';
export type { Student } from './types/student';

// Export constants
export const OLYMPIAD_ROUTES = {
  ROOT: '/olympiad',
  LOGIN: '/olympiad/login',
  REGISTRATION: '/olympiad/registration',
  DASHBOARD: '/olympiad/dashboard',
};