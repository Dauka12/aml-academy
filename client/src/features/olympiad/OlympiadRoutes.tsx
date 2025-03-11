import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { OlympiadAuthProvider, ProtectedRoute, PublicRoute } from './context/OlympiadAuthContext.tsx';

const Registration = lazy(() => import('./pages/Registration.tsx'));
const Login = lazy(() => import('./pages/Login.tsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.tsx'));

const OlympiadRoutes: React.FC = () => {
  return (
    <OlympiadAuthProvider>
      <Routes>
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
          path="/dashboard"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route path="/*" element={<div>Olympiad Home</div>} />
      </Routes>
    </OlympiadAuthProvider>
  );
};

export default OlympiadRoutes;