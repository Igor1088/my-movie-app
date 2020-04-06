import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { getUser } from "../reducers/user";
import User from "./User";
import Login from "../components/Login";
import Logout from "../components/Logout";

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

const mapStateToProps = (state) => ({
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  login: bindActionCreators(actions.requestLogin, dispatch),
  logout: bindActionCreators(actions.logout, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
