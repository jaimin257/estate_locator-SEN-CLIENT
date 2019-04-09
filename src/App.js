import React, { Component } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LoginRegisterBox } from "./login/LoginRegisterBox.js";
import { Home } from "./home/Home.js";
import { NavBar } from "./navbar/navbar.js";

let appurl = "http://localhost:1433";
export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={LoginRegisterBox} exact />
            <Route path="/login" component={LoginRegisterBox} exact />
            <Route path="/signup" component={LoginRegisterBox} exact />
            <div>
              <NavBar />
              <Route path="/home" component={Home} exact />
            </div>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
