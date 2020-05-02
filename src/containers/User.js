import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import {
  getUserLoading,
  getUser,
  getUserError,
  getUserAuthorization,
} from "../reducers/user";
import { getSession } from "../reducers/auth";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logout from "../components/Logout";

class User extends Component {
  componentDidMount() {
    if (localStorage.getItem("session_id") && !this.props.sessionID) {
      this.props.fetchLoggedUser();
      return;
    }
  }

  render() {
    const { error, loading, user, userAuthorized, logout } = this.props;
    const gravatarHash = userAuthorized ? user.avatar.gravatar.hash : null;
    const background = `https://secure.gravatar.com/avatar/${gravatarHash}`;

    if (error) {
      return <div>Error!</div>;
    }

    if (loading) {
      return <div>Loading User...</div>;
    }

    return (
      <div className="header__user-holder">
        <div className="header__user">
          <div className="header__user-img">
            {gravatarHash ? (
              <img src={`${background}`} alt="" />
            ) : (
              <FaUserCircle />
            )}
          </div>
          <div className="header__user-name">{user.username}</div>
          <FaCaretDown />
        </div>
        <ul className="header__menu">
          <li className="header__menu-item">
            <Link
              to={{
                pathname: "/u/favorites/movies",
                state: { category: "favorite", media: "movies" },
              }}
            >
              Favorites
            </Link>
          </li>
          <li className="header__menu-item">
            <Link
              to={{
                pathname: "/u/watchlist/movies",
                state: { category: "watchlist", media: "movies" },
              }}
              className="header__user-link"
            >
              Watchlist
            </Link>
          </li>
          <li className="header__menu-item">
            <Link
              to={{
                pathname: "/u/rated/movies",
                state: { category: "rated", media: "movies" },
              }}
              className="header__user-link"
            >
              Ratings
            </Link>
          </li>
          <li className="header__menu-item">
            <Logout onLogout={logout} />
          </li>
        </ul>
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  error: getUserError(state),
  loading: getUserLoading(state),
  user: getUser(state),
  userAuthorized: getUserAuthorization(state),
  sessionID: getSession(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchLoggedUser: bindActionCreators(actions.fetchLoggedUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
