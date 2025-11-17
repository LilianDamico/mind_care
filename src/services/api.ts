// src/services/api.ts
import axios, { AxiosError } from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers && !config.url?.includes("/login")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 403) {
      console.warn("🔒 Acesso negado (403):", error.response.data);
    }
    if (error.response?.status === 404) {
      console.warn("🚫 Endpoint não encontrado:", error.config?.url);
    }
    return Promise.reject(error);
  }
);

// 👇 ESSA LINHA É O OURO:
export const apiUrl = api;
export default api;
