import React from "react";
import { Link } from "react-router-dom";

const Logout = ({ onLogout }) => {
  return (
    <Link to="/" onClick={onLogout}>
      Logout
    </Link>
  );
};

export default Logout;
