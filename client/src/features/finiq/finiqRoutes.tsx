import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider, ProtectedRoute, PublicRoute } from './context/AuthContext.tsx';

// Lazy-loaded components
const Registration = lazy(() => import('./pages/Registration.tsx'));
const Login = lazy(() => import('./pages/Login.tsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.tsx'));
const LandingPage = lazy(() => import('./pages/LandingPage.tsx'));
const EducationPage = lazy(() => import('./pages/EducationPage.tsx'));
const Manager = lazy(() => import('./pages/Manager.tsx'));

// Test-related components
const TestsList = lazy(() => import('./pages/TestsList.tsx'));
const TestSession = lazy(() => import('./pages/TestSession.tsx'));
const TestResults = lazy(() => import('./pages/TestResults.tsx'));

const FiniqRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LandingPage />
            </Suspense>
          }
        />
        <Route
          path="/registration"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PublicRoute>
                <Registration />
              </PublicRoute>
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PublicRoute>
                <Login />
              </PublicRoute>
            </Suspense>
          }
        />
        <Route
          path="/education"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <EducationPage />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/manager"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute>
                <Manager />
              </ProtectedRoute>
            </Suspense>
          }
        />
        {/* Test-related routes */}
        <Route
          path="/tests"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute>
                <TestsList />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/test/:sessionId"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute>
                <TestSession />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/test-results/:sessionId"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute>
                <TestResults />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route path="/*" element={<div>Finiq Home</div>} />
      </Routes>
    </AuthProvider>
  );
};

export default FiniqRoutes;