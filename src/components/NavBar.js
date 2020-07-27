import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserAuthorization } from "../reducers/user";

const navLinks = [
  { id: 1, link: "Home", route: "/", exact: true },
  {
    id: 2,
    link: "People",
    route: "/people/popular",
    subnav: true,
    subnavLinks: [
      { id: 21, link: "Popular", route: "/people/popular" },
      { id: 22, link: "Trending", route: "/people/trending" },
    ],
  },
  {
    id: 3,
    link: "Movies",
    subnav: true,
    route: "/movies/popular",
    subnavLinks: [
      { id: 31, link: "Popular", route: "/movies/popular" },
      { id: 32, link: "Top Rated", route: "/movies/top-rated" },
      { id: 33, link: "Upcoming", route: "/movies/upcoming" },
      { id: 34, link: "Now Playing", route: "/movies/now-playing" },
      { id: 35, link: "Trending", route: "/movies/trending" },
    ],
  },
  {
    id: 4,
    link: "Tv Shows",
    subnav: true,
    route: "/tv-show/popular",
    subnavLinks: [
      { id: 41, link: "Popular", route: "/tv-show/popular" },
      { id: 42, link: "Top Rated", route: "/tv-show/top-rated" },
      { id: 43, link: "On Tv", route: "/tv-show/on-tv" },
      { id: 44, link: "Airing Today", route: "/tv-show/airing-today" },
      { id: 45, link: "Trending", route: "/tv-show/trending" },
    ],
  },
  {
    id: 5,
    link: "Discover",
    subnav: true,
    route: "/discover/movie",
    subnavLinks: [
      { id: 51, link: "Movie", route: "/discover/movie" },
      { id: 52, link: "Tv Show", route: "/discover/tv" },
    ],
  },
];

const NavBar = () => {
  const userAuthorized = useSelector(getUserAuthorization);
  return (
    <nav className="nav-bar">
      <Nav items={navLinks} />
      {userAuthorized && (
        <Link
          to={{
            pathname: "/u/favorites/movies",
            state: { category: "favorite", media: "movies" },
          }}
        >
          My Lists
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
