import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css'; // <-- Tailwind стили сюда подключаются
import { CategoryFormatProvider } from './pages/Context/Context.jsx';
import store from './redux/store.js';
import reportWebVitals from './reportWebVitals.js';

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
