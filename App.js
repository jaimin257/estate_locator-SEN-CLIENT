import React from "react";
import reactDOM from "react-dom";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoginOpen: true,
      RegisterOpen: false
    };
  }

  render() {
    return (
      <div className="root-container">
        <div className="box-container">
          {this.state.LoginOpen && <LoginBox />}
          {this.state.RegisterOpen && <RegisterBox />}
        </div>
        <div className="box-controller">
          <div
            className={
              "controller " +
              (this.state.LoginOpen ? "selected-controller" : "")
            }
            onClick={this.LoginBox.bind(this)}
          >
            Login
          </div>
          <div
            className={
              "controller " +
              (this.state.RegisterOpen ? "selected-controller" : "")
            }
            onClick={this.RegisterBox.bind(this)}
          >
            Sign-up
          </div>
        </div>
      </div>
    );
  }
  LoginBox() {
    this.setState({ LoginOpen: true, RegisterOpen: false });
  }

  RegisterBox() {
    this.setState({ RegisterOpen: true, LoginOpen: false });
  }
}
class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", errors: [] };
  }
  showValidationErr(elm, msg) {
    this.setState(prevState => ({
      errors: [...prevState.errors, { elm, msg }]
    }));
  }
  clearValidationErr(elm) {
    this.setState(prevState => {
      let newArr = [];
      for (let err of prevState.errors) {
        if (elm != err.elm) {
          newArr.push(err);
        }
      }
      return { errors: newArr };
    });
  }
  onUsernameChange(param) {
    this.setState({ username: param.target.value });
    this.clearValidationErr("username");
  }
  onPasswordChange(param) {
    this.setState({ password: param.target.value });
    this.clearValidationErr("password");
  }
  submitLogin(param) {
    if (this.state.username == "") {
      this.showValidationErr("username", "username cannot be empty");
    }
    if (this.state.password == "") {
      this.showValidationErr("password", "password cannot be empty");
    }
  }

  render() {
    let usernameErr = null,
      passwordErr = null;
    for (let err of this.state.errors) {
      if (err.elm == "username") {
        usernameErr = err.msg;
      }
      if (err.elm == "password") {
        passwordErr = err.msg;
      }
    }
    return (
      <div className="inner-container">
        <div className="header">Login</div>
        <div className="box">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
            />
            <small className="danger-error">
              {usernameErr ? usernameErr : ""}
            </small>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
            />
            <small className="danger-error">
              {passwordErr ? passwordErr : ""}
            </small>
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={this.submitLogin.bind(this)}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}
class RegisterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", email: "", password: "", errors: [] };
  }

  showValidationErr(elm, msg) {
    this.setState(prevState => ({
      errors: [...prevState.errors, { elm, msg }]
    }));
  }
  clearValidationErr(elm) {
    this.setState(prevState => {
      let newArr = [];
      for (let err of prevState.errors) {
        if (elm != err.elm) {
          newArr.push(err);
        }
      }
      return { errors: newArr };
    });
  }
  onUsernameChange(param) {
    this.setState({ username: param.target.value });
    this.clearValidationErr("username");
  }
  onPasswordChange(param) {
    this.setState({ password: param.target.value });
    this.clearValidationErr("password");
  }
  onEmailChange(param) {
    this.setState({ email: param.target.value });
    this.clearValidationErr("email");
  }
  submitRegister(param) {
    if (this.state.username == "") {
      this.showValidationErr("username", "username cannot be empty");
    }
    if (this.state.password == "") {
      this.showValidationErr("password", "password cannot be empty");
    }
    if (this.state.email == "") {
      this.showValidationErr("email", "email cannot be empty");
    }
  }

  render() {
    let usernameErr = null,
      passwordErr = null,
      emailErr = null;
    for (let err of this.state.errors) {
      if (err.elm == "username") {
        usernameErr = err.msg;
      }
      if (err.elm == "password") {
        passwordErr = err.msg;
      }
      if (err.elm == "email") {
        emailErr = err.msg;
      }
    }
    return (
      <div className="inner-container">
        <div className="header">Sign-up</div>
        <div className="box">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
              onChange={this.onUsernameChange.bind(this)}
            />
            <small className="danger-error">
              {usernameErr ? usernameErr : ""}
            </small>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="login-input"
              placeholder="Email"
              onChange={this.onEmailChange.bind(this)}
            />
            <small className="danger-error">{emailErr ? emailErr : ""}</small>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={this.onPasswordChange.bind(this)}
            />
            <small className="danger-error">
              {passwordErr ? passwordErr : ""}
            </small>
          </div>
          <button
            type="button"
            className="login-btn"
            onClick={this.submitRegister.bind(this)}
          >
            Sign-up
          </button>
        </div>
      </div>
    );
  }
}
reactDOM.render(<App />, document.getElementById("root"));
export default App;
