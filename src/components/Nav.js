import React from "react";
import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";

const Nav = props => (
  <ul className="nav">
    {props.items.map(i => {
      return (
        <NavItem id={i.id} route={i.route} exact={i.exact} link={i.link}>
          {i.subnav ? (
            <ul className="nav">
              {i.subnavLinks.map(si => {
                return (
                  <NavItem route={si.route} exact={si.exact}>
                    {si.link}
                  </NavItem>
                );
              })}
            </ul>
          ) : null}
        </NavItem>
      );
    })}
  </ul>
);

export default Nav;
