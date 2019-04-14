import React, { PureComponent } from "react";
import cookie from "react-cookies";
import {BrowserRouter as Router, Redirect, Route, Link, Switch} from "react-router-dom";
import { ViewProfile } from "./ViewProfile.js";
import { EditProfile } from "./EditProfile.js";
import "./ViewProfile.css";
import $ from 'jquery';

let appurl = "http://localhost:1433"

export class Myprofile extends PureComponent {
  constructor() {
    super();
    this.state = {
      isEdit: false,
    };
  }

  componentWillMount(){
    let userstatus = 0;
      $.ajax({
          url: appurl + '/account/getUser',
          method: 'POST',
          data:{
            userId: cookie.load("uid")
          },
        statusCode: {
          200: function(){
            console.log("user retrived success");
            userstatus = 200;
          }
        },
        success: function(result){
          this.setState({isEdit: !result.user.addedExtraInfo});
        }.bind(this),
        error: function (result){
          console.log("user retrived failed");
        }
      });
  }

  changeIsEdit(){
    this.setState({
      isEdit: !this.state.isEdit
    });
    // console.log(this.state.isEdit);
  };

  render() {

    if(!cookie.load('uid')){
      return <Redirect to='/home'/> 
    }

    return (
      <div>
        <div className="animated fadeIn">
          {!this.state.isEdit && 
            <ViewProfile user="mahin"/> 
          }
          {!this.state.isEdit && 
            <button type="button" className="btn btn-outline-primary style-btn" onClick={this.changeIsEdit.bind(this)}>
              Edit
            </button>
          }

          {this.state.isEdit && 
            <EditProfile
              user="mahin"
              updateUser="mahin"
              changeIsEdit={this.changeIsEdit}
            />
          }
          
        </div>
      </div>
    );
  }
}

