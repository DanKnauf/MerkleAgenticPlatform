import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@/types';
import { mockUsers, mockCredentials } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      const foundUser = mockUsers.find(u => u.userId === storedUserId);
      if (foundUser) {
        setUser(foundUser);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const credential = mockCredentials.find(
      c => c.email === email && c.password === password
    );

    if (credential) {
      const foundUser = mockUsers.find(u => u.userId === credential.userId);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('userId', foundUser.userId);
        setIsLoading(false);
        return true;
      }
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userId');
  };

  const switchUser = (userId: string) => {
    const foundUser = mockUsers.find(u => u.userId === userId);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('userId', foundUser.userId);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        switchUser,
      }}
    >
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
