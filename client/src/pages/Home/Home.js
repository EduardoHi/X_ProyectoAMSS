import React, { Component } from "react";
import withRouter from "react-router-dom/withRouter";
import "./Home.css";
import ServiceUtils from "../../lib/ServiceUtils";

class Home extends Component {
  async componentWillMount() {
    const authenticated = await ServiceUtils.authenticateAdmin();
    if (!authenticated) this.props.history.push("/login");
  }

  render() {
    return (
      <div className="Home">
        <div className="Nav" />
        <div className="MainContainer" />
      </div>
    );
  }
}

export default withRouter(Home);
