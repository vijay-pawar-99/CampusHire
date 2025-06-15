import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, RegisterData, JobSeekerProfile, EmployerProfile } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('campushire_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock authentication - in real app, this would be an API call
      const users = JSON.parse(localStorage.getItem('campushire_users') || '[]');
      const foundUser = users.find((u: User) => u.email === email);
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('campushire_user', JSON.stringify(foundUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('campushire_users') || '[]');
      
      // Check if user already exists
      if (users.find((u: User) => u.email === userData.email)) {
        return false;
      }

      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: userData.role,
        createdAt: new Date().toISOString(),
        profile: userData.role === 'employer' ? {
          companyName: userData.companyName || '',
          companySize: '',
          industry: '',
        } as EmployerProfile : {
          skills: [],
          experience: '',
          education: '',
        } as JobSeekerProfile
      };

      users.push(newUser);
      localStorage.setItem('campushire_users', JSON.stringify(users));
      setUser(newUser);
      localStorage.setItem('campushire_user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('campushire_user');
  };

  const updateProfile = async (profileData: Partial<JobSeekerProfile | EmployerProfile>): Promise<boolean> => {
    try {
      if (!user) return false;

      const updatedUser = {
        ...user,
        profile: { ...user.profile, ...profileData }
      };

      const users = JSON.parse(localStorage.getItem('campushire_users') || '[]');
      const userIndex = users.findIndex((u: User) => u.id === user.id);
      
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('campushire_users', JSON.stringify(users));
        setUser(updatedUser);
        localStorage.setItem('campushire_user', JSON.stringify(updatedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};