import React, { Component } from 'react';
import logo from './logo.svg';
import './login.css';
import $ from 'jquery';
var validator = require("email-validator");
let appurl = "http://localhost:1433"

export class RegisterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", password2: "", errors: [] };
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
  onEmailChange(param) {
    this.setState({ email: param.target.value });
    this.clearValidationErr("email");
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
    // console.log('get register request');
    if (this.state.email == "") {
      this.showValidationErr("email", "Email ID cannot be empty");
      this.clearValidationErr("password");
      this.clearValidationErr("password2");
      this.clearValidationErr("response");
      return;
    }
    if(validator.validate(this.state.email) === false){
      this.showValidationErr("email", "Enter proper Email ID"); 
      this.clearValidationErr("password");
      this.clearValidationErr("password2");
      this.clearValidationErr("response");
      return;
    }
    if (this.state.password == "") {
      this.showValidationErr("password", "password cannot be empty");
      this.clearValidationErr("password2");
      this.clearValidationErr("response");
      return;
    }
    if(this.state.password != this.state.password2){
      this.showValidationErr("password2", "password doesn't match"); 
      this.clearValidationErr("response");
      return;
    }
    // console.log("register request sent");
    $.ajax({
        url: appurl + '/account/register',
        method: 'POST',
        data:{
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2
        },
        success: function(result){
          this.showValidationErr("response", "Verification Link Sent"); 
          this.clearValidationErr("password");
          this.clearValidationErr("password2");
          this.clearValidationErr("email");
          // console.log(result);
        }.bind(this),
        error: function (result){
          this.showValidationErr("response", "SignUp Failed"); 
          this.clearValidationErr("password");
          this.clearValidationErr("password2");
          this.clearValidationErr("email");
        }.bind(this)
      })
  }

  render() {
    let emailErr = null,
        passwordErr = null,
        password2Err = null,
        responseErr = null;
    for (let err of this.state.errors) {
      if (err.elm == "email") {
        emailErr = err.msg;
      }
      if (err.elm == "password") {
        passwordErr = err.msg;
      }
      if (err.elm == "password2") {
        password2Err = err.msg;
      }
      if (err.elm == "response") {
        responseErr = err.msg;
      }
    }

    return (
      <div className="inner-container">
        <div className="header">Sign-up</div>
        <div className="box">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              required
              className="login-input"
              placeholder="Enter Email ID"
              onChange={this.onEmailChange.bind(this)}
            />
            <small className="danger-error">
              {emailErr ? emailErr : ""}
            </small>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              required
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

          { 
            responseErr === "Verification Link Sent" && responseErr !== "" ? (
              <small className="response-signup">
                Verification Link Sent
              </small>
            ) : ("")
          }

          {   
            responseErr === "SignUp Failed" && responseErr !== "" ? ( 
              <small className="response-error">
                SignUp Failed
              </small>
            ) : ("")
          }
        </div>
      </div>
    ); 
  }
}
