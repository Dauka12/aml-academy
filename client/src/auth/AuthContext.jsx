import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = (props) => {
    const [authUser, setAuthUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const isTokenExpired = (token) => {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) return true;
            const payload = JSON.parse(atob(parts[1]));
            if (!payload.exp) return true;
            const nowSec = Math.floor(Date.now() / 1000);
            return nowSec >= payload.exp;
        } catch (e) {
            return true;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token && !isTokenExpired(token)) {
            setIsLoggedIn(true);
        } else {
            if (token) {
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('role');
            }
            setIsLoggedIn(false);
        }

        const interval = setInterval(() => {
            const t = localStorage.getItem('jwtToken');
            if (t && isTokenExpired(t)) {
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('role');
                setIsLoggedIn(false);
                window.location.href = '/login';
            }
        }, 30000);

        const reqId = axios.interceptors.request.use((config) => {
            const t = localStorage.getItem('jwtToken');
            if (t) {
                config.headers['Authorization'] = `Bearer ${t}`;
            }
            return config;
        });
        const resId = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error?.response?.status === 401) {
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('role');
                    setIsLoggedIn(false);
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );

        return () => {
            clearInterval(interval);
            axios.interceptors.request.eject(reqId);
            axios.interceptors.response.eject(resId);
        };
    }, []);

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};
