import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import MustBeAdmin from '../../auth/AdminRoute.jsx';

// Translation provider
import { WebinarTranslationsProvider } from './utils/translationsContext';

// Lazy-loaded components
const WebinarLanding = lazy(() => import('./pages/WebinarLanding.tsx'));
const WebinarDetails = lazy(() => import('./pages/WebinarDetails.tsx'));
const WebinarRegistration = lazy(() => import('./pages/WebinarRegistration.tsx'));
const WebinarManager = lazy(() => import('./pages/WebinarManager.tsx'));
const WebinarsList = lazy(() => import('./pages/WebinarsList.tsx'));
const UpcomingWebinars = lazy(() => import('./pages/UpcomingWebinars.tsx'));
const PastWebinars = lazy(() => import('./pages/PastWebinars.tsx'));

const WebinarRoutes: React.FC = () => {
  return (
    <WebinarTranslationsProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <WebinarLanding />
            </Suspense>
          }
        />
      <Route
        path="/details/:id"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <WebinarDetails />
          </Suspense>
        }
      />
      <Route
        path="/register/:id"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <WebinarRegistration />
          </Suspense>
        }
      />
      <Route
        path="/manager"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <MustBeAdmin component={WebinarManager} shouldBeLoggedIn={true}></MustBeAdmin>
          </Suspense>
        }
      />
      <Route
        path="/all"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <WebinarsList />
          </Suspense>
        }
      />
      <Route
        path="/upcoming"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <UpcomingWebinars />
          </Suspense>
        }
      />
      <Route
        path="/past"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <PastWebinars />
          </Suspense>
        }
      />
      <Route path="/*" element={<div>Webinar Home</div>} />
      </Routes>
    </WebinarTranslationsProvider>
  );
};

export default WebinarRoutes;
