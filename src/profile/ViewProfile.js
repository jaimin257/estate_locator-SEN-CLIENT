import React from "react";
import "./ViewProfile.css";
import Avatar from "react-avatar";
import cookie from "react-cookies";
import $ from 'jquery';

let appurl = "http://localhost:1433"

const color = ["red", "green", "purple", "cyan", "teal", "blue"];
const getcolor = () => {
  return color[Math.floor(Math.random() * 8)];
};

export class ViewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
        firstname: "",
        uid: cookie.load("uid"),
        contactno: "",
        firstname: "",
        lastname: "",
        gender: "",
        mobile: "",
        address: "",
        country: "",
        state: "",
        city: "",
        pincode: ""
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
          this.setState({email: result.user.email});
          this.setState({firstname: result.user.firstName});
          this.setState({lastname: result.user.lastName});
          this.setState({gender: result.user.sex});
          this.setState({mobile: result.user.mobileno});
          this.setState({address: result.user.address});
          this.setState({country: result.user.country});
          this.setState({state: result.user.state});
          this.setState({city: result.user.city});
          this.setState({country: result.user.country});
          this.setState({pincode: result.user.pincode});
        }.bind(this),
        error: function (result){
          console.log("user retrived failed");
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
                    <strong>First Name</strong>
                  </td>
                  <td> {this.state.firstname} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>Last Name</strong>
                  </td>
                  <td> {this.state.lastname} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>Gender</strong>
                  </td>
                  <td> {this.state.gender} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>Email</strong>
                  </td>
                  <td> {this.state.email} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>Mobile Number</strong>
                  </td>
                  <td> {this.state.mobile} </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <strong>Addresses</strong>
                  </td>
                  <td> {this.state.address} </td>
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
                <tr>
                  <td>
                    {" "}
                    <strong>Pincode</strong>
                  </td>
                  <td> {this.state.pincode} </td>
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
