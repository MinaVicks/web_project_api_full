function ImagePopup({ card }) {
  return (
    <div className="popup__imageFull-content">
      <img src={card.link} alt={card.title} className="popup__imageFull-image" />
      <h3 className="popup_titleFull">{card.title}</h3>
    </div>
  );
}
export default ImagePopup;
