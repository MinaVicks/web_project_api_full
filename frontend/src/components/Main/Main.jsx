import { useState, useEffect, useContext } from "react";
import Popup from "./components/Popup/Popup";
import Card from "./components/Card/Card";
import ImagePopup from "./components/ImagePopup/ImagePopup";
import {getCards} from "../../utils/api";
import UserContext from "../../contexts/UserContext";

function Main({ cards, onCardLike, onCardDelete }) {
  const [activePopup, setActivePopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const { user } = useContext(UserContext);  //user no pertenece a este componente, si no que es una const GLOBAL
                                              //useEffect, rastrea el cambio incluso si ese cambio ocurre en otro componente

/*
useEffect(() => {
  const fetchCards = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem('userToken');

        if (!token) {
          throw new Error('No authentication token found');
        }

      const response = await getCards(token);

    //  console.log('API Response:', response);
      
        if (!response) {
          throw new Error('No response received from server');
        }

        const cardsData = response.cards || response.data || response;

        if (!Array.isArray(cardsData)) {
          throw new Error('Invalid cards data format');
        }

        setCards(cardsData);

      } catch (err) {
        console.error('Card fetch error:', {
          error: err,
          message: err.message,
          time: new Date().toISOString()
        });
        setError(err.message || 'Failed to load cards');
        setCards([]);
      } finally {
        setIsLoading(false);
      }
  };

  if (user) fetchCards();
}, [user]);  //observador (esta al pendiente de un cambion en user)

  if (isLoading) return <div>Loading cards...</div>;
  if (error) return (
    <div className="error-message">
      <p>Error loading cards: {error}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );





const handleAddCard = async (cardData) => {
  const token = localStorage.getItem('userToken');
  const newCard = await api.createCard(cardData.title, cardData.link, token);
  
  // This forces a complete refresh of the cards list
  const data = await api.getCards(token);
  setCards(data);
  
  return newCard;
};

useEffect(() => {
  console.log('Cards in Main:', cards);
}, [cards]);
*/
 useEffect(() => {
    console.log('Cards received in Main:', cards);
  }, [cards]);


  function handleImageClick(card) {
    setSelectedCard(card);
    setActivePopup("image");
  }

  const closeAllPopups = () => {
    setActivePopup(null);
    setSelectedCard(null);
  };

      const handleCardLike = async (card) => {
      const isLiked = card.likes.some(id => id === user._id);
    try {
      const updatedCard = await onCardLike(card, isLiked);
      setCards(prevCards => 
        prevCards.map(c => 
          c._id === card._id ? updatedCard : c
        )
      );
    } catch (error) {
      console.error('Failed to update like:', error);
    }
  };

  const handleCardDelete = async (card) => {
  const success = await onCardDelete(card);
  if (success) {
    setCards(prevCards => prevCards.filter(c => c._id !== card._id));
  }
};


  return (
    <main className="elements">
      <div className="elements__container">
        {cards.length > 0 ? (
          cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              currentUser={user}
              onImageClick={handleImageClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))
        ) : (
          <p>No cards found</p>
        )}
      </div>
      {activePopup === "image" && selectedCard && (
        <Popup onClose={closeAllPopups}>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </Popup>
      )}
    </main>
  );
}
export default Main;