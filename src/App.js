import React, { Component } from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import { LoginRegisterBox } from './login/LoginRegisterBox.js';
import { Home } from './home/Home.js';
import { NavBar } from './navbar/navbar.js';

let appurl = "http://localhost:1433"

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      	<div>
      	   	<Switch>
        		<Route path="/" component={LoginRegisterBox} exact />
            <div>
              <NavBar/>
        		  <Route path="/home" component={Home} />
            </div>
        	</Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
