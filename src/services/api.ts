import axios from 'axios';

// URL principal da API em produção (Java no Render)
const baseURL = process.env.REACT_APP_API_URL || 'https://api-60lk.onrender.com';

// URL local opcional (caso queira testar o backend local)
const baseURLLocal = process.env.REACT_APP_API_URL_LOCAL || 'http://localhost:8080';

// Instância para produção
export const apiUrl = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Instância para uso local se necessário
export const apiUrlLocal = axios.create({
  baseURL: baseURLLocal,
  headers: {
    'Content-Type': 'application/json',
  },
});
