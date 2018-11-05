import React, { Component } from "react";
import withRouter from "react-router-dom/withRouter";
import "./Drivers.css";

import DriverService from "../../services/driver.service";
import Users from "../../components/layout/Users/Users";

class Drivers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drivers: []
    };
  }

  componentDidMount = async () => {
    try {
      const drivers = await DriverService.getAll();
      this.setState({ drivers: drivers });
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    }
  };

  render() {
    return (
      <div className="Drivers">
        <Users users={this.state.drivers} title={"Conductores"} />
      </div>
    );
  }
}

export default withRouter(Drivers);
