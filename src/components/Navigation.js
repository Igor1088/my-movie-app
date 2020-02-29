import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import Autosuggest from "react-autosuggest";

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    name: "C",
    year: 1972
  },
  {
    name: "Elm",
    year: 2012
  }
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : languages.filter(
        lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

function Navigation() {
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

  return (
    <nav className="nav-bar">
      <div className="nav-search"></div>
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

export default Navigation;
