import React, { Component } from "react";
import cookie from "react-cookies";
import "./home.css";
import "./img1.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import AutoComplete from "./Autocomplete.js";
import {
  Container,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import PropTypes from "prop-types";
import classNames from "classnames";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
const styles = theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing.unit * 2
  }
});

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);

    this.togglea = this.togglea.bind(this);
    this.selecta = this.selecta.bind(this);

    this.toggleb = this.toggleb.bind(this);
    this.selectb = this.selectb.bind(this);

    this.toggleBuy = this.toggleBuy.bind(this);
    this.toggleRent = this.toggleRent.bind(this);

    this.state = {
      isBuy: false,
      isRent: true,
      isLoggedIn: false,
      dropdownOpen: false,
      value: "Property Type",
      valuea: "Number of Rooms",
      dropdownBugget: false,
      dropdownProperty: false,
      valueb: "Budget",
      proptype: "",
      token: cookie.load("cookiesNamejwt"),
      showRoomButton: true
    };
    console.log(document.cookie);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  togglea() {
    this.setState({
      dropdownProperty: !this.state.dropdownProperty
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

  selecta(event) {
    this.setState({
      dropdownProperty: !this.state.dropdownProperty,
      valuea: event.target.innerText
    });
  }

  selectb(event) {
    this.setState({
      dropdownBugget: !this.state.dropdownBugget,
      valueb: event.target.innerText
    });
  }

  toggleBuy() {
    this.setState({
      isBuy: true
    });
  }

  toggleRent() {
    this.setState({
      isBuy: false
    });
  }
  onpropchange(proptype) {
    this.setState({
      proptype: proptype
    });
  }

  handleApartment = () => {
    this.setState({ showRoomButton: true });
  };

  handleLandShop = () => {
    this.setState({ showRoomButton: false });
  };

  render() {
    const roomButton = (
      <Dropdown class="drop1" style={{ marginRight: 20 }}>
        <ButtonDropdown
          isOpen={this.state.dropdownProperty}
          toggle={this.togglea}
        >
          <DropdownToggle>{this.state.valuea}</DropdownToggle>
          <DropdownMenu class="dropdown">
            <DropdownItem onClick={this.selecta}>1 BHK</DropdownItem>
            <DropdownItem onClick={this.selecta}>2 BHK</DropdownItem>
            <DropdownItem onClick={this.selecta}>3 BHK</DropdownItem>
            <DropdownItem onClick={this.selecta}>3 BHK +</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </Dropdown>
    );
    return (
      <div class="home">
        <h1 class="tag-line"> Find Home. Find Happiness </h1>
        <div class="search-container">
          <div class="search-selection">
            <div class="radio toggle">
              <div style={{ display: "flex", alignSelf: "center" }}>
                <ButtonGroup required="true">
                  <Button
                    style={{ marginLeft: 435 }}
                    onClick={
                      (this.state.isBuy == true,
                      this.state.isRent == false,
                      this.handle)
                    }
                  >
                    BUY
                  </Button>
                  <Button
                    style={{ marginRight: 20 }}
                    onClick={
                      (this.state.isBuy == false, this.state.isRent == true)
                    }
                  >
                    RENT
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div className="AutoComplete-wrapper">
            <AutoComplete />
            <button class="search">
              <img
                src={require("./search.png")}
                width="25px"
                height="20px;"
                class="search-icon"
                alt="mahin"
              />
              Search
            </button>
            <div style={{ display: "flex", alignSelf: "center" }}>
              <Dropdown class="drop1" style={{ marginRight: 20 }}>
                <ButtonDropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggle}
                >
                  <DropdownToggle>{this.state.value}</DropdownToggle>
                  <DropdownMenu class="dropdown">
                    <DropdownItem onClick={this.handleApartment}>
                      Appartment
                    </DropdownItem>
                    <DropdownItem onClick={this.handleLandShop}>
                      Shop
                    </DropdownItem>
                    <DropdownItem onClick={this.handleLandShop}>
                      Land
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </Dropdown>
              {this.state.showRoomButton ? roomButton : <React.Fragment />}
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
                      <DropdownItem onClick={this.selectb}>
                        1 crore
                      </DropdownItem>
                      <DropdownItem onClick={this.selectb}>1 BHK</DropdownItem>
                      <DropdownItem onClick={this.selectb}>2 BHK</DropdownItem>
                      <DropdownItem onClick={this.selectb}>3 BHK</DropdownItem>
                      <DropdownItem onClick={this.selectb}>3+ BHK</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </Dropdown>
              )}
            </div>

            {this.state.isLoggedIn === false ? (
              <div class="login-link">
                <a href="/login">Login in to track your journey</a>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    );
  }
}
