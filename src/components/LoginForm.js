import React, { Component } from "react";
import { FaUser, FaLock } from "react-icons/fa";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      passwordHidden: true,
    };
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  };

  handlePasswordToggle = () => {
    this.setState({ passwordHidden: !this.state.passwordHidden });
  };

  handeSubmit = () => {
    const username = this.state.username;
    const password = this.state.password;

    this.props.handleLogin(username, password);
  };

  render() {
    return (
      <div className={`login-form ${this.props.login ? "open" : ""}`}>
        {/* <div className="login-form__heading">Login</div> */}
        <div className="login-form__row">
          <div className="login-form__input-icon">
            <FaUser />
          </div>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="login-form__row">
          <div className="login-form__input-icon">
            <FaLock />
          </div>
          <input
            name="password"
            type={this.state.passwordHidden ? "password" : "text"}
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="login__toggle-pass">
          <span onClick={this.handlePasswordToggle}>Show password</span>
        </div>
        {this.props.error ? (
          <div className="login-form__error">{this.props.error}</div>
        ) : null}
        <button className="login-form__submit" onClick={this.handeSubmit}>
          Sign in
        </button>
        <a
          href="https://www.themoviedb.org/account/reset-password"
          target="_blank"
          rel="noopener noreferrer"
          className="login__reset-link"
        >
          Forgot Password?
        </a>
        <hr />
        <span className="login__register">
          Don't have an account?&nbsp;
          <a
            href="https://www.themoviedb.org/account/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="login__register-link"
          >
            Sign up
          </a>
        </span>
      </div>
    );
  }
}

export default LoginForm;
