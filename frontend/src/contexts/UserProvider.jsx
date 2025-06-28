import {  useState, useEffect, useCallback, useContext } from 'react';
import * as api  from '../utils/api';
import UserContext from './UserContext';
import * as auth  from "../utils/auth";

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cards, setCards] =useState (null);

  const logout = useCallback(() => {
    localStorage.removeItem('userToken');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const login = useCallback(async (email, password) => {
  try {
    const response = await auth.login(email, password);
    
    if (response.success) {
      localStorage.setItem('userToken', response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    }
    
    throw new Error(response.message || 'Login failed');
    
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}, []);

  const fetchCurrentUser = useCallback(async () => {
  try {
    const token = localStorage.getItem('userToken');
    if (!token) return;

    const response = await auth.getCurrentUser(token);
    
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

const handleUpdateAvatar = useCallback(async (avatarData) => {
    try {
      const token = localStorage.getItem('userToken');
      const updatedUser = await api.updateAvatar(avatarData, token);
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
    const updatedUser = await api.updateUserInformation(userData, token);
    setUser(prev => ({ ...prev, ...updatedUser }));
    
    console.log('Response:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('User update failed:', error);
    throw error;
  }
}, []);

const handleNewPlace = useCallback (async (cardData , onSuccess) => {
  try{
     const token = localStorage.getItem('userToken');
    const newCard= await api.createCard(cardData.title, cardData.link, token);
     setCards(prev => [...prev, ...newCard]);
    
      if (onSuccess) onSuccess();
      return newCard;

  }catch (error){
   console.error('New card failed:', error);
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
      handleUpdateUser,
      handleNewPlace
    }}>
      {children}
    </UserContext.Provider>
  );
}