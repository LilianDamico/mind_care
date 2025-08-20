// src/services/api.ts
import axios, { AxiosInstance, AxiosError } from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

export const apiUrl: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor: Adiciona token apenas se NÃO for para /login
apiUrl.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    // Evita envio de token se a URL for exatamente /login
    const isLoginRoute =
      config.url?.includes('/login') || config.url?.endsWith('/login');

    if (token && config.headers && !isLoginRoute) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Interceptor de resposta
apiUrl.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 403) {
      console.error(
        'Erro 403: Acesso negado - Verifique o token ou permissões',
        error.response.data
      );
    }
    return Promise.reject(error);
  }
);

export default apiUrl;
