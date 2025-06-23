import { useState, useContext } from "react";
import UserContext  from "../../../../contexts/UserContext";

function EditProfile({ onSubmitSuccess }) {
  const userContext = useContext(UserContext); // Obtiene el objeto currentUser
  const { user, handleUpdateUser } = userContext;

  const [name, setName] = useState(user.name); // Agrega la variable de estado para name
  const [about, setAbout] = useState(user.about); // Agrega la variable de estado para description

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value); // Actualiza name cuando cambie la entrada
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value); // Actualiza description cuando cambie la entrada
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del envío de formularios
    setIsLoading(true);
    setError(null);
    try{
    handleUpdateUser({ name, about});
     onSubmitSuccess();
    }catch (err){
      setError(err.message || "Failed to update");
    } finally {
      setIsLoading(false);
    }
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
          value={about} // Vincula description con la entrada
          onChange={handleAboutChange} // Agrega el controlador onChange
        />
        {error && <span className="popup__error" id="input-description-error">{error}</span>}
      </label>

       <button 
        className="popup__button_add popup__submit-btn" 
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  );
}

export default EditProfile;
