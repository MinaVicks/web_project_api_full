import btnClose from "../../../assets/images/Close_off.svg";
import success from "../../../assets/images/success.svg";

function SuccessPopup({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="popup">
      <div className="popup__container">
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClose}
        >
          {" "}
          <img src={btnClose} alt="Close button" />
        </button>
        <div className="popup__card">
          <img src={success} alt="success" className="popup__infoTool" />

          <h3 className="popup__title">¡Correcto! Ya estás registrado.</h3>
        </div>
      </div>
    </div>
  );
}
export default SuccessPopup;
