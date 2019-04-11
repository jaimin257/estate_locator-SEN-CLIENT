import React, { Component } from "react";
import cookie from "react-cookies";
import Dropdown from "react-bootstrap/Dropdown";
import {
  Container,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import $ from "jquery";
import "./navbar.css";
import "./bootstrap.css";
import "./index.png";

let appurl = "http://localhost:1433"

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: cookie.load("cookiesNamejwt"),
      firstname: "",
      isLoggedIn: cookie.load("cookiesNamejwt") ? true : false,
      isverified: false,
      hasextraInfo: false
    };
  }

  componentWillMount(){
        let userstatus = 0;
        $.ajax({
            url: appurl + '/account/getUser',
            method: 'POST',
            data:{
              userId: cookie.load("uid")
            },
            statusCode: {
              200: function(){
                console.log("user retrived success");
                userstatus = 200;
              }
            },
            success: function(result){
              this.setState({firstname: result.user.firstName});
              this.setState({isverified: result.user.verified});
              this.setState({hasextraInfo: result.user.addedextrainfo});
            }.bind(this),
            error: function (result){
              console.log("user retrived failed");
            }
          });
      }

  logout(params) {
    cookie.remove("cookiesNamejwt");
    cookie.remove("uid");
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
              <a href="#" class="nav-link">
                Contact Us
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
                  <li class="nav-item dropdown btn">
                    <Dropdown class="drop btn">
                      <Dropdown.Toggle id="dropdown-basic">
                        Hi, {this.state.firstname}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="/profile">
                          View Profile
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          My Advertisements
                        </Dropdown.Item>
                        <Dropdown.Item href="/home" onClick={this.logout.bind(this)}>
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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
