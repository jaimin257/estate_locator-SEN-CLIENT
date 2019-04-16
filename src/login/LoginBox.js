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
      email: "", 
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
  onEmailChange(param) {
    this.setState({ email: param.target.value });
    this.clearValidationErr("email");
    this.clearValidationErr("response");
  }
  onPasswordChange(param) {
    this.setState({ password: param.target.value });
    this.clearValidationErr("password");
    this.clearValidationErr("response");
  }
  onForgotEmailChange(param){
    this.setState({ forgotEmail: param.target.value });
    this.setState({ sentEmail: "" });
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  submitLogin(param) {
    if (this.state.email == "") {
      this.showValidationErr("email", "Email ID cannot be empty");
      return;
    }
    if(validator.validate(this.state.email) === false){
      this.showValidationErr("email", "Enter proper Email ID"); 
      return;
    }
    if (this.state.password == "") {
      this.showValidationErr("password", "password cannot be empty");
      return;
    }
    // console.log("login going"); 
    if(this.state.email !== "" && this.state.password !== ""){
      // jquery
      $.ajax({
        url: appurl + '/account/logIn',
        method: 'POST',
        data:{
          email: this.state.email,
          password: this.state.password
        },
        success: function(result){
          if(result.user.verified){
            // console.log("login success");
            cookie.save(result.cname1, result.cvalue1, {path:"/", expires:new Date(result.cookieexpire) });
            cookie.save('uid', result.user._id, {path:"/", expires:new Date(result.cookieexpire) });
            // console.log(result.user);
            if(result.user.addedExtraInfo)
              this.setState({ redirect: 1 });
            if(!result.user.addedExtraInfo)
              this.setState({ redirect: 2 });
          }
          else{
            this.showValidationErr("response", "User not verified");
            console.log("login failed");
          }
        }.bind(this),
        error: function(error) {
          this.showValidationErr("response", "Login Failed");
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
    console.log(this.state.err);
    $.ajax({
        url: appurl + '/account/forgetPassword',
        method: 'POST',
        data:{
          email: this.state.forgotEmail,
        },
        success: function(result){
          // console.log("seccess ma");
          this.setState({ sentEmail : "Reset Password Link Sent"}); 
        }.bind(this),
        error: function(error) {
          // console.log("error ma");
          this.setState({ sentEmail : "Something went wrong!"}); 
        }.bind(this)
      });
  }

  render() {
    const { redirect } = this.state;
    const { show } = this.state;
    let emailErr = null,
      passwordErr = null,
      responseErr = null;
    for (let err of this.state.errors) {
      if (err.elm == "email") {
        emailErr = err.msg;
      }
      if (err.elm == "password") {
        passwordErr = err.msg;
      }
      if (err.elm == "response") {
        responseErr = err.msg;
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
            <label htmlFor="email" class="login-label">Email</label>
            <input
              type="email"
              name="email"
              required
              className="login-input"
              placeholder="Enter Email"

              onChange={this.onEmailChange.bind(this)}
            />
            <small className="danger-error">
              {emailErr ? emailErr : ""}
            </small>
          </div>

          <div className="input-group">
            <label htmlFor="password" class="login-label">Password</label>
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

          <button
            type="button"
            className="login-btn"
            onClick={this.submitLogin.bind(this)}
          >
            Login
          </button>
        </div>

        <Button
          variant="primary"
          onClick={this.handleShow.bind(this)}
          className="page-link-cstm"
          >
          Forgot Password ?
        </Button>

        <small className="response-error">
          {responseErr ? responseErr : ""}
         </small>

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