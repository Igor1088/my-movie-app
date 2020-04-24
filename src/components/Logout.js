import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const Logout = ({ onLogout }) => (
  <Link to="/" onClick={onLogout} className="logout-btn">
    <span>Logout</span>
    <FaSignOutAlt />
  </Link>
);

export default Logout;
