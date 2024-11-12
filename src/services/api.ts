// api.ts
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL; 

export const apiUrl = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Para ambiente local
const baseURLLocal = process.env.REACT_APP_API_URL_LOCAL || 'http://localhost:8081';

export const apiUrlLocal = axios.create({
  baseURL: baseURLLocal,
  headers: {
    'Content-Type': 'application/json',
  },
});
