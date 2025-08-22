import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css'; // <-- Tailwind стили сюда подключаются
import { CategoryFormatProvider } from './pages/Context/Context.jsx';
import store from './redux/store.js';
import reportWebVitals from './reportWebVitals.js';

// Регистрация Service Worker для кэширования
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW зарегистрирован: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW регистрация не удалась: ', registrationError);
      });
  });
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
