import React, { Component } from "react";
import cookie from "react-cookies";
import logo from "./logo.svg";
import "./login.css";
import $ from "jquery";
import { Redirect } from "react-router";

let appurl = "http://localhost:1433";

export class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", errors: [], redirect: false };
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
    console.log("login going");
    if (this.state.username !== "" && this.state.password !== "") {
      // jquery
      $.ajax({
        url: appurl + "/account/logIn",
        method: "POST",
        data: {
          email: this.state.username,
          password: this.state.password
        },
        success: function(result) {
          if (result.login) {
            console.log("login success");
            cookie.save(result.cname1, result.cvalue1, {
              path: "/",
              expires: new Date(result.cookieexpire)
            });
            cookie.save("username", result.login.email, {
              path: "/",
              expires: new Date(result.cookieexpire)
            });
            this.setState({ redirect: true });
          } else {
            console.log("login failed");
          }
        }.bind(this)
      });
    }
  }

  render() {
    const { redirect } = this.state;
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
    if (redirect) {
      console.log("redirecting");
      return <Redirect to="/Home/" />;
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
              placeholder="Enter Username"
              onChange={this.onUsernameChange.bind(this)}
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
              placeholder="Enter Password"
              onChange={this.onPasswordChange.bind(this)}
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
