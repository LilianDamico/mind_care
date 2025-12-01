// src/services/apiAI.ts
import axios from "axios";

const baseURL =
  process.env.REACT_APP_AI_URL?.trim().replace(/\/$/, "") ||
  "http://localhost:8001";

const apiAI = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

// Logs bonitões
apiAI.interceptors.request.use((config) => {
  console.log(`🤖 [AI REQUEST] ${config.method?.toUpperCase()} → ${config.baseURL}${config.url}`);
  return config;
});

apiAI.interceptors.response.use(
  (res) => {
    console.log(`🤖 [AI RESPONSE] ${res.status} ← ${res.config.url}`);
    return res;
  },
  (err) => {
    console.error("⚠️ [AI ERROR]", err.response?.status, err.config?.url);
    return Promise.reject(err);
  }
);

export default apiAI;
