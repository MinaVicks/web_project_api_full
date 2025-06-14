import { createContext, useState, useEffect } from 'react';
import { getCurrentUser, updateAvatar } from '../utils/api';

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    about:'',
    isAuthenticated: false
  });


useEffect(() => {
  const loadUser = async () => {
    const token = localStorage.getItem('userToken');
    const savedUser = localStorage.getItem('userData');
    
    if (token) {
      try {
        // Try to fetch fresh data first
        const freshData = await getCurrentUser(token);
        setUserData(freshData);
        localStorage.setItem('userData', JSON.stringify(freshData));
      } catch (error) {
        // Fall back to saved data if fetch fails
        console.log(error)
        if (savedUser) {
          setUserData(JSON.parse(savedUser));
        }
      }
    }
  };
  loadUser();
  }, []);

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

const handleUpdateUser = async () => {
  try {
    const token = localStorage.getItem('userToken');
    if (token) {
      const userData = await getCurrentUser(token);
      setUserData(userData);
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
}

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    setUserData({
      email: '',
      isAuthenticated: false
    });
  };

  const login = (email, token, userData) => {
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userToken', token);
    setUserData({ email });
    localStorage.setItem('userData', JSON.stringify(userData));
     setUserData(userData);
  };

    const handleUpdateAvatar = async (avatarData) => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) throw new Error('No authentication token found');
      
      const updatedUser = await updateAvatar(avatarData, token);
      setUserData(updatedUser);

      localStorage.setItem('userData', JSON.stringify(updatedUser) );
      return updatedUser;
      //onSuccess();
    } catch (error) {
    console.error('Failed to update avatar:', error);
  }
  };

  return (
    <UserContext.Provider value={{ userData, updateUser, logout, login, fetchUser, handleUpdateAvatar, handleUpdateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// contexts/UserContext.js
