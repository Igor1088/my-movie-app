import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import { getUser, getUserAuthorization } from "../reducers/user";
import User from "./User";

const Login = ({ onLogin }) => {
  return <Link onClick={onLogin}>Login</Link>;
};

const Logout = ({ onLogout }) => {
  return (
    <Link to="/" onClick={onLogout}>
      Logout
    </Link>
  );
};

const Auth = ({ user, login, logout }) => {
  return (
    <div className="header__top">
      {localStorage.getItem("session_id") ? (
        <div className="header__top-info">
          <User />
          <Logout onLogout={logout} />
        </div>
      ) : (
        <div>
          <div className="header__top-info">
            <Login onLogin={login} />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  user: getUser(state)
});

const mapDispatchToProps = dispatch => ({
  login: bindActionCreators(actions.requestLogin, dispatch),
  logout: bindActionCreators(actions.logout, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
