import axios, { AxiosError } from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8080";

/** =============================
 **  TOKEN
 ** ============================= */
const getToken = () =>
  localStorage.getItem("token") ??
  localStorage.getItem("authToken") ??
  null;

/** =============================
 **  AXIOS INSTANCE
 ** ============================= */
const api = axios.create({
  baseURL, // <<<<< sem /api/auth aqui
  headers: { "Content-Type": "application/json" },
});

/** =============================
 **  INTERCEPTOR → Request
 ** ============================= */
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;

    console.log(`📤 [REQUEST] ${config.method?.toUpperCase()} → ${config.url}`);
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/** =============================
 **  INTERCEPTOR → Response
 ** ============================= */
api.interceptors.response.use(
  (response) => {
    console.log(`📥 [RESPONSE]`, response.status, response.config.url);
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    const url = error.config?.url;

    switch (status) {
      case 401:
        console.error("🔐 Token inválido ou expirado");
        localStorage.removeItem("token");
        break;

      case 403:
        console.warn("🔒 Sem permissão para acessar:", url);
        break;

      case 404:
        console.warn("❗ Endpoint não encontrado:", url);
        break;

      case 500:
        console.error("🔥 Erro interno no servidor:", url);
        break;
    }

    return Promise.reject(error);
  }
);

export default api;
