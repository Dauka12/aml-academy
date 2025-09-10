export { default as FiniqRoutes } from './finiqRoutes';

export { default as FiniqDashboard } from './pages/Dashboard';
export { default as FiniqLandingPage } from './pages/LandingPage';
export { default as FiniqLogin } from './pages/Login';
export { default as FiniqManager } from './pages/Manager';
export { default as FiniqRegistration } from './pages/Registration';
export { default as TestResults } from './pages/TestResults';
export { default as TestSession } from './pages/TestSession';
export { default as TestsList } from './pages/TestsList';

export { AuthProvider, useAuth } from './context/AuthContext';

export { default as useExamManager } from './hooks/useExamManager';
export { default as useTestSessionManager } from './hooks/useTestSessionManager';

export type { AuthUser } from './types/auth';
export type { Student } from './types/student';
export type { StudentExamSessionRequest } from './types/testSession';

export const FINIQ_ROUTES = {
  ROOT: '/finiq',
  LOGIN: '/finiq/login',
  REGISTRATION: '/finiq/registration',
  DASHBOARD: '/finiq/dashboard',
  MANAGER: '/finiq/manager-87789192181',
  TESTS: '/finiq/tests',
  TEST: '/finiq/test',
  TEST_RESULTS: '/finiq/test-results',
};