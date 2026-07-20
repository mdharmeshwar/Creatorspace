import axios from 'axios';

const rawURL = (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim()) || 'https://creatorspace9.onrender.com/api';
const cleanURL = rawURL.replace(/\/+$/, '');
const baseURL = cleanURL.endsWith('/api') ? cleanURL : `${cleanURL}/api`;

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    const message = err.response?.data?.message || err.message || 'Network error';
    return Promise.reject({ ...err, message, friendly: message });
  },
);
