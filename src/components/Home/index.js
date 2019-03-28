import React from "react";
import { Link } from "react-router-dom";
import AutoComplete from "./Autocomplete";
import "./Homesstyle.scss";
import { Icon, Input, AutoComplete as Autolive } from "antd";

const Option = AutoComplete.Option;

function onSelect(value) {
  console.log("onSelect", value);
}

class Home extends React.Component {
  state = {
    dataSource: ["denis", "derek", "damien", "shadu", "shamiana"]
  };

  onSelect(value) {
    console.log("onSelect", value);
  }

  handleSearch = value => {
    this.setState({
      dataSource: !value ? [] : [value + value + value, value + value, value]
    });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <React.Fragment>
        <header>
          <div class="main">
            <div class="logo">
              <img src={require("./logo.png")} />
            </div>
            <ul>
              <li class="active">
                <a href="#">Home</a>
              </li>
              <li>
                <Link to="/auth">Login</Link>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>
        </header>
        <div className="AutoComplete-wrapper">
          <AutoComplete />
          <button type="button" className="Search">
            Search
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
