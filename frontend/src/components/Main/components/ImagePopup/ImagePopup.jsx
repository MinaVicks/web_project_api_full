function ImagePopup({ card }) {
  return (
    <div className="popup__imageFull-content">
      <img src={card.link} alt={card.name} className="popup__imageFull-image" />
      <h3 className="popup_titleFull">{card.name}</h3>
    </div>
  );
}
export default ImagePopup;
