import React from "react";
import "./ViewProperty.css";
import Avatar from "react-avatar";
import cookie from "react-cookies";
import $ from "jquery";

let appurl = "http://localhost:1433"

const color = ["red", "green", "purple", "cyan", "teal", "blue"];
const getcolor = () => {
  return color[Math.floor(Math.random() * 8)];
};

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
          console.log(result.prop);
        }.bind(this),
        error: function (result){
          console.log("property retrived failed");
        }
      });
  }


  render() {
    return (
      <div className="container">
        <div className="parent">
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
                

                {/* 
                <small>
                  {this.state.propertytype === "appartmentandhouse" ? (
                    <tr>
                      <td>
                        {" "}
                        <strong>Number of Rooms</strong>
                      </td>
                      <td> {this.state.no} </td>
                    </tr>
                  ) : (
                    <div />
                  )}
                </small>
              */}
              {/*
                <small>
                  {this.state.firstname === "" ? (
                    <tr>
                      <td>
                        {" "}
                        <strong>Seller name</strong>
                      </td>
                      <td>{this.state.email} </td>
                    </tr>
                  ) : (
                    <tr>
                      <td>
                        {" "}
                        <strong>Broker name</strong>
                      </td>
                      <td>{this.state.email} </td>
                    </tr>
                  )}
                </small>
                

                <tr>
                  <td>
                    {" "}
                    <strong>Contact Number</strong>
                  </td>
                  <td>{this.state.email} </td>
                </tr>
              */}
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
