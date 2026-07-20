import axios from 'axios';

let rawURL = (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim()) || '';

if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  if (!rawURL || rawURL.includes('localhost') || rawURL.includes('127.0.0.1')) {
    rawURL = 'https://creatorspace9.onrender.com/api';
  }
} else if (!rawURL) {
  rawURL = 'http://localhost:5000/api';
}

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
