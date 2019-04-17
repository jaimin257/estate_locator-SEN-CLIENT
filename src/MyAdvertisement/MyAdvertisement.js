import React, { Component } from "react";
import RenderToLayer from "material-ui/internal/RenderToLayer";
import "font-awesome/css/font-awesome.min.css";
import {
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
import {BrowserRouter as Router, Redirect, Route, Link, Switch} from "react-router-dom";
import Avatar from "react-avatar";
import "./MyAdvertisement.css";
import cookie from "react-cookies";
import $ from 'jquery';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';

let appurl = "http://localhost:1433";

const color = ["red", "green", "purple", "cyan", "teal", "blue"];
const getcolor = () => {
  return color[Math.floor(Math.random() * 8)];
};
const override = css`
    display: block;
    border-color: red;
    display: block;
    position: absolute;
    left: 47%;
    top: 40%;
`;

export class MyAdvertisement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchresults: [],
      loading: true,
    };
  }

  componentWillMount(){
    let userstatus = 0;
      $.ajax({
          url: appurl + '/property/getMyProps',
          method: 'POST',
          headers: {
            'authorization' : 'Basic ' + cookie.load('cookiesNamejwt'),
          },
          data:{
            token: cookie.load('cookiesNamejwt'),
            user: cookie.load("uid")
          },
        statusCode: {
          200: function(){
            console.log("property retrived success");
            userstatus = 200;
          }
        },
        success: function(result){
          console.log(result);
          let myprops = [];
          result.map((p, index) => {
            myprops.push(
              {
                pid: p._id,
                pname: p.propertyName,
                budget: p.property_amount,
                location: p.propertyLocation,
              }
            )
          });
          this.setState({ searchresults : myprops });
          this.setState({ loading: false});
        }.bind(this),
        error: function (result){
          console.log("property retrived failed");
        }
      });
  }

  removeprop(param){
    // window.location.reload();
    // return;
    let userstatus = 0;
    $.ajax({
          url: appurl + '/property/removeProp?propId='+param,
          method: 'DELETE',
          headers: {
            'authorization' : 'Basic ' + cookie.load('cookiesNamejwt'),
          },
          data:{
            userId: cookie.load("uid"),
            token: cookie.load('cookiesNamejwt'),
          },
        statusCode: {
          200: function(){
            console.log("property delete success");
            window.location.reload();
          },
        },
        error: function (result){
          console.log("property delete failed");
        }
      });
  }

  render() {

    if(this.state.loading){
      return (
        <div className='sweet-loading'>
          <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={150}
            color={'#123abc'}
            loading={this.state.loading}
          />
        </div> )
    }

    var center = {
      textAlign: "center"
    };
    const { searchresults } = this.state;
    const data = [{ name: "test1" }, { name: "test2" }];


    return (
      <div className="homeprop">
        <div className="animated fadeIn">
              <h4 className="headprop">
                <strong>
                   My Advertisement
                </strong>
              </h4>
          <div>
            <div class="allsearch">
              {searchresults.map(d => (
                <Card style={{ 
                    border: "none",
                    background: "rgba(255,255,255,0.15)"
                  }}>
                  <div className="fif">
                    <div id="avatar_position" className="image">
                      <Avatar color={getcolor()} round={false} size={80} />
                      <div className="name-style">
                        {/*userInfo.user_first_name*/}{" "}
                        {/*userInfo.user_last_name*/}
                      </div>
                    </div>
                    <div className="properties">
                      <div>
                        <strong> Property Name : </strong>
                        {d.pname}
                      </div>
                      <div>
                        <strong>Price :</strong> ₹{" "}
                        <span className="price">{d.budget}</span>{" "}
                      </div>
                      <div>
                        <td>
                          {" "}
                          <strong>Address : </strong>
                          {d.location}
                          {"  "}
                        </td>
                      </div>
                      <div className="buttons" width='200px'>
                        <div>
                          <button type="button" class="btn btn-primary" >
                            <a href={'/Property/'+d.pid} className="link">
                              View More Details!!
                            </a>
                          </button>
                        </div>
                        <div className="delete">
                          <button type="button" className="btn btn-danger" onClick={this.removeprop.bind(this, d.pid)}>
                            <a className="link">
                              <i
                                className="fa fa-trash"
                                style={{ textAlign: "center" }}
                              />{"  "}
                              Delete
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
