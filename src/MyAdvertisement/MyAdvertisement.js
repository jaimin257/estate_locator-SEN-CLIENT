import React, { Component } from "react";
import RenderToLayer from "material-ui/internal/RenderToLayer";
import "font-awesome/css/font-awesome.min.css";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardHeader,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import Table from "react-bootstrap/Table";
import Avatar from "react-avatar";
import "./MyAdvertisement.css";

const color = ["red", "green", "purple", "cyan", "teal", "blue"];
const getcolor = () => {
  return color[Math.floor(Math.random() * 8)];
};

export class MyAdvertisement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchresults: [
        {
          pname: "mahin",
          location: "B/7 Shrama safalya society,nr tana appartment, ellorapark",
          city: "hello",
          budget: "100",
          more: "ok"
        },
        {
          pname: "mahinaa",
          location: "gra",
          city: "heo",
          budget: "100",
          more: "ok"
        },
        {
          pname: "mahin",
          location: "agra",
          city: "hello",
          budget: "100",
          more: "ok"
        },
        {
          pname: "mahin",
          location: "agra",
          city: "hello",
          budget: "100",
          more: "ok"
        },
        {
          pname: "mahin",
          location: "agra",
          city: "hello",
          budget: "100",
          more: "ok"
        },
        {
          pname: "mahin",
          location: "agra",
          city: "hello",
          budget: "100",
          more: "ok"
        },
        {
          pname: "mahin",
          location: "agra",
          city: "hello",
          budget: "100",
          more: "ok"
        }
      ]
    };
  }

  render() {
    var center = {
      textAlign: "center"
    };
    const { searchresults } = this.state;
    const data = [{ name: "test1" }, { name: "test2" }];
    return (
      <div className="animated fadeIn">
        <Card
          style={{
            border: "none",
            backgroundImage:
              "url(" +
              "https://raw.githubusercontent.com/ayubSubhaniya/ssrs-client/master/src/images/w2.jpg" +
              ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            border: "none"
          }}
        >
          <CardHeader>
            <h4>
              <strong>
                <i className="fa fa-align-justify" /> Search Results
              </strong>
            </h4>
          </CardHeader>
        </Card>
        <div>
          <div class="allsearch">
            {searchresults.map(d => (
              <Card style={{ border: "none" }}>
                <div className="fif">
                  <div id="avatar_position" className="image">
                    <Avatar color={getcolor()} round={false} size={80} />
                    <div className="name-style">
                      {/*userInfo.user_first_name*/}{" "}
                      {/*userInfo.user_last_name*/}
                    </div>
                  </div>
                  <div className="properties">
                    <div>
                      <strong> Property Name : </strong>
                      {d.pname}
                    </div>
                    <div>
                      <strong>Price :</strong> ₹{" "}
                      <span className="price">{d.budget}</span>{" "}
                    </div>
                    <div>
                      <td>
                        {" "}
                        <strong>Address : </strong>
                        {d.location}
                        {"  "}
                      </td>
                    </div>
                    <div className="buttons">
                      <div>
                        <button type="button" class="btn btn-primary">
                          <i
                            className="fa fa-trash"
                            style={{ textAlign: "center" }}
                          />
                          View More Details!!
                        </button>
                      </div>
                      <div className="delete">
                        <button type="button" class="btn btn-danger">
                          <i
                            className="fa fa-trash"
                            style={{ textAlign: "center" }}
                          />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
