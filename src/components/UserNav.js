import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <nav>
        <ul className="acc-nav">
          <li className="acc-nav__item">
            <span>Favorites</span>
            <ul className="sub-nav">
              <li>
                <Link
                  to={{
                    pathname: "/u/favorites/movies",
                    state: { category: "favorite", media: "movies" },
                  }}
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: "/u/favorites/tv",
                    state: { category: "favorite", media: "tv" },
                  }}
                >
                  TV Shows
                </Link>
              </li>
            </ul>
          </li>
          <li className="acc-nav__item">
            <span>Watchlist</span>
            <ul className="sub-nav">
              <li>
                <Link
                  to={{
                    pathname: "/u/watchlist/movies",
                    state: { category: "watchlist", media: "movies" },
                  }}
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: "/u/watchlist/tv",
                    state: { category: "watchlist", media: "tv" },
                  }}
                >
                  TV Shows
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
