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

let appurl = "http://localhost:1433";

const color = ["red", "green", "purple", "cyan", "teal", "blue"];
const getcolor = () => {
  return color[Math.floor(Math.random() * 8)];
};

export class MyAdvertisement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchresults: [],
      /*searchresults: [
        {
          pname: "mahin",
          location: "B/7 Shrama safalya society,nr tana appartment, ellorapark",
          city: "hello",
          budget: "100",
          more: "ok"
        },
        {
          pname: "mahinaa",
          location: "gra",
          city: "heo",
          budget: "100",
          more: "ok"
        },
        {
          pname: "mahin",
          location: "agra",
          city: "hello",
          budget: "100",
          more: "ok"
        },
        {
          pname: "mahin",
          location: "agra",
          city: "hello",
          budget: "100",
          more: "ok"
        },
        {
          pname: "mahin",
          location: "agra",
          city: "hello",
          budget: "100",
          more: "ok"
        },
        {
          pname: "mahin",
          location: "agra",
          city: "hello",
          budget: "100",
          more: "ok"
        },
        {
          pname: "mahin",
          location: "agra",
          city: "hello",
          budget: "100",
          more: "ok"
        }
      ]*/
    };
  }

  componentWillMount(){
    let userstatus = 0;
      $.ajax({
          url: appurl + '/property/getMyProps',
          method: 'POST',
          data:{
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
    var center = {
      textAlign: "center"
    };
    const { searchresults } = this.state;
    const data = [{ name: "test1" }, { name: "test2" }];


    return (
      <div className="animated fadeIn">
        <Card
          style={{
            border: "none",
            backgroundImage:
              "url(" +
              "https://raw.githubusercontent.com/ayubSubhaniya/ssrs-client/master/src/images/w2.jpg" +
              ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            border: "none"
          }}
        >
          <CardHeader>
            <h4>
              <strong>
                 My Advertisement
              </strong>
            </h4>
          </CardHeader>
        </Card>
        <div>
          <div class="allsearch">
            {searchresults.map(d => (
              <Card style={{ border: "none" }}>
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
                          
                            <i
                              className="fa fa-trash"
                              style={{ textAlign: "center" }}
                            />
                          <a href={'/Property/'+d.pid} className="link">
                            View More Details!!
                          </a>
                        </button>
                      </div>
                      <div className="delete">
                        <button type="button" className="btn btn-danger" onClick={this.removeprop.bind(this, d.pid)}>
                          <i
                            className="fa fa-trash"
                            style={{ textAlign: "center" }}
                          />
                          Delete
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
    );
  }
}
