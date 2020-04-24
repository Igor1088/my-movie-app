import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = (props) => (
  <li key={props.id} className="nav__item">
    <NavLink
      strict
      to={props.route}
      activeClassName="active"
      className="nav__link"
      exact={props.exact}
    >
      {props.link}
      {props.children}
    </NavLink>
  </li>
);

export default NavItem;
