import axios, { AxiosInstance } from 'axios';

/**
 * Creates an axios instance with token interceptor
 * This interceptor automatically adds the JWT token to all requests if it exists
 */
const createAxiosWithAuth = (): AxiosInstance => {
  const instance = axios.create();
  
  // Request interceptor to add token to all requests
  instance.interceptors.request.use(
    (config) => {
      // Get token from localStorage
      const token = localStorage.getItem('jwtToken');
      
      // If token exists, add it to the authorization header
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Response interceptor to handle common errors
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Handle 401 Unauthorized errors (token expired or invalid)
      if (error.response && error.response.status === 401) {
        // Optionally redirect to login page or refresh token
        console.log('Authentication error: Token invalid or expired');
        // localStorage.removeItem('jwtToken'); // Uncomment to clear token on auth error
        // window.location.href = '/login'; // Uncomment to redirect to login
      }
      
      return Promise.reject(error);
    }
  );
  
  return instance;
};

export default createAxiosWithAuth();
