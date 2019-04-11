import React from "react";
import "./ViewProfile.css";
import Avatar from "react-avatar";
import cookie from "react-cookies";

const color = ["red", "green", "purple", "cyan", "teal", "blue"];
const getcolor = () => {
  return color[Math.floor(Math.random() * 8)];
};

export class ViewProfile extends React.Component {
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
                    <strong>First Name</strong>
                  </td>
                  <td> {this.state.firstname} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>Last Name</strong>
                  </td>
                  <td>
                    {" "}
                    {/*userInfo.user_last_name ? userInfo.user_last_name : ""*/}{" "}
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>Gender</strong>
                  </td>
                  <td> {/*props.user.primaryEmail*/} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>Email</strong>
                  </td>
                  <td>{this.state.email} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>Mobile Number</strong>
                  </td>
                  <td> {/*userInfo.user_sex*/} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>Addresses</strong>
                  </td>
                  <td> {/*userInfo.user_programme*/} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>City</strong>
                  </td>
                  <td> {/*userInfo.user_batch*/} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>State</strong>
                  </td>
                  <td> {/*userInfo.user_type*/} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>Pincode</strong>
                  </td>
                  <td> {/*userInfo.user_type*/} </td>
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
