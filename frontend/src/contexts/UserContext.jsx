import { createContext, useState, useEffect } from 'react';
import { getCurrentUser, updateAvatar } from '../utils/api';

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email: '',
    isAuthenticated: false
  });


  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserData({
        email,
        isAuthenticated: true
      });
    }
  }, []);

  const updateUser = (email) => {
    localStorage.setItem('userEmail', email);
    setUserData({
      email,
      isAuthenticated: true
    });
  };

  const fetchUser = async () => {
  try {
    const token = localStorage.getItem('userToken');
    if (token) {
      const userData = await getCurrentUser(token);
      setUserData(userData);
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
};

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    setUserData({
      email: '',
      isAuthenticated: false
    });
  };

  const login = (email, token) => {
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userToken', token);
    setUserData({ email });
  };

    const handleUpdateAvatar = async (avatarData, onSuccess) => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) throw new Error('No authentication token found');
      
      const updatedUser = await updateAvatar(avatarData, token);
      setUserData(updatedUser);
      
      if (onSuccess) onSuccess();
    } catch (error) {
    console.error('Failed to update avatar:', error);
  }
  };

  return (
    <UserContext.Provider value={{ userData, updateUser, logout, login, fetchUser, handleUpdateAvatar  }}>
      {children}
    </UserContext.Provider>
  );
};

// contexts/UserContext.js
