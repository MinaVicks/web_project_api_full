import btnClose from "../../../assets/images/Close_off.svg";
import fail from "../../../assets/images/failed.svg";

function FailPopup({ isOpen, onClose }) {
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
          <img src={fail} alt="success" className="popup__infoTool" />

          <h3 className="popup__title">
            Uy, algo salió mal. Por favor, intentalo de nuevo.
          </h3>
        </div>
      </div>
    </div>
  );
}
export default FailPopup;
