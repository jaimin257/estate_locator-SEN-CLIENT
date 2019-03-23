import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Home.css';
import $ from 'jquery';
import * as serviceWorker from './serviceWorker';

class Home extends React.component {
	constructor(props){

	}

	render(){
		return (
			<h1> New Home </h1>
		)
	}

}
	
ReactDOM.render(<h1>dsasd</h1>, document.getElementById('root'));
serviceWorker.unregister();