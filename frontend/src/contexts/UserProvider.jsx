import {  useState, useEffect, useCallback } from 'react';
import { getCurrentUser, updateAvatar } from '../utils/api';
import UserContext from './UserContext';

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchCurrentUser = useCallback(async () => {
  try {
    const token = localStorage.getItem('userToken');
    if (!token) return;

    const response = await getCurrentUser(token);
    
    if (response.success && response.user) {
      setUser(response.user);
      setIsAuthenticated(true);
    } else {
      throw new Error(response.message || 'Failed to fetch user');
    }
    
  } catch (error) {
    console.error('Failed to fetch user:', error);
    logout();
  }
}, [logout]);

const login = useCallback(async (email, password) => {
  try {
    const response = await auth.login(email, password);
    
    if (response.success && response.token && response.user) {
      localStorage.setItem('userToken', response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      return response.user;
    }
    
    throw new Error(response.message || 'Login failed');
    
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}, []);

  const logout = useCallback(() => {
    localStorage.removeItem('userToken');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const handleUpdateAvatar = useCallback(async (avatarData) => {
    try {
      const token = localStorage.getItem('userToken');
      const updatedUser = await updateAvatar(avatarData, token);
      setUser(prev => ({ ...prev, ...updatedUser }));
      return updatedUser;
    } catch (error) {
      console.error('Avatar update failed:', error);
      throw error;
    }
  }, []);

const handleUpdateUser = useCallback(async (userData) => {
  try {
    const token = localStorage.getItem('userToken');
    const updatedUser = await updateUserInformation(userData, token);
    setUser(prev => ({ ...prev, ...updatedUser }));
    return updatedUser;
  } catch (error) {
    console.error('User update failed:', error);
    throw error;
  }
}, []);



  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return (
    <UserContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      handleUpdateAvatar,
      refreshUser: fetchCurrentUser, handleUpdateUser
    }}>
      {children}
    </UserContext.Provider>
  );
}