import React, { Component } from "react";
import cookie from "react-cookies";
import $ from "jquery";
import "./navbar.css";
import "./bootstrap.css";
import "./index.png";

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: cookie.load('cookiesNamejwt'),
      username: cookie.load('username'),
      isLoggedIn: cookie.load('username') ? true : false
    };
  }

  logout(params){
    cookie.remove('cookiesNamejwt');
    cookie.remove('username');
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand " href="/Home">
            <img
              src={require("./logo.png")}
              width="40"
              height="40"
              class="d-inline-block align-top logo"
              alt="mahin"
            />
            Estate Locator
          </a>

          <ul class="nav navbar-nav">
            <li class="btn">
              <a href="#" class="nav-link">
                About us
              </a>
            </li>
            <li class="btn">
              <a href="#" class="nav-link" >
                Contact
              </a>
            </li>
            <small>
              {this.state.isLoggedIn === false ? (
                <div>
                  <li class="btn custom">
                    <a href="/login" class="nav-link">
                      Login
                    </a>
                  </li>
                  <li class="btn">
                    <a href="/signup" class="nav-link">
                      SignUp
                    </a>
                  </li>
                </div>
              ) : (
                <div>
                  <li class="btn">
                    <a href="/AddProp" class="nav-link">
                      Add Property
                    </a>
                  </li>
                  <li class="btn">
                    <a href="#" class="nav-link">
                      Hi, {this.state.username}
                    </a>
                  </li>
                  <li class="btn">
                    <a href="" class="nav-link" onClick={this.logout.bind(this)}>
                      LogOut
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
