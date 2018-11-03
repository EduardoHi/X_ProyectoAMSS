import React, { Component } from "react";
import withRouter from "react-router-dom/withRouter";
import "./Home.css";
import ServiceUtils from "../../lib/ServiceUtils";

class Home extends Component {
  async componentWillMount() {
    const authenticated = await ServiceUtils.authenticate();
    if (!authenticated) this.props.history.push("/login");
  }

  render() {
    return <div className="Home" />;
  }
}

export default withRouter(Home);
