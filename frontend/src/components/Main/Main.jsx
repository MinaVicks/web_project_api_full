import { useState, useEffect, useContext } from "react";
import Popup from "./components/Popup/Popup";
import Card from "./components/Card/Card";
import ImagePopup from "./components/ImagePopup/ImagePopup";
import {getCards} from "../../utils/api";
import UserContext from "../../contexts/UserContext";

function Main({ cards, onCardLike, onCardDelete }) {
  const [activePopup, setActivePopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [card, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);



useEffect(() => {
  const fetchCards = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('userToken');
      const response = await getCards(token);
      
      if (response.success) {
        setCards(response.cards);
      } else {
        setError(response.message || 'Failed to load cards');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (user) fetchCards();
}, [user]);

  if (isLoading) return <div>Loading cards...</div>;
  if (error) return <div>Error loading cards: {error}</div>;

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
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onImageClick={handleImageClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
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
