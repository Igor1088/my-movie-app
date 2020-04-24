import React from "react";
import SearchBox from "../containers/Search";
import Nav from "./Nav";

const navLinks = [
  { id: 1, link: "Home", route: "/", exact: true },
  { id: 2, link: "People", route: "/people" },
  {
    id: 3,
    link: "Movies",
    subnav: true,
    subnavLinks: [
      { id: 31, link: "Popular", route: "/movies/popular" },
      { id: 32, link: "Top Rated", route: "/movies/top-rated" },
      { id: 33, link: "Upcoming", route: "/movies/upcoming" },
      { id: 34, link: "Now Playing", route: "/movies/now-playing" },
    ],
  },
  {
    id: 4,
    link: "Tv Shows",
    subnav: true,
    subnavLinks: [
      { id: 41, link: "Popular", route: "/tv-show/popular" },
      { id: 42, link: "Top Rated", route: "/tv-show/top-rated" },
      { id: 43, link: "On Tv", route: "/tv-show/on-tv" },
      { id: 44, link: "Airing Today", route: "/tv-show/airing-today" },
    ],
  },
];

const NavBar = () => (
  <nav className="nav-bar">
    <Nav items={navLinks} />
    <SearchBox />
  </nav>
);

export default NavBar;
