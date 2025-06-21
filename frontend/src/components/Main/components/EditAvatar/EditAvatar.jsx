import { useContext, useRef, useState } from "react";
import UserContext from "../../../../contexts/UserContext";

function EditAvatar({ onSubmitSuccess }) {
  const { handleUpdateAvatar } = useContext(UserContext);
  const avatarRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log({avatar: avatarRef.current.value});
setIsLoading(true);
    setError(null);
    try {
      await handleUpdateAvatar(
      { avatar: avatarRef.current.value }
    );
    
    } catch (err){
      setError(err.message.includes('HTML') 
      ? 'Server error - please try again later'
      : err.message);
    }finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="popup__form popup__input"
      name="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__text popup__input_avatarUrl"
          id="input-avatar"
          name="avatar_link"
          placeholder="Enlace a la imagen"
          required
          type="url"
          ref={avatarRef}
        />
        <span className="popup__error" id="input-url-error"></span>
      </label>
      {error && <p className="popup__error-message">{error}</p>}

      <button className="popup__button_add popup__submit-btn" type="submit" disabled={isLoading}
      >
        {isLoading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  );
}
/*popup__button_add*/
export default EditAvatar;
