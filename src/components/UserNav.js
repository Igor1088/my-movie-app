import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
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
                <Link to="/u/favorites">Movies</Link>
              </li>
              <li>
                <Link to="/u/favorites/tv">TV Shows</Link>
              </li>
            </ul>
          </li>
          <li className="acc-nav__item">
            <span>Watchlist</span>
            <ul className="sub-nav">
              <li>
                <Link to="/u/watchlist">Movies</Link>
              </li>
              <li>
                <Link to="/u/watchlist/tv">TV Shows</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
