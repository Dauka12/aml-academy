import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { CategoryFormatProvider } from './pages/Context/Context.jsx';
import store from './redux/store.js';
import reportWebVitals from './reportWebVitals';



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
