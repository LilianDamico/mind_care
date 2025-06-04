import axios, { AxiosInstance } from 'axios';

// Base URLs
const baseURL = process.env.REACT_APP_API_URL || 'https://api-60lk.onrender.com';
const baseURLLocal = process.env.REACT_APP_API_URL_LOCAL || 'http://localhost:8081';

// Instâncias separadas
export const apiUrl: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const apiUrlLocal: AxiosInstance = axios.create({
  baseURL: baseURLLocal,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor para adicionar token
const attachToken = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

// Aplica o interceptor às instâncias
attachToken(apiUrl);
attachToken(apiUrlLocal);
