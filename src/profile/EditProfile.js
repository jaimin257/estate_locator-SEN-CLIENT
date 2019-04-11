import React, { PureComponent } from "react";
import cookie from "react-cookies";
import "./ViewProfile.css";

export class EditProfile extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      firstname: cookie.load("firstname"),
      email: cookie.load("email"),
      contactNo: ""
    };
    /*this.handleChange = handleChange.bind(this);*/
  }

  render() {
    /*const userInfo = this.props.user.userInfo;*/
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
                    placeholder="Enter you first name"
                    name="firstname"
                    required="true"
                    value={this.state.firstname}
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
                  />
                </td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter you gender"
                    name="gender"
                    required="true"
                  />
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
                  />
                </td>
              </tr>
              <tr>
                <td>Pincode</td>
                <td>
                  <input
                    type="numeric"
                    placeholder="Enter your state"
                    name="state"
                    required="true"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <input
            type="submit"
            className="btn btn-outline-success style-btn"
            value="Save"
          />
        </form>
      </div>
    );
  }
}
