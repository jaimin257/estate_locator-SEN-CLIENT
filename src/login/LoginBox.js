import React, { Component } from 'react';
import cookie from "react-cookies";
import logo from './logo.svg';
import './login.css';
import $ from 'jquery';
import {BrowserRouter as Router, Redirect, Route, Link, Switch} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
var validator = require("email-validator");

let appurl = "http://localhost:1433"

export class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: "", 
      password: "",
      errors: [], 
      redirect: cookie.load('uid') ? 1 : 0,
      show: false,
      forgotEmail: "",
      sentEmail: "",
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
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
  onForgotEmailChange(param){
    this.setState({ forgotEmail: param.target.value });
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  submitLogin(param) {
    if (this.state.username == "") {
      this.showValidationErr("username", "username cannot be empty");
    }
    if(validator.validate(this.state.username) === false){
      this.showValidationErr("username", "Enter proper Email ID"); 
    }
    if (this.state.password == "") {
      this.showValidationErr("password", "password cannot be empty");
    }
    console.log("login going"); 
    if(this.state.username !== "" && this.state.password !== ""){
      // jquery
      $.ajax({
        url: appurl + '/account/logIn',
        method: 'POST',
        data:{
          email: this.state.username,
          password: this.state.password
        },
        success: function(result){
          if(result.user.verified){
            console.log("login success");
            cookie.save(result.cname1, result.cvalue1, {path:"/", expires:new Date(result.cookieexpire) });
            cookie.save('uid', result.user._id, {path:"/", expires:new Date(result.cookieexpire) });
            console.log(result.user);
            if(result.user.addedExtraInfo)
              this.setState({ redirect: 1 });
            if(!result.user.addedExtraInfo)
              this.setState({ redirect: 2 });
          }
          else{
            this.showValidationErr("password", "User not verified");
            console.log("login failed");
          }
        }.bind(this),
        error: function(error) {
          this.showValidationErr("password", "Login Failed");
        }.bind(this)
      });
    }
  }

  onForgotPassword(param){
    console.log("forgot");
    if(validator.validate(this.state.forgotEmail) === false){
      this.setState({ sentEmail : "Enter Proper Email ID"});
      return;
    }
    else{
      this.setState({ sentEmail : "Verification Link Sent"}); 
    }
    $.ajax({
        url: appurl + '/account/sendForgetPasswordMail',
        method: 'POST',
        data:{
          email: this.state.forgotEmail,
        },
        success: function(result){

        }.bind(this),
        error: function(error) {
          
        }.bind(this)
      });
  }

  render() {
    const { redirect } = this.state;
    const { show } = this.state;
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
  
    if(redirect==1){
      return <Redirect to='/home'/>
    }
    if(redirect==2){
      return <Redirect to='/profile'/>
    }

    

    return (

      <div className="inner-container">
        <div className="header">Login</div>
        <div className="box">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              name="email"
              required
              className="login-input"
              placeholder="Enter Email"

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

        <Button variant="primary" onClick={this.handleShow.bind(this)}>
          Forgot Password ?
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Forgot Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <input
                type="email"
                required
                placeholder="Enter you registered email"
                class="forgot"
                onChange={this.onForgotEmailChange.bind(this)}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <p class="sentemail"> { this.state.sentEmail } </p>
            <Button variant="secondary" onClick={this.handleClose.bind(this)}>
              Close
            </Button>
            <Button variant="primary" onClick={this.onForgotPassword.bind(this)}>
              Send
            </Button>
          </Modal.Footer>
        </Modal>


      </div>
    );
  }
}