import axios from 'axios';

const baseURL = 'http://localhost:5000';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config: any) => {
  try {
    const stored = typeof window !== 'undefined' && localStorage.getItem('auth');
    if (stored && config.headers) {
      const { token } = JSON.parse(stored);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
});

export default api;