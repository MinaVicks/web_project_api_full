import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/images/logo.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch ("http://localhost:3001/api/auth/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify({ email, password }),
         });
    const data = await res.json ();
        if(data.token){
        localStorage.setItem("user", JSON.stringify(data.token));
        }
    navigate("/main");
      };

  

  return (
    <div className="page">
     
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
            <button type="submit" className="login__link">
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

export default Login