import React, { PureComponent } from "react";

export class Devs extends PureComponent {
  render() {
    const { image_url, name, designation, batch } = this.props;
    const {
      facebook_url,
      github_url,
      linkedin_url,
      googleplus_url
    } = this.props;

    return (
      <div className="col-lg-4 col-sm-3 text-center">
        <img
          className="rounded-circle img-fluid d-block mx-auto"
          src={image_url}
          alt=""
          style={{ width: "200px", height: "200px" }}
        />
        <h3 style={{ color: "#e50202", marginTop: "2%" }}>{name}</h3>
        <hr className="style14" />
        <p style={{ fontSize: "15px", fontStyle: "italic" }}>{designation}</p>
        <p style={{ fontSize: "16px" }}>Batch-{batch}</p>
        <hr className="style14" />
        <div className="wrapper">
          {facebook_url ? (
            <a target="_blank" rel="noopener noreferrer" href={facebook_url}>
              <i
                className="fa fa-3x fa-facebook-square"
                style={{ padding: "5px" }}
              />
            </a>
          ) : (
            <a />
          )}
          {github_url ? (
            <a target="_blank" rel="noopener noreferrer" href={github_url}>
              <i className="fa fa-3x fa-github" style={{ padding: "5px" }} />
            </a>
          ) : (
            <a />
          )}
          {linkedin_url ? (
            <a target="_blank" rel="noopener noreferrer" href={linkedin_url}>
              <i
                className="fa fa-3x fa-linkedin-square"
                style={{ padding: "5px" }}
              />
            </a>
          ) : (
            <a />
          )}
          {googleplus_url ? (
            <a target="_blank" rel="noopener noreferrer" href={googleplus_url}>
              <i
                className="fa fa-3x fa-google-plus"
                style={{ padding: "5px" }}
              />
            </a>
          ) : (
            <a />
          )}
        </div>
        <hr className="style14" />
      </div>
    );
  }
}

export default Devs;
