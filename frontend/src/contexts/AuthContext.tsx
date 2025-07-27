import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, UserRole, AuthState } from '@/types/auth';
import { APP_CONFIG } from '@/constants/app';

const AuthContext = createContext<AuthState | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Recuperar usuário do localStorage na inicialização
    const initializeAuth = async () => {
      try {
        const savedUser = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.USER);
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        // Limpar dados corrompidos
        localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.USER);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback((email: string, role: UserRole) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      name: email.split('@')[0].replace(/[^a-zA-Z\s]/g, ''),
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}`
    };
    
    setUser(newUser);
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.USER, JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.USER);
    // Limpar outros dados relacionados ao usuário
    localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.PREFERENCES);
  }, []);

  const authValue: AuthState = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};