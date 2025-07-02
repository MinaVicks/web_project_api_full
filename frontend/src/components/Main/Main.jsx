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



  function handleImageClick(card) {
    setSelectedCard(card);
    setActivePopup("image");
  }

  const closeAllPopups = () => {
    setActivePopup(null);
    setSelectedCard(null);
  };


const handleCardLike = async (card) => {
  if (!user) return; 
  
  const isLiked = card.likes.some(id => id === user._id);
  try {
    await onCardLike(card, isLiked);
    
  } catch (error) {
    console.error('Like update failed:', error);
    
  }
};

const handleCardDelete = async (card) => {
  try {
    const success = await onCardDelete(card);
    if (success) {
      console.log('Card deleted successfully');
      
    }
  } catch (error) {
    console.error('Failed to delete card:', error);
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