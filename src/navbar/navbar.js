import React, { Component } from "react";
import $ from "jquery";
import "./navbar.css";
import "./bootstrap.css";
import "./index.png";

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggeedIn: true
    };
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand" href="#">
            <img
              src={require("./index.png")}
              width="40"
              height="40"
              class="d-inline-block align-top"
              alt="mahin"
            />
            EstateLocator
          </a>

          <ul class="nav navbar-nav">
            <li class="btn">
              <a href="#" class="nav-link">
                About us
              </a>
            </li>
            <li class="btn">
              <a href="#" class="nav-link">
                Contact
              </a>
            </li>
            <small>
              {this.state.isLoggeedIn === false ? (
                <div>
                  <li class="btn">
                    <a href="#" class="nav-link">
                      Sign - Up
                    </a>
                  </li>
                  <li class="btn ">
                    <a href="#" class="nav-link">
                      Login
                    </a>
                  </li>
                </div>
              ) : (
                <div>
                  <li class="btn">
                    <a href="#" class="nav-link">
                      add Property
                    </a>
                  </li>
                  <li class="btn">
                    <a href="#" class="nav-link">
                      Hi, Username
                    </a>
                  </li>
                </div>
              )}
            </small>
          </ul>
        </nav>
      </div>
    );
  }
}
