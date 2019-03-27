import React, { Component } from 'react'
import './home.css';
import $ from 'jquery';


export class Home extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div class='home'>
				<h1> Home </h1>
				<form class="form-container">
					<input id="search-bar" type="text" placeholder="Enter Area/Property Name"/>
					<div class="search-buttton">
						<button href="#" onclick=""><img class="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"/></button>
						<button href="#" onclick="" > || </button>
					</div>
				</form>
			</div>
		);
	}

}