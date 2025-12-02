import axios, { AxiosError } from "axios";

const LOCAL_BACKEND = "http://localhost:8081";
const PROD_BACKEND = "https://backend-next-het9.onrender.com";

// 🔥 BaseURL 100% estável – sem usar REACT_APP_API_URL
const baseURL =
  process.env.NODE_ENV === "production"
    ? PROD_BACKEND
    : LOCAL_BACKEND;

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
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

/** =============================
 **  INTERCEPTOR → Request
 ** ============================= */
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;

    console.log(
      `📤 [REQUEST] ${config.method?.toUpperCase()} → ${config.baseURL}${config.url}`
    );
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/** =============================
 **  INTERCEPTOR → Response
 ** ============================= */
api.interceptors.response.use(
  (response) => {
    console.log(`📥 [RESPONSE] ${response.status} ← ${response.config.url}`);
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
