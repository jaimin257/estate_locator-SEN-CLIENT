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
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
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
      name: "",
      street: "",
      city: "",
      locality: "",
      typeOfPlot: "",
      open: false,
      constructionStatus: false,
      bedroom: ""
    };
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

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleChange = street => event => {
    this.setState({ [street]: event.target.value });
  };
  handleChange = city => event => {
    this.setState({ [city]: event.target.value });
  };
  handleChange = locality => event => {
    this.setState({ [locality]: event.target.value });
  };

  handleChange = typeOfPlot => event => {
    this.setState({ [typeOfPlot]: event.target.value });
  };

  handleChange = bedroom => event => {
    this.setState({ [bedroom]: event.target.value });
  };

  handleChange = bathroom => event => {
    this.setState({ [bathroom]: event.target.value });
  };

  handleChange = constructionStatus => event => {
    this.setState({ [constructionStatus]: event.target.value });
  };

  handleChange = builduparea => event => {
    this.setState({ [builduparea]: event.target.value });
  };

  handleChange = carpetarea => event => {
    this.setState({ [carpetarea]: event.target.value });
  };
  handleChange = floorno => event => {
    this.setState({ [floorno]: event.target.value });
  };
  handleChange = totalfloors => event => {
    this.setState({ [totalfloors]: event.target.value });
  };

  handleChange = ageofproperty => event => {
    this.setState({ [ageofproperty]: event.target.value });
  };
  handleChange = totalarea => event => {
    this.setState({ [totalarea]: event.target.value });
  };
  handleChange = sellprice => event => {
    this.setState({ [sellprice]: event.target.value });
  };
  handleChange = maintenancecharge => event => {
    this.setState({ [maintenancecharge]: event.target.value });
  };
  handleChange = monthlyrent => event => {
    this.setState({ [monthlyrent]: event.target.value });
  };
  handleChange = securitydeposit => event => {
    this.setState({ [securitydeposit]: event.target.value });
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

  _onPropertyChange(typeOfPlot) {
    this.setState({
      typeOfPlot: typeOfPlot
    });
  }

  _onFurnishChange(furnish) {
    this.setState({
      furnish: furnish
    });
  }
  render() {
    const { classes } = this.props;
    console.log(this.state.typeOfPlot);
    return (
      <div>
        <div class="ownerinfo">
          <h3>Tell us about yourself</h3>
          <h6>I am</h6>
          <div class="radio toggle">
            <ButtonGroup>
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
              label="Name"
              value={this.state.name}
              onChange={this.handleChange("name")}
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
              active={this.state.typeOfPlot === "landandplot"}
            >
              Land or Plot
            </Button>
            <Button
              onClick={this._onPropertyChange.bind(this, "appartmentandhouse")}
              active={this.state.typeOfPlot === "appartmentandhouse"}
            >
              Appartment or House
            </Button>

            <Button
              onClick={this._onPropertyChange.bind(this, "shopsandoffice")}
              active={this.state.typeOfPlot === "shopsandoffice"}
            >
              Shops or Offices
            </Button>
          </ButtonGroup>

          <form noValidate autoComplete="off" class="name input">
            <TextField
              id="standard-name"
              label="Enter Street/Area/Landmark"
              value={this.state.street}
              onChange={this.handleChange("street")}
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
              label="Locality"
              value={this.state.locality}
              onChange={this.handleChange("locality")}
              margin="normal"
            />
          </form>
          <small>
            {this.state.typeOfPlot === "appartmentandhouse" ||
            this.state.typeOfPlot === "shopsandoffice" ? (
              <div>
                <h6>Construction Status</h6>
                <ButtonGroup>
                  <Button
                    onClick={this._onOptionChange.bind(this, "Ready to Move")}
                    active={this.state.option === "Ready to Move"}
                  >
                    Ready to Move
                  </Button>
                  <Button
                    onClick={this._onOptionChange.bind(
                      this,
                      "Under Construction"
                    )}
                    active={this.state.option === "Under Construction"}
                  >
                    Under Construction
                  </Button>
                </ButtonGroup>
                <div>
                  <form noValidate autoComplete="off" class="name input">
                    <TextField
                      id="standard-name"
                      label="Build Up Area in Sq. ft."
                      value={this.state.builduparea}
                      onChange={this.handleChange("builduparea")}
                      margin="normal"
                    />

                    <TextField
                      id="standard-name"
                      label="Carpet Area (Optional)"
                      value={this.state.carpetarea}
                      onChange={this.handleChange("carpetarea")}
                      margin="normal"
                    />
                  </form>
                  <form noValidate autoComplete="off" class="name input">
                    <TextField
                      id="standard-name"
                      label="Floor no."
                      value={this.state.floorno}
                      onChange={this.handleChange("floorno")}
                      margin="normal"
                    />

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
                    label="Total area"
                    value={this.state.totalarea}
                    onChange={this.handleChange("totalarea")}
                    margin="normal"
                  />
                </form>
              </div>
            )}
          </small>

          <small>
            {this.state.typeOfPlot === "appartmentandhouse" ? (
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
                  <div>
                    <FormControl>
                      <InputLabel>Bathroom Count</InputLabel>
                      <Select
                        value={this.state.bathroom}
                        onChange={this.handleChange("bathroom")}
                        inputProps={{
                          name: "bathroom"
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
                  </div>
                </form>
              </div>
            ) : (
              <div />
            )}
          </small>
        </div>
        <div class="ownerinfo">
          <h6>Share Commericals for your Property</h6>
          <small>
            {this.state.contract === "forsell" ? (
              <form>
                <TextField
                  id="standard-name"
                  label="Cost"
                  value={this.state.sellprice}
                  onChange={this.handleChange("sellprice")}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="Maintenance Charges (Optional)"
                  value={this.state.maintenancecharge}
                  onChange={this.handleChange("maintenancecharge")}
                  margin="normal"
                />
              </form>
            ) : (
              <div>
                <form>
                  <TextField
                    id="standard-name"
                    label="Monthly Rent"
                    value={this.state.monthlyrent}
                    onChange={this.handleChange("monthlyrent")}
                    margin="normal"
                  />
                  <TextField
                    id="standard-name"
                    label="Maintenance Charges (Optional)"
                    value={this.state.maintenancecharge}
                    onChange={this.handleChange("maintenancecharge")}
                    margin="normal"
                  />
                </form>
                <form>
                  <TextField
                    id="standard-name"
                    label="Security Deposit"
                    value={this.state.securitydeposit}
                    onChange={this.handleChange("securitydeposit")}
                    margin="normal"
                  />
                </form>
              </div>
            )}
          </small>
        </div>
        <div class="package-button">
          <button
            type="button"
            class="btn btn-success float-right package-button"
          >
            Select Advertisement Package
          </button>
        </div>
      </div>
    );
  }
}
