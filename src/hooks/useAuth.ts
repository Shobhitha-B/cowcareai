import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import api from '../utils/api';
import { validateEmail, validatePassword } from '../utils/validation';

export const useAuth = () => {
  const navigate = useNavigate();
  const { login: setAuth, logout: clearAuth } = useAuthStore();

  const login = useCallback(async (email: string, password: string) => {
    if (!validateEmail(email)) {
      throw new Error('Invalid email format');
    }

    if (!validatePassword(password)) {
      throw new Error('Password must be at least 8 characters');
    }

    const { data } = await api.post('/auth/login', { email, password });
    setAuth(data.user);
    localStorage.setItem('token', data.token);
    navigate('/');
  }, [navigate, setAuth]);

  const logout = useCallback(() => {
    clearAuth();
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate, clearAuth]);

  return { login, logout };
};