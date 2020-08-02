import React from "react";
import NavItem from "./NavItem";

const Nav = (props) => (
  <ul className="nav">
    {props.items.map((i) => {
      return (
        <NavItem
          key={i.id}
          id={i.id}
          route={i.route}
          exact={i.exact}
          link={i.link}
        >
          {i.subnav ? (
            <ul className="nav">
              {i.subnavLinks.map((si) => {
                return (
                  <NavItem key={si.id} route={si.route} exact={si.exact}>
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
