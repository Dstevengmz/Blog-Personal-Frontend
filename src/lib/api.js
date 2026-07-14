import axios from 'axios';
import { clearAuthSession, getStoredToken } from './authStorage';

const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.error;
    if (error?.response?.status === 403 && message === 'Token no válido') {
      clearAuthSession();
    }
    return Promise.reject(error);
  },
);

export default api;
