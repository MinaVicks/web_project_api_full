import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/images/logo.svg";
import * as auth  from "../utils/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
      try{  
        const data = await auth.register (email, password);

        if(data.token){
        localStorage.setItem("userToken", data.token)
        navigate("/auth/signin");
        } 

      } catch (err) {
          console.log(err);
        }
  };

  return (
    <div className="page">
     
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