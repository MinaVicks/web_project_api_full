import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

function EditProfile({ onSubmitSuccess }) {
  const userContext = useContext(CurrentUserContext); // Obtiene el objeto currentUser
  const { currentUser, handleUpdateUser } = userContext;

  const [name, setName] = useState(currentUser.name); // Agrega la variable de estado para name
  const [description, setDescription] = useState(currentUser.about); // Agrega la variable de estado para description

  const handleNameChange = (event) => {
    setName(event.target.value); // Actualiza name cuando cambie la entrada
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Actualiza description cuando cambie la entrada
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del envío de formularios

    handleUpdateUser({ name, about: description }, onSubmitSuccess);
  };

  return (
    <form
      className="popup__form popup__input"
      name="profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__text popup__text_title"
          id="input-name"
          minLength="2"
          maxLength="40"
          name="name"
          placeholder="Nombre"
          required
          type="text"
          value={name} // Vincula name con la entrada
          onChange={handleNameChange} // Agrega el controlador onChange
        />
        <span className="popup__error" id="input-name-error"></span>
      </label>

      <label className="popup__field">
        <input
          className="popup__text popup__text_about"
          id="input-description"
          minLength="2"
          maxLength="200"
          name="description"
          placeholder="Acerca de mí"
          required
          type="text"
          value={description} // Vincula description con la entrada
          onChange={handleDescriptionChange} // Agrega el controlador onChange
        />
        <span className="popup__error" id="input-description-error"></span>
      </label>

      <button className="popup__button_add popup__submit-btn" type="submit">
        Guardar
      </button>
    </form>
  );
}

export default EditProfile;
