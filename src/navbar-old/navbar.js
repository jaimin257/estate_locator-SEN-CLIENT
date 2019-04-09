import React, { Component } from 'react';
import $ from 'jquery';
import './navbar.css';

export class NavBar extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			isLoggeedIn: false
		}
	}

	render(){
		return(
			<div class="nav-bar">
				<div class="header"> Estate Locator</div>
				<small>{ 
					this.state.isLoggeedIn === true ? ( 
						<div> 
							<div class="item"> Sign Up </div>
							<div class="item"> Login </div>
						</div>
					)
					: ( 
						<div class="userinfo"> 
							Username 
						</div>
					)
				}
				</small>
			</div>
		);
	}
}