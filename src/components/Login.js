import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import { FaSignInAlt } from "react-icons/fa";

const Login = ({ handleLogin, error }) => {
  const [login, setLogin] = useState(false);

  return (
    <div className="login">
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
