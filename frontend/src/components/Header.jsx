import logo from "../assets/images/logo.svg";
import avataar from "../assets/images/Avatar.png"
import iconEditProfile from "../assets/images/Edit_off.svg";
import addCard from "../assets/images/Add.svg";
import iconEditAvatar from "../assets/images/edit_avatar.svg";
import Popup from "./Main/components/Popup/Popup";
import NewCard from "./Main/components/NewCard/NewCard";
import EditAvatar from "./Main/components/EditAvatar/EditAvatar";
import EditProfile from "./Main/components/EditProfile/EditProfile";

import { useContext , useState} from 'react';
import UserContext  from '../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import * as auth from "../utils/auth";

function Header() {
 
   const { user, isAuthenticated, logout } = useContext(UserContext);
 
  const navigate = useNavigate();

  console.log('Header rendering with user:', user);
  const [popup, setPopup] = useState(null);

  const closePopup = () => setPopup(null);

   const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onSubmitSuccess={closePopup} />,
  };

  const editProfile = {
    title: "Editar perfil",
    children: <EditProfile onSubmitSuccess={closePopup} />,
  };

   const editAvatar = {
    title: "Cambiar avatar",
    children: <EditAvatar onSubmitSuccess={() => {
          closePopup();
          fetchCurrentUser();
        }} />,
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
    console.log(user?.avatar)
  }

  function handleClosePopup() {
    setPopup(null);
  }

    const handleLogout = () => {
    auth.logout();
    navigate('/signin'); // Redirect to login page
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src={logo} alt="Logo Around The US" className="header__logo" />
        </div>

        <div className="profile__user-section">
          <div className="profile__user-mail">
            {isAuthenticated ? (
          <p>{user?.email || 'No email provided'  }</p>
        ) : (
          <p>Welcome, Guest</p>
        )}
          </div>
          <button className="profile__login-link" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
      <hr className="header__line" />

      <section className="profile">
        <div className="profile__container">
          <img
            src={iconEditAvatar}
            alt="Edit pencil"
            className="profile__avatar-edit"
            onClick={() => handleOpenPopup(editAvatar)}
          />
          <div className="profile__avatar-opacity"></div>
          <img
            src={user?.avatar}
            alt="Profile picture"
            className="profile__avatar"
            //key={user.avatar }
          />
        </div>

        <div className="profile__info">
          <div className="profile__info-title">
            <h1 className="profile__info-name">
              {user?.name}
            </h1>

            <button
              className="profile__info-edit"
            onClick={() => handleOpenPopup(editProfile)}
            >
              <img src={iconEditProfile} alt="Edit button" />
            </button>
          </div>
          <h2 className="profile__info-subtitle">
            {user?.about || "Nada"}
          </h2>
        </div>

        <button
          className="profile__add"
          onClick={() => handleOpenPopup(newCardPopup)}
        >
          <img src={addCard} alt="Add new item" className="profile__add-img" />
        </button>
      </section>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
         
          {popup.children}
        </Popup>
      )}
    </header>
  );
}
export default Header;
