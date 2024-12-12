export interface User {
  id: string;
  email: string;
  username: string;
}

export interface BCSRecord {
  id: string;
  userId: string;
  timestamp: string;
  bcsScore: number;
  imageUrl: string;
  modelUsed: 'LRM' | 'SVR';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}