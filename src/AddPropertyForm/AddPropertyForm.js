import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import "./addPropertyForm.css";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import cookie from "react-cookies";
import $ from "jquery";
import Modal from 'react-awesome-modal';
import axios from 'axios';

let appurl = "http://localhost:1433"

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 500
  },
  button: {
    display: "block",
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 1000
  }
});

export class AddPropertyForm extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleA = this.toggleA.bind(this);

    this.toggleSell = this.toggleSell.bind(this);
    this.toggleRent = this.toggleRent.bind(this);
    this.state = {
      isOwner: false,
      isBuy: false,
      pname: "0",
      location: "0",
      city: "0",
      state: "0",
      proptype: "0",
      carpetarea: "0",
      open: false,
      constructionStatus: "0",
      bedroom: "0",
      sellprice: "0",
      contract: "0",
      desc: "0",
      totalfloors: "0",
      popup: false,
      popupError: "",
      images: [],
      imgerr: "",
    };
  }

  openPopup() {
    this.setState({
        popup : true
    });
  } 

  closePopup() {
    this.setState({
      popup : false
    });
  }

  toggle() {
    this.setState({
      isOwner: true
    });
  }

  toggleA() {
    this.setState({
      isOwner: false
    });
  }

  toggleSell() {
    this.setState({
      isBuy: true
    });
  }

  toggleRent() {
    this.setState({
      isBuy: false
    });
  }

  handleChange = pname => event => {
    this.setState({ [pname]: event.target.value });
  };
  handleChange = location => event => {
    this.setState({ [location]: event.target.value });
  };
  handleChange = city => event => {
    this.setState({ [city]: event.target.value });
  };
  handleChange = state => event => {
    this.setState({ [state]: event.target.value });
  };
  handleChange = typeOfPlot => event => {
    this.setState({ [typeOfPlot]: event.target.value });
  };

  handleChange = proptype => event => {
    this.setState({ [proptype]: event.target.value });
  };

  handleChange = bedroom => event => {
    this.setState({ [bedroom]: event.target.value });
  };


  handleChange = constructionStatus => event => {
    this.setState({ [constructionStatus]: event.target.value });
  };


  handleChange = carpetarea => event => {
    this.setState({ [carpetarea]: event.target.value });
  };
  handleChange = totalfloors => event => {
    this.setState({ [totalfloors]: event.target.value });
  };

  handleChange = ageofproperty => event => {
    this.setState({ [ageofproperty]: event.target.value });
  };
  handleChange = sellprice => event => {
    this.setState({ [sellprice]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  _onOptionChange(option) {
    this.setState({
      option: option
    });
  }

  _onOwnerChange(owner) {
    this.setState({
      owner: owner
    });
  }

  _onContractChange(contract) {
    this.setState({
      contract: contract
    });
  }
  _onConstructionChange(constructionStatus) {
    this.setState({
      constructionStatus: constructionStatus
    });
  }

  _onPropertyChange(proptype) {
    this.setState({
      proptype: proptype
    });
  }

  _onFurnishChange(furnish) {
    this.setState({
      furnish: furnish
    });
  }

  onFileChange = (event) => {
    let images = [];
    for (var i = 0; i < event.target.files.length; i++) {
      images[i] = event.target.files.item(i);
    }
    console.log(this.state.images.length);
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/));
    let imgerr = `${images.length} valid image(s) selected`;
    this.setState({ 
      images: images,
      imgerr : imgerr
    });
    console.log(this.state.images.length);
  }


  onSubmit(e){
    e.preventDefault();


    let userstatus;
    $.ajax({
        url: appurl + '/property/addProp',
        method: 'POST',
        headers: {
          'authorization' : 'Basic ' + cookie.load('cookiesNamejwt'),
        },
        data:{
          token: cookie.load('cookiesNamejwt'),
          propertyName: this.state.pname,
          propertyLocation: this.state.location,
          constructionStatus: this.state.constructionStatus,
          bookingStatus: "00",
          seller: cookie.load('uid'),
          property_type: this.state.proptype,
          property_amount: this.state.sellprice,
          contract_type: this.state.contract,
          floor: this.state.totalfloors,
          carpet_area: this.state.carpetarea,
          state: this.state.state,
          city: this.state.city,
          noOfRooms: this.state.bedroom,
          furnishedType: this.state.furnish,
          description:  this.state.pname + ' ' +
                        this.state.location + ' ' +
                        this.state.constructionStatus + ' ' +
                        cookie.load('uid') + ' ' +
                        this.state.proptype + ' ' +
                        this.state.sellprice + ' ' +
                        this.state.contract + ' ' +
                        this.state.totalfloors + ' ' +
                        this.state.carpetarea + ' ' +
                        this.state.state + ' ' +
                        this.state.city + ' ' +
                        this.state.bedroom + ' ' + 
                        this.state.furnish + ' ' 
        },
        statusCode: {
              200: function(){
                userstatus = 200;
              }
            },
        success: function(result){
          if(userstatus === 200){

            // this.state.file.map( (f,index) => {
            //   console.log("submiting");
            //   console.log(this.state.file1.name);
            //   let data = new FormData();
            //   data.append(this.state.pname+str(index)+, f, f.name);
            //   axios.post(appurl + "/property/addfile", data)
            //     .then( res => { 
            //       console.log("successsss : " + res);
            //     });

            // })
            



            console.log(result);
            this.setState({ popupError : ""});
          }
          else{
            this.setState({ popupError : "error"});
          }
          this.openPopup();
        }.bind(this)
      });
  }


  render() {
    const { classes } = this.props;
    return (
      <div>
        <div class="ownerinfo">
          <h6>I am</h6>
          <div class="radio toggle">
            <ButtonGroup required="true">
              <Button
                onClick={this._onOwnerChange.bind(this, "iamowner")}
                active={this.state.owner === "iamowner"}
              >
                Owner
              </Button>
              <Button
                onClick={this._onOwnerChange.bind(this, "iambroker")}
                active={this.state.owner === "iambroker"}
              >
                Broker
              </Button>
            </ButtonGroup>
          </div>

          <form noValidate autoComplete="off" class="name input">
            <TextField
              id="standard-name"
              label="Property Name"
              value={this.state.pname}
              required="true"
              onChange={this.handleChange("pname")}
              margin="normal"
            />
          </form>
        </div>

        <div class="ownerinfo">
          <h3>Tell us about your property</h3>
          <h6>Property for</h6>
          <div class="radio toggle">
            <ButtonGroup>
              <Button
                onClick={this._onContractChange.bind(this, "forsell")}
                active={this.state.contract === "forsell"}
              >
                Sell
              </Button>
              <Button
                onClick={this._onContractChange.bind(this, "forrent")}
                active={this.state.contract === "forrent"}
              >
                Rent
              </Button>
            </ButtonGroup>
          </div>

          <ButtonGroup>
            <Button
              onClick={this._onPropertyChange.bind(this, "landandplot")}
              active={this.state.proptype === "landandplot"}
            >
              Land or Plot
            </Button>
            <Button
              onClick={this._onPropertyChange.bind(this, "appartmentandhouse")}
              active={this.state.proptype === "appartmentandhouse"}
            > 
              Appartment or House
            </Button>

            <Button
              onClick={this._onPropertyChange.bind(this, "shopsandoffice")}
              active={this.state.proptype === "shopsandoffice"}
            >
              Shops or Offices
            </Button>
          </ButtonGroup>

          <form noValidate autoComplete="off" class="name input">
            <TextField
              id="standard-name"
              label="Enter Street/Area"
              value={this.state.location}
              onChange={this.handleChange("location")}
              margin="normal"
            />
          </form>

          <form noValidate autoComplete="off" class="name input">
            <TextField
              id="standard-name"
              label="City"
              value={this.state.city}
              onChange={this.handleChange("city")}
              margin="normal"
            />
          </form>
          <form noValidate autoComplete="off" class="name input">
            <TextField
              id="standard-name"
              label="State"
              value={this.state.state}
              onChange={this.handleChange("state")}
              margin="normal"
            />
          </form>
          <small>
            {this.state.proptype === "appartmentandhouse" ||
            this.state.proptype === "shopsandoffice" ? (
              <div>
                <h6>Construction Status</h6>
                <ButtonGroup>
                  <Button
                    onClick={this._onConstructionChange.bind(this, "Ready to Move")}
                    active={this.state.constructionStatus === "Ready to Move"}
                  >
                    Ready to Move
                  </Button>
                  <Button
                    onClick={this._onConstructionChange.bind(
                      this,
                      "Under Construction"
                    )}
                    active={this.state.constructionStatus === "Under Construction"}
                  >
                    Under Construction
                  </Button>
                </ButtonGroup>
                <div>
                  <form noValidate autoComplete="off" class="name input">

                    <TextField
                      id="standard-name"
                      label="Carpet Area"
                      value={this.state.carpetarea}
                      onChange={this.handleChange("carpetarea")}
                      margin="normal"
                    />
                  </form>
                  <form noValidate autoComplete="off" class="name input">
                    <TextField
                      id="standard-name"
                      label="Total Floors"
                      value={this.state.totalfloors}
                      onChange={this.handleChange("totalfloors")}
                      margin="normal"
                    />
                  </form>
                  <form>
                    <TextField
                      id="standard-name"
                      label="Age of Property"
                      value={this.state.ageofproperty}
                      onChange={this.handleChange("ageofproperty")}
                      margin="normal"
                    />
                  </form>
                </div>
              </div>
            ) : (
              <div>
                <form>
                  <TextField
                    id="standard-name"
                    label="Carpet area"
                    value={this.state.carpetarea}
                    onChange={this.handleChange("carpetarea")}
                    margin="normal"
                  />
                </form>
              </div>
            )}
          </small>

          <small>
            {this.state.proptype === "appartmentandhouse" ? (
              <div>
                <h6>Furnish Type</h6>
                <ButtonGroup>
                  <Button
                    onClick={this._onFurnishChange.bind(this, "fullyfurnished")}
                    active={this.state.furnish === "fullyfurnished"}
                  >
                    Fully Furnished
                  </Button>
                  <Button
                    onClick={this._onFurnishChange.bind(this, "semifurnished")}
                    active={this.state.furnish === "semifurnished"}
                  >
                    Semi Furnished
                  </Button>
                  <Button
                    onClick={this._onFurnishChange.bind(this, "unfurnished")}
                    active={this.state.furnish === "unfurnished"}
                  >
                    Unfurnished
                  </Button>
                </ButtonGroup>
                <form>
                  <FormControl>
                    <InputLabel>Bedroom</InputLabel>
                    <Select
                      value={this.state.bedroom}
                      onChange={this.handleChange("bedroom")}
                      inputProps={{
                        name: "bedroom"
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>One</MenuItem>
                      <MenuItem value={2}>Two</MenuItem>
                      <MenuItem value={3}>Three</MenuItem>
                    </Select>
                  </FormControl>
                </form>
              </div>
            ) : (
              <div />
            )}
          </small>
        </div>
        <div class="ownerinfo">
          <h6>Share Commericals for your Property</h6>
              <form>
                <TextField
                  id="standard-name"
                  label="Cost"
                  value={this.state.sellprice}
                  onChange={this.handleChange("sellprice")}
                  margin="normal"
                />
              </form>
        </div>
        <div>
          <input type="file" name="file1" onChange={this.onFileChange.bind(this)} multiple />
        </div>
        <div class="package-button">
          <button
            type="button"
            class="btn btn-success float-right package-button"
            onClick={this.onSubmit.bind(this)}
          >
            Select Advertisement Package
          </button>
        </div>

        <Modal visible={this.state.popup} width="400" height="200" effect="fadeInUp" onClickAway={() => this.closePopup()}>
            <div class="popup">
                { this.state.popupError ? (
                    <p>Property Added Successfully</p>
                  ) 
                :
                  (
                    <p>Error Adding Property</p>
                  )
                }  
                <a href="javascript:void(0);" onClick={() => this.closePopup()}><h5><b>Close</b></h5></a>
            </div>
        </Modal>

      </div>
    );
  }
}
