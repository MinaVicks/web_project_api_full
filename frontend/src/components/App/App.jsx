/* eslint-disable no-unused-vars */
import Login from '../Login';
import Register from '../Register';
import Header from '../Header';
import Main from '../Main/Main';
import Footer from '../Footer';

import { UserProvider } from '../../contexts/UserProvider.jsx';
import { useState, useEffect, useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute.jsx';
import * as api  from "../../utils/api.jsx";

import UserContext from '../../contexts/UserContext.jsx';

function App() {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  //const [currentUser, setCurrentUser] = useState(null);
  //const { user: currentUser } = useContext(UserContext);
  

  /* useEffect(() => {
    const fetchCards = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const cardsData = await api.getCards(token);
        setCards(cardsData);
      } catch (err) {
        setError(err.message);
        console.log(error)
      } 
    };

    fetchCards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
*/


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
}


  return (
    <UserProvider>
    <Routes>
      <Route
      path="/main"
      element= {
       <ProtectedRoute>
        <div className="page">
                <Header  />
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
