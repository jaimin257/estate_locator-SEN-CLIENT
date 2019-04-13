import React from "react";
import "./ViewProperty.css";
import Avatar from "react-avatar";
import cookie from "react-cookies";

const color = ["red", "green", "purple", "cyan", "teal", "blue"];
const getcolor = () => {
  return color[Math.floor(Math.random() * 8)];
};

export class ViewProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: cookie.load("firstname"),
      email: cookie.load("email")
    };
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
                  <td> {this.state.firstname} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>Price</strong>
                  </td>
                  <td> {/*userInfo.user_sex*/} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>Carpet Area</strong>
                  </td>
                  <td> {/*userInfo.user_type*/} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>Property Type</strong>
                  </td>
                  <td> {/*userInfo.user_programme*/} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>Location</strong>
                  </td>
                  <td>
                    {" "}
                    {/*userInfo.user_last_name ? userInfo.user_last_name : ""*/}{" "}
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>City</strong>
                  </td>
                  <td> {/*userInfo.user_type*/} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>State</strong>
                  </td>
                  <td> {/*userInfo.user_type*/} </td>
                </tr>
                <small>
                  {this.state.firstname === "shopsandoffice" ||
                  this.state.firstname === "appartmentandhouse" ? (
                    <tr>
                      <td>
                        {" "}
                        <strong>Construction status</strong>
                      </td>
                      <td> {/*props.user.primaryEmail*/} </td>
                    </tr>
                  ) : (
                    <div />
                  )}
                </small>
                <small>
                  {this.state.firstname === "shopsandoffice" ||
                  this.state.firstname === "appartmentandhouse" ? (
                    <tr>
                      <td>
                        {" "}
                        <strong>Age of Property</strong>
                      </td>
                      <td> {/*props.user.primaryEmail*/} </td>
                    </tr>
                  ) : (
                    <div />
                  )}
                </small>
                <small>
                  {this.state.firstname === "appartmentandhouse" ? (
                    <tr>
                      <td>
                        {" "}
                        <strong>Number of Bedrooms</strong>
                      </td>
                      <td> {/*props.user.primaryEmail*/} </td>
                    </tr>
                  ) : (
                    <div />
                  )}
                </small>
                <small>
                  {this.state.firstname === "appartmentandhouse" ? (
                    <tr>
                      <td>
                        {" "}
                        <strong>Furnish Type</strong>
                      </td>
                      <td> {/*props.user.primaryEmail*/} </td>
                    </tr>
                  ) : (
                    <div />
                  )}
                </small>

                <tr>
                  <td>
                    {" "}
                    <strong>Contract type</strong>
                  </td>
                  <td> {/*userInfo.user_batch*/} </td>
                </tr>
                <small>
                  {this.state.firstname === "mahin" ? (
                    <tr>
                      <td>
                        {" "}
                        <strong>Floors</strong>
                      </td>
                      <td> {/*userInfo.user_type*/} </td>
                    </tr>
                  ) : (
                    <div />
                  )}
                </small>

                <small>
                  {this.state.firstname === "mahin" ? (
                    <tr>
                      <td>
                        {" "}
                        <strong>Number of Rooms</strong>
                      </td>
                      <td> {/*userInfo.user_type*/} </td>
                    </tr>
                  ) : (
                    <div />
                  )}
                </small>
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
