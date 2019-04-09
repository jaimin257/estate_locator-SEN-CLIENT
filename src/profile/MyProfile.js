import React, { PureComponent } from "react";
import cookie from "react-cookies";
import { ViewProfile } from "./ViewProfile.js";
import { EditProfile } from "./EditProfile.js";
import "./ViewProfile.css";

export class Myprofile extends PureComponent {
  constructor() {
    super();
    this.state = {
      isEdit: cookie.load('hasextrainfo') === 'false' ? true : false
    };
  }

  changeIsEdit(){
    this.setState({
      isEdit: !this.state.isEdit
    });
    // console.log(this.state.isEdit);
  };

  render() {
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

