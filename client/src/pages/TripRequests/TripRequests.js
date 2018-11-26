import React, { Component } from "react";
import withRouter from "react-router-dom/withRouter";
import "./TripRequests.css";

import TripService from "../../services/trip.service";
import Users from "../../components/layout/Users/Users";
import Title from "../../components/layout/Title/Title";
import Grid from "../../components/layout/Grid/Grid";

class TripRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: []
    };
  }

  componentDidMount = async () => {
    try {
      this.props.loading(true);
      const trips = await TripService.getAllRequest();
      this.setState({ trips });
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    } finally {
      this.props.loading(false);
    }
  };

  render() {
    return (
      <div className="TripRequests">
        <Title>Solicitudes de Viaje</Title>
        <Grid width={700} />
      </div>
    );
  }
}

export default withRouter(TripRequests);
