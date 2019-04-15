import React, { Component } from "react";
import cookie from "react-cookies";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {BrowserRouter as Router, Redirect, Route, Link, Switch} from "react-router-dom";
import "./Forgotpassword.css";
import $ from 'jquery';

let appurl = "http://localhost:1433"

export class Forgotpassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false,
      err: "",
    };
  }

  onEmailChange(param) {
    this.setState({ email: param.target.value });
    // console.log("password " + this.state.password);
  }
  onPasswordChange(param) {
    this.setState({ password: param.target.value });
    // console.log("email " + this.state.email);
  }
  

  onForgot(e){
    e.preventDefault();
    console.log(this.props);
    $.ajax({
        url: appurl + '/account/resetPassword',
        method: 'POST',
        data:{
          email: this.state.email,
          password: this.state.password,
          uid: this.props.match.params.uid
        },
        success: function(result){
          console.log("succes " + result);
          this.setState({ redirect : true})
        }.bind(this),
        error: function(error) {
          console.log("err " + error);
          this.setState({ err: "Error changing Password, Try Again"});
        }.bind(this)
      });

  }

  render() {
    const { redirect, err } = this.state;

    if(redirect){
      return <Redirect to='/login'/>
    }

    return (
      <div class="forgotpassword">
        <h4>Enter Email</h4>
        <Form>
          <Form.Group controlId="formBasicText">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              required
              onChange={this.onEmailChange.bind(this)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={this.onPasswordChange.bind(this)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={this.onForgot.bind(this)} >
            Submit
          </Button>

          <div>
            {err}
          </div>

        </Form>
      </div>
    );
  }
}
