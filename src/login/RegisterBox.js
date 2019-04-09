import React, { Component } from 'react';
import logo from './logo.svg';
import './login.css';
import $ from 'jquery';

let appurl = "http://localhost:1433"

export class RegisterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", password2: "", errors: [] };
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
  onPassword2Change(param) {
    this.setState({ password2: param.target.value });
    this.clearValidationErr("password2");
  }
  submitRegister(param) {
    console.log('get register request');
    if (this.state.username == "") {
      this.showValidationErr("username", "username cannot be empty");
    }
    if (this.state.password == "" || this.state.password2 == "") {
      this.showValidationErr("password", "password cannot be empty");
    }
    if(this.state.password != this.state.password2){
      this.showValidationErr("password2", "password doesn't match"); 
    }
    console.log("register request sent");
    $.ajax({
        url: appurl + '/account/register',
        method: 'POST',
        data:{
          email: this.state.username,
          password: this.state.password,
          password2: this.state.password2
        },
        success: function(result){
          console.log(result);
        }
      })
  }

  render() {
    let usernameErr = null,
        passwordErr = null,
        password2Err = null;
    for (let err of this.state.errors) {
      if (err.elm == "username") {
        usernameErr = err.msg;
      }
      if (err.elm == "password") {
        passwordErr = err.msg;
      }
      if (err.elm == "password2") {
        password2Err = err.msg;
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

          <div className="input-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Enter Password Again"
              onChange={this.onPassword2Change.bind(this)}
            />
            <small className="danger-error">
              {password2Err ? password2Err : ""}
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
