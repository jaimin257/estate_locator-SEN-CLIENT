import React, { Component } from "react";
import cookie from "react-cookies";
import "./home.css";
import "./img1.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import {
  Container,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import $ from "jquery";

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);

    this.toggleb = this.toggleb.bind(this);
    this.selectb = this.selectb.bind(this);

    this.state = {
      isBuy: false,
      isRent: true,
      isLoggedIn: false,
      dropdownOpen: false,
      value: "Number of Rooms",
      dropdownBugget: false,
      valueb: "Budget",
      token: cookie.load('cookiesNamejwt')
    };
    console.log(document.cookie);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      value: event.target.innerText
    });
  }

  toggleb() {
    this.setState({
      dropdownBugget: !this.state.dropdownBugget
    });
  }

  selectb(event) {
    this.setState({
      dropdownBugget: !this.state.dropdownBugget,
      valueb: event.target.innerText
    });
  }

  render() {
    return (
      <div class="home">
        <h1 class="tag-line"> Find Home. Find Happiness </h1>
        <div class="search-container">
          <div class="search-selection">
            <button
              class=" button buy"
              onClick={
                (this.state.isBuy == true,
                this.state.isRent == false,
                this.handle)
              }
            >
              BUY
            </button>
            <button
              class=" button rent"
              onClick={(this.state.isBuy == false, this.state.isRent == true)}
            >
              RENT
            </button>
          </div>
          <form class="search-bar">
            <input
              type="text"
              placeholder="Enter a location or project"
              class="search-box-input"
            />
            <button class="test">
              <img
                src={require("./search.png")}
                width="25px"
                height="15px;"
                class="search-icon"
                alt="mahin"
              />
              Search
            </button>
          </form>
        </div>

        <Dropdown class="drop1">
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle>{this.state.value}</DropdownToggle>
            <DropdownMenu class="dropdown">
              <DropdownItem onClick={this.select}>1 HK</DropdownItem>
              <DropdownItem onClick={this.select}>1 BHK</DropdownItem>
              <DropdownItem onClick={this.select}>2 BHK</DropdownItem>
              <DropdownItem onClick={this.select}>3 BHK</DropdownItem>
              <DropdownItem onClick={this.select}>3+ BHK</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </Dropdown>

        <small>
          {this.isBuy === true ? (
            <Dropdown class="drop1">
              <ButtonDropdown
                isOpen={this.state.dropdownBugget}
                toggle={this.toggleb}
              >
                <DropdownToggle>{this.state.valueb}</DropdownToggle>
                <DropdownMenu class="dropdown">
                  <DropdownItem onClick={this.selectb}>1 HK</DropdownItem>
                  <DropdownItem onClick={this.selectb}>1 BHK</DropdownItem>
                  <DropdownItem onClick={this.selectb}>2 BHK</DropdownItem>
                  <DropdownItem onClick={this.selectb}>3 BHK</DropdownItem>
                  <DropdownItem onClick={this.selectb}>3+ BHK</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </Dropdown>
          ) : (
            <Dropdown class="drop1">
              <ButtonDropdown
                isOpen={this.state.dropdownBugget}
                toggle={this.toggleb}
              >
                <DropdownToggle>{this.state.valueb}</DropdownToggle>
                <DropdownMenu class="dropdown">
                  <DropdownItem onClick={this.selectb}>1 crore</DropdownItem>
                  <DropdownItem onClick={this.selectb}>1 BHK</DropdownItem>
                  <DropdownItem onClick={this.selectb}>2 BHK</DropdownItem>
                  <DropdownItem onClick={this.selectb}>3 BHK</DropdownItem>
                  <DropdownItem onClick={this.selectb}>3+ BHK</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </Dropdown>
          )}
        </small>
        <small>
          {this.state.isLoggedIn === false ? (
            <div class="login-link">
              <a href="/login">Login in to track your journey</a>
            </div>
          ) : (
            <div />
          )}
        </small>
      </div>
    );
  }
}
