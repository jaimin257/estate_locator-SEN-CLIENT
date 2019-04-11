import React, { Component } from "react";
import cookie from "react-cookies";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Forgotpassword.css";

export class Forgotpassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div class="forgotpassword">
        <h4>Enter New Password</h4>
        <Form>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required="true"
              value=""
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              required="true"
              value=""
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
