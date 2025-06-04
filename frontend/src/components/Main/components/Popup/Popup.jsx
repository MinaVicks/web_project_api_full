import btnClose from "../../../../assets/images/Close_off.svg";

export default function Popup(props) {
  const { title, children, onClose } = props;

  return (
    <div className={`popup ${!title ? "popup_image" : ""}`}>
      <div
        className={`popup__container ${!title ? "popup__container_image" : ""}`}
      >
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClose}
        >
          {" "}
          <img src={btnClose} alt="Close button" />
        </button>
        {title && (
          <div className="popup__card">
            <h3 className="popup__title">{title}</h3>
            {children}
          </div>
        )}
        {!title && children}
      </div>
    </div>
  );
}
