import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css'; // <-- Tailwind стили сюда подключаются
import { CategoryFormatProvider } from './pages/Context/Context.jsx';
import store from './redux/store.js';
import reportWebVitals from './reportWebVitals.js';

// Service worker: register only in production, unregister during development
if ('serviceWorker' in navigator) {
  if (import.meta.env && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW зарегистрирован: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW регистрация не удалась: ', registrationError);
        });
    });
  } else {
    // In development, ensure any previously registered SW is unregistered
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((reg) => {
        reg.unregister().then(() => console.log('Unregistered SW (dev):', reg.scope));
      });
    }).catch(() => {});
  }
}

// Filter out react-helmet and other legacy component warnings
const originalWarn = console.warn;
console.warn = function(message, ...args) {
    if (typeof message === 'string' && (
        message.includes('UNSAFE_componentWillMount') ||
        message.includes('SideEffect(NullComponent2)') ||
        message.includes('Using UNSAFE_componentWillMount in strict mode') ||
        message.includes('componentWillMount has been renamed') ||
        message.includes('Please update the following components') ||
        message.includes('react-helmet')
    )) {
        return;
    }
    originalWarn.apply(console, [message, ...args]);
};

// Initialize Google Analytics
ReactGA.initialize('G-EB8X1JD2F3');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CategoryFormatProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </CategoryFormatProvider>
    </React.StrictMode>
);

reportWebVitals();
