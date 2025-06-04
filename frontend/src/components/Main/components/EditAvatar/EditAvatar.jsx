import { useContext, useRef } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

function EditAvatar({ onSubmitSuccess }) {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateAvatar(
      {
        avatar: avatarRef.current.value,
      },
      onSubmitSuccess
    );
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

      <button className="popup__button_add popup__submit-btn" type="submit">
        Guardar
      </button>
    </form>
  );
}
/*popup__button_add*/
export default EditAvatar;
