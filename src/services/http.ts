import axios from 'axios';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://api.finbud.local/hrms',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('finbud_access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
