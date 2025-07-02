import { useState, useContext } from "react";
import UserContext  from "../../../../contexts/UserContext";

function EditProfile({ onSubmitSuccess }) {
  const userContext = useContext(UserContext); 
  const { user, handleUpdateUser } = userContext;

  const [name, setName] = useState(user.name); 
  const [about, setAbout] = useState(user.about); 

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value); 
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setIsLoading(true);
    setError(false);
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
          value={name} 
          onChange={handleNameChange} 
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
          value={about} 
          onChange={handleAboutChange}
        />
        
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
