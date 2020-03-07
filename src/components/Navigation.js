import React, { Component } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import SearchBox from "../containers/Search";

const movieLinks = [
  { id: 1, link: "Popular", route: "/movies/popular" },
  { id: 2, link: "Top Rated", route: "/movies/top-rated" },
  { id: 3, link: "Upcoming", route: "/movies/upcoming" },
  { id: 4, link: "Now Playing", route: "/movies/now-playing" }
];

const tvLinks = [
  { id: 1, link: "Popular", route: "/tv-show/popular" },
  { id: 2, link: "Top Rated", route: "/tv-show/top-rated" },
  { id: 3, link: "On Tv", route: "/tv-show/on-tv" },
  { id: 4, link: "Airing Today", route: "/tv-show/airing-today" }
];

class Navigation extends Component {
  render() {
    return (
      <nav className="nav-bar">
        <SearchBox />
        <ul className="nav">
          <li className="nav__item">
            <Link to="/" className="nav__link">
              Home
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/people" className="nav__link">
              People
            </Link>
          </li>
          <li>
            <Dropdown data={tvLinks} title="Tv Shows" />
          </li>
          <li>
            <Dropdown data={movieLinks} title="Movies" />
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
