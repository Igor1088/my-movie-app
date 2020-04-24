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
import { FaUserCircle } from "react-icons/fa";

class User extends Component {
  componentDidMount() {
    if (localStorage.getItem("session_id") && !this.props.sessionID) {
      this.props.fetchLoggedUser();
      return;
    }
  }

  render() {
    const { error, loading, user, userAuthorized } = this.props;
    const gravatarHash = userAuthorized ? user.avatar.gravatar.hash : "HASH";
    const background = `https://secure.gravatar.com/avatar/${gravatarHash}`;

    if (error) {
      return <div>Error!</div>;
    }

    if (loading) {
      return <div>Loading User...</div>;
    }

    return (
      <Link
        to={{
          pathname: "/u/favorites/movies",
          state: { category: "favorite", media: "movies" },
        }}
        className="header__user-link"
      >
        <div className="header__user">
          <div className="header__user-img">
            <FaUserCircle />
          </div>
          <div className="header__user-details">
            <div className="header__user-name">{user.username}</div>
            <span>View Lists</span>
          </div>
        </div>
      </Link>
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
