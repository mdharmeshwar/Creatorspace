import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'https://creatorspace9.onrender.com/api';

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
