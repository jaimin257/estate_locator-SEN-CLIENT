import React, { PureComponent } from "react";
import cookie from "react-cookies";
import "./ViewProfile.css";
import { Redirect } from 'react-router';
import $ from 'jquery';

let appurl = "http://localhost:1433"

export class EditProfile extends PureComponent {
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
        pincode: "",
        redirectProf: false,
        error: "",
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
  

  onEdit(param){
    console.log("editing");
    let userstatus;
    $.ajax({
        url: appurl + '/account/UpdateUser',
        method: 'POST',
        data:{
          userId: this.state.uid,
          firstName: this.state.firstname,
          lastName: this.state.lastname,
          sex: this.state.gender,
          contactno: this.state.mobile,
          address: this.state.address,
          country: this.state.country,
          state: this.state.state,
          district: "null",
          city: this.state.city,
          pincode: this.state.pincode
        },
        statusCode: {
              200: function(){
                console.log("user retrived success");
                userstatus = 200;
              }
            },
        success: function(result){
          if(userstatus === 200){
            console.log("update success");
            this.setState({redirectProf: true});
          }
          else{
            console.log("update failed");
            this.setState({error: "failed"}); 
          }
        }.bind(this)
      });

  }

  onFirstnameChange(param) {
    this.setState({ firstname: param.target.value });
  }
  onLastnameChange(param) {
    this.setState({ lastname: param.target.value });
  }
  onGenderChange(param) {
    this.setState({ gender: param.target.value });
  }
  onMobilenumberChange(param) {
    this.setState({ mobile: param.target.value });
  }
  onAddressChange(param) {
    this.setState({ address: param.target.value });
  }
  onCountryChange(param) {
    this.setState({ country: param.target.value });
  }
  onStateChange(param) {
    this.setState({ state: param.target.value });
  }
  onCityChange(param) {
    this.setState({ city: param.target.value });
  }
  onPincodeChange(param) {
    this.setState({ pincode: param.target.value });
  }

  render() {    
    const { firstname, uid, contactno, lastname, gender, mobile, address, country, state, city, pincode, redirectProf } = this.state;

    if(redirectProf){
      return <Redirect to='/home'/>
    }

    return (
      <div>
        <form
          className="edit-profile"
          /* onSubmit={e => {
            e.preventDefault();
            this.props.changeIsEdit();
            this.props.updateUser(this.state);
          }}*/
        >
          <table className="table table-striped animated fadeIn">
            <tbody>
              <tr>
                <td> First Name</td>
                <td>
                  <input
                    type="text"
                    // placeholder="Enter you first name"
                    name="firstname"
                    required="true"
                    value={this.state.firstname}
                    onChange={this.onFirstnameChange.bind(this)}
                  />
                </td>
              </tr>
              <tr>
                <td> Last Name</td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter you last name"
                    name="lastname"
                    required="true"
                    value={this.state.lastname}
                    onChange={this.onLastnameChange.bind(this)}
                  />
                </td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={this.state.gender==="Male"}
                    onChange={this.onGenderChange.bind(this)}
                  /> Male
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={this.state.gender==="Female"}
                    onChange={this.onGenderChange.bind(this)}
                  /> Female
                </td>
              </tr>
              <tr>
                <td>Primary Email</td>
                <td>{this.state.email}</td>
              </tr>
              <tr>
                <td> Mobile Number </td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter Mobile Number"
                    name="contactNo"
                    required="true"
                    pattern="[0-9]{10}"
                    value={this.state.mobile}
                    onChange={this.onMobilenumberChange.bind(this)}
                  />
                </td>
              </tr>
              <tr>
                <td>Address</td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter you Address"
                    name="address"
                    required="true"
                    value={this.state.address}
                    onChange={this.onAddressChange.bind(this)}
                  />
                </td>
              </tr>
              <tr>
                <td>City</td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter you city"
                    name="city"
                    required="true"
                    value={this.state.city}
                    onChange={this.onCityChange.bind(this)}
                  />
                </td>
              </tr>
              <tr>
                <td>State</td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter your state"
                    name="state"
                    required="true"
                    value={this.state.state}
                    onChange={this.onStateChange.bind(this)}
                  />
                </td>
              </tr>
              <tr>
                <td>Country</td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter your Country"
                    name="state"
                    required="true"
                    value={this.state.country}
                    onChange={this.onCountryChange.bind(this)}
                  />
                </td>
              </tr>
              <tr>
                <td>Pincode</td>
                <td>
                  <input
                    type="numeric"
                    placeholder="Enter your Pincode"
                    name="state"
                    required="true"
                    value={this.state.pincode}
                    onChange={this.onPincodeChange.bind(this)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {this.state.error}

          <input
            type="submit"
            className="btn btn-outline-success style-btn"
            value="Save"
            onClick={this.onEdit.bind(this)}
          />
        </form>
      </div>
    );
  }
}
