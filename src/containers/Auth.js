import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { getUser } from "../reducers/user";
import { getSessionError } from "../reducers/auth";
import User from "./User";
import Login from "../components/Login";
import Logout from "../components/Logout";

const Auth = ({ user, login, logout, errorLogin }) => {
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
            <Login handleLogin={login} error={errorLogin} />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: getUser(state),
  errorLogin: getSessionError(state),
});

const mapDispatchToProps = (dispatch) => ({
  login: bindActionCreators(actions.requestLogin, dispatch),
  logout: bindActionCreators(actions.logout, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
