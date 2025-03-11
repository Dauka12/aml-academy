// Re-export the main routes component
export { default as OlympiadRoutes } from './OlympiadRoutes';

// Re-export page components
export { default as OlympiadRegistration } from './pages/Registration';

// Re-export types
export type { Student } from './types/student';

// Export constants
export const OLYMPIAD_ROUTES = {
    ROOT: '/olympiad',
    LOGIN: '/olympiad/login',
    REGISTRATION: '/olympiad/registration',
    DASHBOARD: '/olympiad/dashboard',
};