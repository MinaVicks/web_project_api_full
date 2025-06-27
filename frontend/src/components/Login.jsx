import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import logo from "../assets/images/logo.svg";
import * as auth  from "../utils/auth";
import UserContext from '../contexts/UserContext';
import FailPopup from "../components/InfoToolTip/FailPopup/FailPopup.jsx"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
    const [failPopup, setfailPopup] = useState(null);

  const { login } = useContext (UserContext);

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await login(email, password);
    
    if (response.token) {
      navigate("/main");
    } else {
      setfailPopup(true);
    }
  } catch (err) {
    setfailPopup(true);
    console.error('Login failed:', err);
  }
};

   const handlePopupClose = () => {
    setfailPopup(false);
    console.log("pop close");
  };


  

  return (
    <div className="page">
     
      <FailPopup isOpen={failPopup} onClose={handlePopupClose}></FailPopup>

      <div className="login__header">
        <img src={logo} alt="Logo Around The US" className="login__logo" />
        <Link to="/signup" className="login__login-link">
          Registrate
        </Link>
      </div>

      <hr className="login__line" />

      <div className="login">
        <p className="login__welcome">Iniciar sesión</p>

        <form className="login__form" onSubmit={handleSubmit}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            className="login__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
            className="login__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
          <div className="login__button-container">
            <button type="submit" className="login__link" >
              Iniciar sesión
            </button>
          </div>
        </form>

        <div className="login__login">
          <p>¿Aún no eres miembro?</p>

          <Link to="/signup" className="login__login-link">
            Regístrate Aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;