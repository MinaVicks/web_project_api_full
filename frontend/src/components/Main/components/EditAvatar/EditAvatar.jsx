import { useContext, useRef, useState } from "react";
import UserContext from "../../../../contexts/UserContext";

function EditAvatar({ onSubmitSuccess }) {
  const userContext = useContext(UserContext);
const { user, handleUpdateAvatar} =userContext;

const [avatar, setAvatar] = useState (user.avatar);

const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(false);

const handleAvatarChange = (event) =>{
  setAvatar(event.target.value);
}

const handleSubmit = async (event) =>{
  event.preventDefault();
  setIsLoading(true);
  setError(false);
  try {
  await handleUpdateAvatar ({avatar});
    onSubmitSuccess();
  } catch (err) {
     setError(err.message || "Failed to update");
    } finally {
      setIsLoading(false);
    }
  };

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
          value = {avatar}
          onChange={handleAvatarChange}
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

export default EditAvatar;
