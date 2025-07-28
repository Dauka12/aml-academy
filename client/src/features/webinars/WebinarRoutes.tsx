import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MustBeAdmin from '../../auth/AdminRoute.jsx';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import WebinarNotFound from './components/WebinarNotFound.tsx';
import { PageTransition } from './components/PageTransition.tsx';
import { WebinarBackground } from './components/WebinarBackground.tsx';

// Translation provider

// Lazy-loaded components
const WebinarLanding = lazy(() => import('./pages/WebinarLanding.tsx'));
const WebinarDetails = lazy(() => import('./pages/WebinarDetails.tsx'));
const WebinarRegistration = lazy(() => import('./pages/WebinarRegistration.tsx'));
const WebinarManager = lazy(() => import('./pages/WebinarManager.tsx'));
const WebinarsList = lazy(() => import('./pages/WebinarsList.tsx'));
const UpcomingWebinars = lazy(() => import('./pages/UpcomingWebinars.tsx'));
const PastWebinars = lazy(() => import('./pages/PastWebinars.tsx'));

// Enhanced Loading Component for Webinars
const WebinarLoader = ({ message = "Загрузка вебинара..." }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center"
  >
    <div className="text-center space-y-6 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div className="mx-auto w-16 h-16 relative">
          <motion.div
            className="absolute inset-0 border-4 border-blue-200 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-t-blue-600 border-r-blue-500 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 bg-blue-600 rounded-full" />
          </motion.div>
        </div>
        
        <motion.h3
          className="text-xl font-semibold text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {message}
        </motion.h3>
        
        <motion.div
          className="flex justify-center space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-600 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
);

const WebinarRoutes: React.FC = () => {
  return (
    <WebinarBackground>
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<WebinarLoader message="Загрузка главной страницы вебинаров..." />}>
                <PageTransition direction="up">
                  <WebinarLanding />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/details/:id"
            element={
              <Suspense fallback={<WebinarLoader message="Загрузка деталей вебинара..." />}>
                <PageTransition direction="right">
                  <WebinarDetails />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/registration/:id"
            element={
              <Suspense fallback={<WebinarLoader message="Загрузка формы регистрации..." />}>
                <PageTransition direction="scale">
                  <WebinarRegistration />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/manager"
            element={
              <Suspense fallback={<WebinarLoader message="Загрузка панели управления..." />}>
                <PageTransition direction="down">
                  <MustBeAdmin component={WebinarManager} shouldBeLoggedIn={true} />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/all"
            element={
              <Suspense fallback={<WebinarLoader message="Загрузка списка всех вебинаров..." />}>
                <PageTransition direction="up">
                  <WebinarsList />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/upcoming"
            element={
              <Suspense fallback={<WebinarLoader message="Загрузка предстоящих вебинаров..." />}>
                <PageTransition direction="left">
                  <UpcomingWebinars />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/past"
            element={
              <Suspense fallback={<WebinarLoader message="Загрузка прошедших вебинаров..." />}>
                <PageTransition direction="right">
                  <PastWebinars />
                </PageTransition>
              </Suspense>
            }
          />
          <Route 
            path="/*" 
            element={<WebinarNotFound />} 
          />
        </Routes>
      </AnimatePresence>
    </WebinarBackground>
  );
};

export default WebinarRoutes;
