import { useState, useEffect, useContext } from "react";
import Popup from "./components/Popup/Popup";
import Card from "./components/Card/Card";
import ImagePopup from "./components/ImagePopup/ImagePopup";
import {getCards} from "../../utils/api";
import UserContext from "../../contexts/UserContext";

function Main({ onCardLike, onCardDelete }) {
  const [activePopup, setActivePopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);



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

      console.log('API Response:', response);
      
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
}, [user]);

  if (isLoading) return <div>Loading cards...</div>;
  if (error) return (
    <div className="error-message">
      <p>Error loading cards: {error}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );


  function handleImageClick(card) {
    setSelectedCard(card);
    setActivePopup("image");
  }

  const closeAllPopups = () => {
    setActivePopup(null);
    setSelectedCard(null);
  };

  return (
    <main className="elements">
      <div className="elements__container">
        {cards.length > 0 ? (
          cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onImageClick={handleImageClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
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