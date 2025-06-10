import { useState, useEffect, useContext } from "react";
import Popup from "./components/Popup/Popup";
import Card from "./components/Card/Card";
import ImagePopup from "./components/ImagePopup/ImagePopup";
import {getCards} from "../../utils/api";
import { UserContext } from "../../contexts/UserContext";

function Main({ cards, onCardLike, onCardDelete }) {
  const [activePopup, setActivePopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [card, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('userToken');
        
        const cardsData = await getCards(token);
        
        setCards(cardsData);
        console.log(card);
      } catch (err) {
        console.error("Full error:", err);
        setError(err.message);
        console.error("Error fetching cards:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userData) {
      fetchCards();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]); 

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
