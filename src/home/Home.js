import React, { Component } from "react";
import cookie from "react-cookies";
import $ from 'jquery';
import "./home.css";
import "./img1.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import AutoComplete from "./Autocomplete.js";
import "./Autocomplete.css";
import {
  Container,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";

let appurl = "http://localhost:1433"

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);

    this.togglea = this.togglea.bind(this);
    this.selecta = this.selecta.bind(this);

    this.toggleb = this.toggleb.bind(this);
    this.selectb = this.selectb.bind(this);
    this.items = ["Damien", "fire", "f1", "f2", "f3", "f4", "f5", "f6"];
    this.state = {
      isBuy: false,
      isRent: true,
      isLoggedIn: cookie.load("cookiesNamejwt") ? true : false,
      dropdownOpen: false,
      value: "Number of Rooms",
      valuea: "Property Type",
      dropdownBugget: false,
      dropdownProperty: false,
      valueb: "Budget",
      token: cookie.load("cookiesNamejwt"),
      suggestions: [],
      text: ""
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

  onTextChanged = e => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regEx = new RegExp(`^${value}`, "i");
      suggestions = this.items.sort().filter(v => regEx.test(v));
    }
    this.setState(() => ({ suggestions, text: value }));
  };

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    } else {
      return (
        <ul>
          {suggestions.map(item => (
            <li onClick={() => this.suggestionselected(item)}>{item}</li>
          ))}
        </ul>
      );
    }
  }

  suggestionselected(value) {
    this.setState(() => ({
      text: value,
      suggestions: []
    }));
  }

  onSearch(param){
    if(this.state.text == ""){
      return;
    }
    $.ajax({
        url: appurl + '/property/searchProp',
        method: 'POST',
        data:{
          uid: cookie.load('uid'),
          searchStr: this.state.text
        },
        success: function(result){
          console.log(result.searchResult);
        }.bind(this)
      });
  }

  render() {
    const { text } = this.state;
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
          <div className="AutoComplete-wrapper">
            <div className="AutoCompleteText">
              <input value={text} onChange={this.onTextChanged} type="text" />
              {this.renderSuggestions()}
            </div>
            <button class="search" onClick={this.onSearch.bind(this)}>
              <img
                src={require("./search.png")}
                width="25px"
                height="20px;"
                required
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
                    <DropdownItem onClick={this.select}>1 HK</DropdownItem>
                    <DropdownItem onClick={this.select}>1 BHK</DropdownItem>
                    <DropdownItem onClick={this.select}>2 BHK</DropdownItem>
                    <DropdownItem onClick={this.select}>3 BHK</DropdownItem>
                    <DropdownItem onClick={this.select}>3+ BHK</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </Dropdown>
              <Dropdown class="drop1" style={{ marginRight: 20 }}>
                <ButtonDropdown
                  isOpen={this.state.dropdownProperty}
                  toggle={this.togglea}
                >
                  <DropdownToggle>{this.state.valuea}</DropdownToggle>
                  <DropdownMenu class="dropdown">
                    <DropdownItem onClick={this.selecta}>
                      Appartment
                    </DropdownItem>
                    <DropdownItem onClick={this.selecta}>Shop</DropdownItem>
                    <DropdownItem onClick={this.selecta}>Land</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </Dropdown>
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
