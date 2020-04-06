import React from "react";
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  return <Link onClick={onLogin}>Login</Link>;
};

export default Login;
