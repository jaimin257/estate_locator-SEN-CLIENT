import React from "react";
import "./ViewProperty.css";
import Avatar from "react-avatar";
import cookie from "react-cookies";
import $ from "jquery";
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import Image from "react-bootstrap/Image";
import "./helper.js";

let appurl = "http://localhost:1433"

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

export class ViewProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pname: "",
      price: "",
      carpetarea: "",
      propertytype: "",
      location: "",
      city: "",
      state: "",
      contracttype: "",
      cstatus: "",
      nobed: "",
      furnishtype: "",
      floors: "",
      loading: true,
      images: [],
      sname: "",
      snumber: "",
      sid: "",
    };

    // console.log(this.props);
    // console.log(this.props.match.params.pid);
  }

  componentWillMount(){
    console.log("pid : " + this.props.match.params.pid);
    let userstatus = 0;
      $.ajax({
          url: appurl + '/property/getThisProp?propId=' + this.props.match.params.pid,
          method: 'GET',
          // data:{
          //   propId: this.props.match.params.pid,
          // },
        statusCode: {
          200: function(){
            console.log("property retrived success");
            userstatus = 200;
          }
          },
          success: function(result){
            this.setState({ sid: result.prop.seller });
            this.setState({ pname: result.prop.propertyName });
            this.setState({ price: result.prop.property_amount });
            this.setState({ carpetarea: result.prop.carpet_area });
            this.setState({ propertytype: result.prop.property_type });
            this.setState({ location: result.prop.propertyLocation });
            this.setState({ city: result.prop.city });
            this.setState({ state: result.prop.state });
            this.setState({ contracttype: result.prop.contract_type });
            this.setState({ cstatus: result.prop.constructionStatus });
            this.setState({ nobed: result.prop.noOfRooms });
            this.setState({ furnishtype: result.prop.furnishedType });
            this.setState({ floors: result.prop.floor });

            $.ajax({
            url: appurl + '/account/getUser',
            method: 'POST',
            data:{
              userId: this.state.sid,
            },
            success: function(res){
              this.setState({sname: res.user.firstName});
              this.setState({snumber: res.user.mobileno});
              console.log(res);
              this.setState({ loading: false});
            }.bind(this),
            error: function (res){
              console.log("property retrived failed");
              this.setState({ loading: false});
            }.bind(this)
          });
          console.log(result.prop);
          
        }.bind(this),
        error: function (result){
          console.log("property retrived failed");
        }
      });

      let x = [];
      let i = 0;
      while(this.imageExists('http://localhost:1433/static/'+this.props.match.params.pid+'_'+i.toString()+'.png')){
        x.push(i);
        i = i+1;
      }
      this.setState({ images: x});


  }

  imageExists(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    console.log("httping" + http.status);
    return http.status != 404;
  }

  loadImages(){
    console.log("gayuuuuu : " + this.state.images.length);
    return(
      <div> 
          {
            this.state.images.map( i => {
              return <img src={"http://localhost:1433/static/"+this.props.match.params.pid+"_"+i.toString()+".png"} />
            })
          }
      </div>
    )
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

    return ( 
      <div className="container">

        {<div id="slider-wrapper">
                  <div class="slider-controlls">
                    <button class="next"> > </button>
                    <button class="prev"> > </button>
                  </div>
                  <div class="slider-items">
                    {this.state.images.map(i => (
                      <div className="slider-item">
                        <div class="content">
                          <img
                            src={
                              "http://localhost:1433/static/" +
                              this.props.match.params.pid +
                              "_" +
                              i.toString() +
                              ".png"
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>}

        <div className="parent">
                {/*this.loadImages()*/}
          <div className="quick-view" id="avatar_position">
            <Avatar color={getcolor()} round={true} size={120} />
            <div className="name-style">
              {/*userInfo.user_first_name*/} {/*userInfo.user_last_name*/}
            </div>
          </div>
          <div className="info-table">
            <table className="  table table-striped">
              <tbody>
                <tr>
                  <td>
                    {" "}
                    <strong>Property Name</strong>
                  </td>
                  <td> {this.state.pname} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>Price</strong>
                  </td>
                  <td> {this.state.price} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>Carpet Area</strong>
                  </td>
                  <td> {this.state.carpetarea} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>Property Type</strong>
                  </td>
                  <td> {this.state.propertytype} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>Location</strong>
                  </td>
                  <td>
                    {" "}
                    {this.state.location}{" "}
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>City</strong>
                  </td>
                  <td> {this.state.city} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>State</strong>
                  </td>
                  <td> {this.state.state} </td>
                </tr>
              
                {this.state.propertytype === "shopsandoffice" ||
                this.state.propertytype === "appartmentandhouse" ? (
                  <tr>
                    <td>
                      {" "}
                      <strong>Construction status</strong>
                    </td>
                    <td> {this.state.cstatus} </td>
                  </tr>
                ) : (
                  <div />
                )}
                {/* 
                <small>
                  {this.state.firstname === "shopsandoffice" ||
                  this.state.firstname === "appartmentandhouse" ? (
                    <tr>
                      <td>
                        {" "}
                        <strong>Age of Property</strong>
                      </td>
                      <td> {55} </td>
                    </tr>
                  ) : (
                    <div />
                  )}
                </small>
                */}

                {this.state.propertytype === "appartmentandhouse" ? (
                  <tr>
                    <td>
                      {" "}
                      <strong>Number of Rooms</strong>
                    </td>
                    <td> {this.state.nobed} </td>
                  </tr>
                ) : (
                  <div />
                )}

                {this.state.propertytype === "appartmentandhouse" ? (
                  <tr>
                    <td>
                      {" "}
                      <strong>Furnish Type</strong>
                    </td>
                    <td> {this.state.furnishtype} </td>
                  </tr>
                ) : (
                  <div />
                )}

                <tr>
                  <td>
                    {" "}
                    <strong>Contract type</strong>
                  </td>
                  <td> {this.state.contracttype} </td>
                </tr>

                
                {this.state.propertytype === "appartmentandhouse" ? (
                  <tr>
                    <td>
                      {" "}
                      <strong>Floors</strong>
                    </td>
                    <td> {this.state.floors} </td>
                  </tr>
                ) : (
                  <div />
                )}
                  <tr>
                    <td>
                      {" "}
                      <strong>Seller name</strong>
                    </td>
                    <td>{this.state.sname} </td>
                  </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>Contact Number</strong>
                  </td>
                  <td>{this.state.snumber} </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/*isStudent(props.user) ? (
          <div className="add-header">
            <h2 style={{ "margin-left": "8px" }}>Saved Addresses</h2>
            <hr style={{ borderWidth: "3px", background: "#343a42" }} />
          </div>
        ) : (
          <div />
        )*/}
        <div className="container" />
      </div>
    );
  }
}
