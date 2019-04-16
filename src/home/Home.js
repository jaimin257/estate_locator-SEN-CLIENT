import React, { Component } from "react";
import cookie from "react-cookies";
import $ from "jquery";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import "./img1.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import AutoComplete from "./Autocomplete.js";
import "./Autocomplete.css";
import "./home.css";
import "./bootstrap.css";
import {
  Container,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardHeader,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import Table from "react-bootstrap/Table";
import Avatar from "react-avatar";
import RenderToLayer from "material-ui/internal/RenderToLayer";
import "./search.css";

let appurl = "http://localhost:1433";

const color = ["red", "green", "purple", "cyan", "teal", "blue"];
const getcolor = () => {
  return color[Math.floor(Math.random() * 8)];
};

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);

    this.togglea = this.togglea.bind(this);
    this.selecta = this.selecta.bind(this);

    this.toggleb = this.toggleb.bind(this);
    this.selectb = this.selectb.bind(this);
    this.items = []; //["Damien", "fire", "f1", "f2", "f3", "f4", "f5", "f6"];
    this.state = {
      isBuy: false,
      isRent: true,
      isLoggedIn: cookie.load("cookiesNamejwt") ? true : false,
      dropdownOpen: false,
      value: "Property Type",
      valuea: "Number of Rooms",
      dropdownBugget: false,
      dropdownProperty: false,
      valueb: "Budget",
      token: cookie.load("cookiesNamejwt"),
      suggestions: [],
      text: "",
      buyorrent: "buy",
      searchresults: [],
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
    if(this.state.value === 'Appartment'){
      this.setState({ showRoomButton: true });
    }
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
  onpropchange(proptype) {
    this.setState({
      proptype: proptype
    });
  }

  onTextChanged = e => {
    const value = e.target.value;
    // console.log("dasd " + value);
    this.setState({ text: e.target.value });
    let suggestions = [];
    $.ajax({
      url: appurl + "/property/searchSuggestion",
      method: "POST",
      data: {
        search: value,
      },
      success: function(result) {
        console.log(result.searchResult);
        this.items = result.result;
        if (value.length > 0) {
          const regEx = new RegExp(`^${value}`, "i");
          suggestions = this.items.sort().filter(v => regEx.test(v));
        }
        this.setState(() => ({ suggestions }));
      }.bind(this)
    });

    
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

  _onBuyOrRentrChange(buyorrent) {
    this.setState({
      buyorrent: buyorrent,
      valueb: "Budget"
    });
    console.log("br " + this.state.buyorrent);
  }

  onSearch(param) {
    if (this.state.text == "") {
      return;
    }
    let tempb = this.state.valueb;
    tempb = tempb.replace('k', '000');
    tempb = tempb.replace(' crore', '0000000');
    tempb = tempb.replace('+', '');
    tempb = tempb.replace('<', '');

    let tempa = this.state.valuea;
    tempa = tempa.replace(' BHK', '');
    tempa = tempa.replace('+', '');
    
    $.ajax({
      url: appurl + "/property/searchProp",
      method: "POST",
      data: {
        uid: cookie.load("uid"),
        searchStr: this.state.text,
        noOfRooms: tempa,
        property_amount: tempb,
        property_type: this.state.value,
        contract_type: this.state.buyorrent,
      },
      success: function(result) {
        console.log(result.searchResult);
        this.setState({ searchresults: result.searchResult });
        console.log("searched properties " + this.state.searchresults);
      }.bind(this)
    });
  }

  render() {
    const roomButton = (
      <Dropdown class="drop1" style={{ width: 170}}>
        <ButtonDropdown
          isOpen={this.state.dropdownProperty}
          toggle={this.togglea}
        >
          <DropdownToggle>{this.state.valuea}</DropdownToggle>
          <DropdownMenu class="dropdown">
            <DropdownItem onClick={this.selecta}>1 BHK</DropdownItem>
            <DropdownItem onClick={this.selecta}>2 BHK</DropdownItem>
            <DropdownItem onClick={this.selecta}>3 BHK</DropdownItem>
            <DropdownItem onClick={this.selecta}>3+ BHK </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </Dropdown>
    );
    const { text } = this.state;
    var center = {
      textAlign: "center"
    };
    const { searchresults } = this.state;
    const data = [{ name: "test1" }, { name: "test2" }];

    return (
      <div class="home">
        <h1 class="tag-line"> Find Home. Find Happiness </h1>
        <div class="search-container">
          
          <div className="AutoComplete-wrapper">

            <div class="search-selection">
              <div class="radio toggle">
                <div style={{ display: "flex", alignSelf: "center" }}>
                  <ButtonGroup required="true">
                    <Button
                      style={{ marginLeft: 0 }}
                      onClick={this._onBuyOrRentrChange.bind(this, "buy")}
                      active={this.state.buyorrent === "buy"}
                      className="buybtn"
                    >
                      BUY
                    </Button>
                    <Button
                      style={{ marginRight: 10 }}
                      onClick={this._onBuyOrRentrChange.bind(this, "rent")}
                      active={this.state.buyorrent === "rent"}
                      className="rentbtn"
                    >
                      RENT
                    </Button>
                  </ButtonGroup>

                  <div style={{ display: "flex", alignSelf: "center" }}>
                    <Dropdown class="drop1" style={{ width: 140 }}>
                      <ButtonDropdown
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggle}
                      >
                        <DropdownToggle>{this.state.value}</DropdownToggle>
                        <DropdownMenu class="dropdown mydrop">
                          <DropdownItem onClick={this.select}>
                            Appartment
                          </DropdownItem>
                          <DropdownItem onClick={this.select}>
                            Shop
                          </DropdownItem>
                          <DropdownItem onClick={this.select}>
                            Land
                          </DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </Dropdown>

                    {this.state.value === 'Appartment' ? roomButton : <React.Fragment />}

                    {this.state.buyorrent === 'rent' ? (
                      <Dropdown class="drop1" style={{width: 100 }}>
                        <ButtonDropdown
                          isOpen={this.state.dropdownBugget}
                          toggle={this.toggleb}
                        >
                          <DropdownToggle>{this.state.valueb}</DropdownToggle>
                          <DropdownMenu class="dropdown">
                            <DropdownItem onClick={this.selectb}>10k</DropdownItem>
                            <DropdownItem onClick={this.selectb}>20k</DropdownItem>
                            <DropdownItem onClick={this.selectb}>30k</DropdownItem>
                            <DropdownItem onClick={this.selectb}>50k</DropdownItem>
                            <DropdownItem onClick={this.selectb}>50k+</DropdownItem>
                          </DropdownMenu>
                        </ButtonDropdown>
                      </Dropdown>
                    ) : (
                      <Dropdown class="drop1" style={{width: 100 }}>
                        <ButtonDropdown
                          isOpen={this.state.dropdownBugget}
                          toggle={this.toggleb}
                        >
                          <DropdownToggle>{this.state.valueb}</DropdownToggle>
                          <DropdownMenu class="dropdown">
                            <DropdownItem onClick={this.selectb}>{'<'}1 crore</DropdownItem>
                            <DropdownItem onClick={this.selectb}>1 crore</DropdownItem>
                            <DropdownItem onClick={this.selectb}>2 crore</DropdownItem>
                            <DropdownItem onClick={this.selectb}>3 crore</DropdownItem>
                            <DropdownItem onClick={this.selectb}>3 crore+</DropdownItem>
                          </DropdownMenu>
                        </ButtonDropdown>
                      </Dropdown>
                    )}
                  </div>


                </div>
              </div>
            </div>


            <div className="AutoCompleteText">

              <input placeholder="Enter Any Property Detail" value={text} onChange={this.onTextChanged} type="text" />
              <button class="search" onClick={this.onSearch.bind(this)}>
                <i class="fa fa-search"> Search</i>
              </button>
              {this.renderSuggestions()}
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

        <div className="animated fadeIn">
          <div>
            <div className="allsearching">
              {searchresults.map(d => (
                <Card
                  style={{
                    border: "none",
                    background: "rgba(255,255,255,0.15)"
                  }}
                >
                  <div className="fif">
                    <div id="avatar_position" className="image">
                      <Avatar
                        color={getcolor()}
                        round={false}
                        size={80}
                        name={d.propertyName}
                      />
                      <div className="name-style">
                        {/*userInfo.user_first_name*/}{" "}
                        {/*userInfo.user_last_name*/}
                      </div>
                    </div>
                    <br />
                    <div className="properties">
                      <div>
                        <strong> Property Name : </strong>
                        {d.propertyName}
                      </div>
                      <div>
                        <strong>Price :</strong> ₹{" "}
                        <span className="price">{d.property_amount}</span>{" "}
                      </div>
                      <div>
                        <td>
                          {" "}
                          <strong>Address : </strong>
                          {d.propertyLocation}
                          {"  "}
                        </td>
                      </div>
                      <div className="buttons" width="200px">
                        <div>
                          <button type="button" class="btn btn-primary">
                            <a href={"/Property/" + d._id} target="_blank" className="link">
                              View More Details!!
                            </a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}