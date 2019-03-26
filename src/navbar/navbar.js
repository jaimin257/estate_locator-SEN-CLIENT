import React, { Component } from 'react';
import $ from 'jquery';
import './navbar.css';

export class NavBar extends React.Component {
	constructor(props){
		super(props);

	}

	render(){
		return(
			<header id="header">
			  	<a class="site-logo" href="#">
			           Logo
				</a>

			  <nav role="navigation" id="nav-main" class="okayNav">
			    <ul>
			      <li><a href="#">Home</a></li>
			      <li><a href="#">Shop</a></li>
			      <li><a href="#">Blog</a></li>
			      <li><a href="#">Services</a></li>
			      <li><a href="#">Contacts</a></li>
			      <li><a href="#">About us</a></li>
			      <li><a href="#">Testimonials</a></li>
			    </ul>
			  </nav>
			</header>
		);
	}
}