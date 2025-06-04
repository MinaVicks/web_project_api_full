import deleteCard from "../../../../assets/images/trash.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

export default function Card({ card, onImageClick, onCardLike, onCardDelete }) {
  const { name, link, isLiked } = card;
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="elements__item">
      <button
        aria-label="Delete card"
        className="elements__delete"
        type="button"
        onClick={() => onCardDelete(card)}
      >
        {" "}
        <img src={deleteCard} alt="Delete" />
      </button>
      <img
        className="elements__image"
        src={link}
        alt={name}
        onClick={() => onImageClick(card)}
      />
      <div className="elements__description">
        <h2 className="elements__description-title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={`elements__description-like ${
            isLiked ? "elements__description-like_active" : ""
          }`}
          onClick={() => onCardLike(card)}
        />
      </div>
    </div>
  );
}
