import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

export default function NewCard({ onSubmitSuccess }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const { handleAppPlaceSubmit } = useContext(CurrentUserContext);

  const handleNameChange = (event) => {
    setName(event.target.value); // Actualiza name cuando cambie la entrada
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value); // Actualiza description cuando cambie la entrada
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ name, link });
    handleAppPlaceSubmit({ name, link }, onSubmitSuccess);
  };

  return (
    <form
      className="popup__input popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__text popup__input_title"
          id="input-place"
          maxLength="30"
          minLength="1"
          name="title"
          placeholder="Title"
          required
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="input-place-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__text popup__input_url"
          id="input-url"
          name="link"
          placeholder="Image link"
          required
          type="url"
          value={link}
          onChange={handleLinkChange}
        />
        <span className="popup__error" id="input-url-error"></span>
      </label>

      <button className="popup__button_add popup__submit-btn" type="submit">
        Guardar
      </button>
    </form>
  );
}
