import { useState } from "react";


export default function NewCard({ onSubmitSuccess }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const [error, setError] = useState(null);

  


  const handleTitleChange = (event) => {
    setTitle(event.target.value); 
    
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value); 
    
  };

  const validateURL = (url) => {
    try {
      new URL(url);
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = {
    title: title.trim(),
    link: link.trim()
  };
  
  
  if (!formData.title || !formData.link) {
    setError("Title and image link are required");
    return;
  }

  if (!validateURL(formData.link)) {
    setError("Please enter a valid image URL");
    return;
  }

  try {
    await onSubmitSuccess(formData); 
    setTitle("");
    setLink("");
    setError(null);
  } catch (err) {
    setError(err.message || "Failed to create card");
  }
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
          value={title}
          onChange={handleTitleChange}
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
