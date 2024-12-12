import { create } from 'zustand';
import { AuthState } from '../types';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    // TODO: Implement actual API call
    set({ 
      isAuthenticated: true, 
      user: { 
        id: '1', 
        email, 
        username: email.split('@')[0] 
      } 
    });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));