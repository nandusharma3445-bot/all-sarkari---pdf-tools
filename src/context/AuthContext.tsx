import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  currentUser: UserProfile | null;
  loading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  signup: (name: string, email: string, password?: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  toggleSavedTool: (toolId: string) => void;
  recordFileAction: () => void;
}

const STORAGE_KEY = 'desi_all_tools_user';
const USERS_DB_KEY = 'desi_all_tools_registered_users';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCurrentUser(JSON.parse(saved));
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  const persistUser = (user: UserProfile | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = async (email: string, _password?: string): Promise<boolean> => {
    // Check local database or create
    const storedUsersJson = localStorage.getItem(USERS_DB_KEY);
    const users: Record<string, { name: string; email: string }> = storedUsersJson
      ? JSON.parse(storedUsersJson)
      : {};

    const existing = users[email.toLowerCase()];
    const displayName = existing ? existing.name : email.split('@')[0];

    const user: UserProfile = {
      uid: 'user_' + Math.random().toString(36).substring(2, 9),
      email: email.toLowerCase(),
      displayName: displayName.charAt(0).toUpperCase() + displayName.slice(1),
      photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=f59e0b,3b82f6,10b981`,
      createdAt: new Date().toLocaleDateString('hi-IN'),
      savedTools: ['photo-resizer', 'sarkari-form-tracker', 'pdf-merge'],
      recentFilesCount: 3
    };

    persistUser(user);
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    // Simulated Google OAuth login with high fidelity
    const defaultEmail = 'aspirant.india@gmail.com';
    const user: UserProfile = {
      uid: 'google_' + Math.random().toString(36).substring(2, 9),
      email: defaultEmail,
      displayName: 'Indian Sarkari Aspirant',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      createdAt: new Date().toLocaleDateString('en-US'),
      savedTools: ['photo-resizer', 'pdf-compress', 'sarkari-form-tracker'],
      recentFilesCount: 7
    };
    persistUser(user);
    return true;
  };

  const signup = async (name: string, email: string, _password?: string): Promise<boolean> => {
    const storedUsersJson = localStorage.getItem(USERS_DB_KEY);
    const users: Record<string, { name: string; email: string }> = storedUsersJson
      ? JSON.parse(storedUsersJson)
      : {};

    users[email.toLowerCase()] = { name, email: email.toLowerCase() };
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));

    const user: UserProfile = {
      uid: 'user_' + Math.random().toString(36).substring(2, 9),
      email: email.toLowerCase(),
      displayName: name,
      photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=f59e0b,3b82f6,10b981`,
      createdAt: new Date().toLocaleDateString('en-US'),
      savedTools: ['photo-resizer', 'pdf-compress', 'sarkari-form-tracker'],
      recentFilesCount: 0
    };

    persistUser(user);
    return true;
  };

  const forgotPassword = async (email: string) => {
    return {
      success: true,
      message: `A password reset link has been sent to your email address (${email}). Please check your inbox or spam folder.`
    };
  };

  const logout = () => {
    persistUser(null);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    persistUser(updated);
  };

  const toggleSavedTool = (toolId: string) => {
    if (!currentUser) return;
    const exists = currentUser.savedTools.includes(toolId);
    const newSaved = exists
      ? currentUser.savedTools.filter(id => id !== toolId)
      : [...currentUser.savedTools, toolId];
    updateProfile({ savedTools: newSaved });
  };

  const recordFileAction = () => {
    if (!currentUser) return;
    updateProfile({ recentFilesCount: (currentUser.recentFilesCount || 0) + 1 });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        login,
        loginWithGoogle,
        signup,
        forgotPassword,
        logout,
        updateProfile,
        toggleSavedTool,
        recordFileAction
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
