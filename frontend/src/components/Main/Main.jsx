import { useState} from "react";
import Popup from "./components/Popup/Popup";
import Card from "./components/Card/Card";
import ImagePopup from "./components/ImagePopup/ImagePopup";
import api from "../../utils/api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main({ cards, onCardLike, onCardDelete }) {
  const [activePopup, setActivePopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const { currentUser } = useContext(CurrentUserContext);

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
