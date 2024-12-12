import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  const { token } = response.data;
  localStorage.setItem('token', token);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const predictBCS = async (imageData: string, model: 'LRM' | 'SVR') => {
  const response = await api.post('/predict', { imageData, model });
  return response.data;
};

export const savePrediction = async (prediction: {
  bcsScore: number;
  imageUrl: string;
  modelUsed: 'LRM' | 'SVR';
}) => {
  const response = await api.post('/predictions', prediction);
  return response.data;
};

export const getPredictionHistory = async () => {
  const response = await api.get('/predictions');
  return response.data;
};

export default api;