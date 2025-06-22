import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/images/logo.svg";
import * as auth  from "../utils/auth";
import SuccessPopup from "../components/InfoToolTip/successPopup/successPopup.jsx"
import FailPopup from "../components/InfoToolTip/FailPopup/FailPopup.jsx"

const Register = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(null);
  const [showFailPopup, setShowFailPopup] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
    const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
      try{  
        const response = await auth.register (data.email, data.password);
        if(response.success || response.userId){
        //localStorage.setItem("userToken", response.token)
        setShowSuccessPopup(true);
        //navigate("/auth/signin");
        //login(response.token, { email: response.email });
        } 
      } catch (err) {
          setShowFailPopup(true);
          
          console.log(err);
        }
  };

  const handlePopupCloseSuccess = () => {
    setShowSuccessPopup(false);
    navigate("/signin");
  };
  const handlePopupClose = () => {
    setShowFailPopup(false);
  };

  return (
    <div className="page">

      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={handlePopupCloseSuccess}
      ></SuccessPopup>

      <FailPopup isOpen={showFailPopup} onClose={handlePopupClose}>

      </FailPopup>
     
      <div className="login__header">
        <img src={logo} alt="Logo Around The US" className="login__logo" />
        <Link to="/signin" className="login__login-link">
          Inicia sesión
        </Link>
      </div>

      <hr className="login__line" />

      <div className="login">
        <p className="login__welcome">Registrate</p>

        <form className="login__form" onSubmit={handleSubmit}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            className="login__input"
            value={data.email}
            onChange={handleChange}
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
            className="login__input"
            value={data.password}
            onChange={handleChange}
        />
          <div className="login__button-container">
            <button type="submit" className="login__link">
              Registrate
            </button>
          </div>
        </form>

        <div className="login__login">
          <p>¿Ya eres miembro?</p>

          <Link to="/signin" className="login__login-link">
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;