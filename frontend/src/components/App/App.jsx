/* eslint-disable no-unused-vars */

import Login from '../Login';
import Register from '../Register';
import Header from '../Header';
import Main from '../Main/Main';
import Footer from '../Footer';
//import api from "../../utils/api";

import { UserProvider } from '../../contexts/UserContext.jsx';

import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getCards, } from "../../utils/api";

function App() {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  

   useEffect(() => {
    const fetchCards = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const cardsData = await getCards(token);
        setCards(cardsData);
      } catch (err) {
        setError(err.message);
        console.log(error)
      } 
    };

    fetchCards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*const handleUpdateAvatar = (data, onSuccess) => {
    (async () => {
      const updateAvatar = await updateAvatar(data).then((newData) => {
        setCurrentUser(newData);
        if (onSuccess) onSuccess();
      });
    })();
  };
  value={{
        currentUser,
        //handleUpdateAvatar,
      }}
*/
  

  const handleCardLike = (card) => {
    // Implement like functionality
    console.log('Liked card:', card);
  };

  const handleCardDelete = (card) => {
    // Implement delete functionality
    console.log('Deleted card:', card);
  };



  return (
    <UserProvider>
    <Routes>
      <Route
      path="/main"
      element= {
       
        <div className="page">
                <Header  />
                <Main 
                cards={cards} 
                onCardLike={handleCardLike} 
                onCardDelete={handleCardDelete} />
                <Footer />
              </div>
              
      }/>
    <Route
          path="/signin"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Register />}
        />
    </Routes></UserProvider>
  );
}

export default App;
