import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Registration = lazy(() => import('./pages/Registration.tsx'));
// You'll create these other pages later
const Login = lazy(() => import('./pages/Login.tsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.tsx'));

const OlympiadRoutes: React.FC = () => {
    return (
        <Routes>
            <Route
                path="/registration"
                element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Registration />
                    </Suspense>
                }
            />
            <Route
                path="/login"
                element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Login />
                    </Suspense>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Dashboard />
                    </Suspense>
                }
            />
            <Route path="/*" element={<div>Olympiad Home</div>} />
        </Routes>
    );
};

export default OlympiadRoutes;