import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

function Navigation() {
  return (
    <nav className="nav-bar">
      <ul className="nav">
        <li className="nav__item">
          <Link to="/" className="nav__link">
            Home
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/tvshows" className="nav__link">
            Tv Shows
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/people" className="nav__link">
            People
          </Link>
        </li>
      </ul>
      <Dropdown
        data={[
          { id: 1, link: "Popular", route: "/movies/popular" },
          { id: 2, link: "Top Rated", route: "/movies/top_rated" },
          { id: 3, link: "Upcoming", route: "/movies/upcoming" }
        ]}
        title="Movies"
      />
    </nav>
  );
}

export default Navigation;
