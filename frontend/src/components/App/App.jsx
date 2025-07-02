/* eslint-disable no-unused-vars */
import Login from '../Login';
import Register from '../Register';
import Header from '../Header';
import Main from '../Main/Main';
import Footer from '../Footer';

import { UserProvider } from '../../contexts/UserProvider.jsx';
import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute.jsx';
import * as api  from "../../utils/api.jsx";



function App() {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);

    useEffect(() => {
    const fetchInitialCards = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const data = await api.getCards(token);
        setCards(data);
      } catch (err) {
        console.error('Failed to load cards:', err);
        setError(true);
      }
    };
    
    fetchInitialCards();
  }, []);

  async function handleCardLike (card,isLiked)  {
    
  const token = localStorage.getItem('userToken'); 

  try {
    const updatedCard = await api.changeLikeCardStatus(card._id, !isLiked, token);
    return updatedCard;
  
  } catch (error) {
    console.error('Error updating like:', error);
  }
    console.log('Liked card:', card);
  };

async function handleCardDelete(card) {
  const token = localStorage.getItem('userToken');
  
  if (!window.confirm('Are you sure you want to delete this card?')) {
    return false;
  }

  try {
    await api.deleteCard(card._id, token);
    setCards(prevCards => prevCards.filter(c => c._id !== card._id));
    return true;
  } catch (error) {
    console.error('Error deleting card:', error);
    return false;
  }
};

useEffect(() => {
  const fetchCards = async () => {
    const token = localStorage.getItem('userToken');
    const data = await api.getCards(token);
    setCards(data);
  };
  fetchCards();
}, []);

useEffect(() => {
  console.log('App.jsx cards state:', cards);
}, [cards]);

useEffect(() => {
  if (cards.length === 0) {
    console.log('No cards loaded - checking token...');
    const token = localStorage.getItem('userToken');
    console.log('Current token:', token);
  }
}, [cards]);

// Keep your existing handleAddCard implementation
const handleAddCard = async (cardData) => {
  const token = localStorage.getItem('userToken');
  try {
    const response = await api.createCard(cardData.title, cardData.link, token);
    const newCard = response.card || response.data;
    
    setCards(prevCards => {
      const updatedCards = [newCard, ...prevCards];
      console.log('Updated cards:', updatedCards);
      return updatedCards;
    });
    
    return newCard;
  } catch (error) {
    console.error('Error adding card:', error);
    throw error;
  }
};
 

  return (
    <UserProvider
    >
    <Routes>
      <Route
      path="/main"
      element= {
       <ProtectedRoute>
        <div className="page">
                <Header onAddCard={handleAddCard} />
                <Main 
                cards={cards} 
                onCardLike={handleCardLike} 
                onCardDelete={handleCardDelete} />
                <Footer />
              </div>
              </ProtectedRoute>
      }/>
    <Route
          path="/signin"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Register />}
        />
       <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
    </UserProvider>
  );
}

export default App;
