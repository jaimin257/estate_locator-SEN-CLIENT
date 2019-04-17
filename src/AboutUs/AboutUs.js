import React, { PureComponent } from "react";
import Devs from "./Devs";
import './aboutus.css';

const devs = new Array(7);
devs[0] = (
  <Devs
    name={"Hardik Chhatrala"}
    designation={"Back-End Developer"}
    image_url={require("./Hardik.jpg")}
    batch={"2016"}
    github_url={"https://github.com/bag-PacKer"}
    linkedin_url={"https://www.linkedin.com/in/hardik-chhatrala"}
  />
);
devs[1] = (
  <Devs
    name={"Jaimin Chaudhary"}
    designation={"Back-End Developer"}
    image_url={require("./Jaimin.jpg")}
    batch={"2016"}
    github_url={"https://github.com/jaimin257"}
    linkedin_url={
      "https://www.linkedin.com/in/jaiminkumar-chaudhari-a04616120/"
    }
  />
);

devs[2] = (
  <Devs
    name={"Nimesh Kalathiya"}
    designation={"Front-End Developer"}
    image_url={require("./Nimesh.jpg")}
    batch={"2016"}
    facebook_url={"https://www.facebook.com/Nimesh.Kalathiya.1"}
    github_url={"https://github.com/nimeshngk"}
    linkedin_url={
      "https://www.linkedin.com/in/nimesh-kalathiya-174934143/"
    }
  />
);

devs[3] = (
  <Devs
    name={"Mahin Agrawal"}
    designation={"Front-End Developer"}
    image_url={require("./Mahin.jpg")}
    batch={"2016"}
    facebook_url={"https://www.facebook.com/ayub.subhaniya"}
    github_url={"https://github.com/Agrawalmahin"}
    linkedin_url={
      "https://www.linkedin.com/in/jaiminkumar-chaudhari-a04616120/"
    }
  />
);

devs[4] = (
  <Devs
    name={"Kshitiz saren"}
    designation={"UI/UX Designer"}
    image_url={require("./Ks.jpeg")}
    batch={"2016"}
    facebook_url={"https://www.facebook.com/ayub.subhaniya"}
    github_url={"https://github.com/KshitizSareen"}
    linkedin_url={
      "https://www.linkedin.com/in/jaiminkumar-chaudhari-a04616120/"
    }
  />
);

devs[5] = (
  <Devs
    name={"Abhi Ratanaman"}
    designation={"App Developer"}
    image_url={require("./Hardik.jpg")}
    batch={"2016"}
    facebook_url={"https://www.facebook.com/ayub.subhaniya"}
    github_url={"https://github.com/ayubSubhaniya"}
    linkedin_url={
      "https://www.linkedin.com/in/jaiminkumar-chaudhari-a04616120/"
    }
  />
);

devs[6] = (
  <Devs
    name={"Abhignya Chamalchala"}
    designation={"Content Writer"}
    image_url={require("./Hardik.jpg")}
    batch={"2016"}
    facebook_url={"https://www.facebook.com/ayub.subhaniya"}
    github_url={"https://github.com/ayubSubhaniya"}
    linkedin_url={
      "https://www.linkedin.com/in/jaiminkumar-chaudhari-a04616120/"
    }
  />
);

function shuffle() {
  var ctr = devs.length,
    temp,
    index;
  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = devs[ctr];
    devs[ctr] = devs[index];
    devs[index] = temp;
  }
}

function ShowDevs() {
  return devs;
}

export class AboutUs extends PureComponent {
  componentWillMount() {
    shuffle();
  }

  goBack = () => {
    window.history.back();
  };

  render() {
    return (
      <div className="abouthome">
        <div>
          <h1 className="my-header deepshadow" style={{ textAlign: "center" }}>
            Group 32
            <br />
            <h2 className="my-header2">
              <span style={{ color: "red" }}>"</span>Software Engineering
              Project<span style={{ color: "red" }}>"</span>
            </h2>
          </h1>
        </div>
        <div
          className="row about-back"
          style={{ marginLeft: "0%", marginRight: "0%", paddingTop: "40px" }}
        >
          <ShowDevs />
        </div>
      </div>
    );
  }
}

export default AboutUs;
