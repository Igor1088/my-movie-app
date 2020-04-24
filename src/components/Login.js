import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import { FaSignInAlt } from "react-icons/fa";

const Login = ({ handleLogin, error }) => {
  const [login, setLogin] = useState(false);

  return (
    <div className="login">
      <a
        href="https://www.themoviedb.org/account/signup"
        target="_blank"
        rel="noopener noreferrer"
        className="login-register"
      >
        Register
      </a>
      <Link onClick={() => setLogin(!login)} className="login-btn">
        <span>Login</span>
        <FaSignInAlt />
      </Link>
      <LoginForm handleLogin={handleLogin} login={login} error={error} />
      <div
        className={`mask ${login ? "" : "hidden"}`}
        onClick={() => setLogin(false)}
      ></div>
    </div>
  );
};

export default Login;
