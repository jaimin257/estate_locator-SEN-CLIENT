import React, { Component } from "react";
import $ from "jquery";
import { Redirect } from "react-router";

let appurl = "http://localhost:1433";

export class Buy extends React.Component {
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
        <h1>Buy from vadodara</h1>
      </div>
    );
  }
}
