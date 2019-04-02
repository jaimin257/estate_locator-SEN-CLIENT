import React, { Component } from 'react';
import logo from './logo.svg';
import './login.css';
import $ from 'jquery';
import { LoginBox } from './LoginBox.js';
import { RegisterBox } from './RegisterBox.js';

export class LoginRegisterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoginOpen: this.props.match.path === "/signup" ? false : true,
      RegisterOpen: this.props.match.path === "/signup" ? true : false
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
    this.props.history.push('/login');
    console.log(this.props);
  }

  RegisterBox() {
    this.setState({ RegisterOpen: true, LoginOpen: false });
    this.props.history.push('/signup');
    console.log(this.props);
  }
}