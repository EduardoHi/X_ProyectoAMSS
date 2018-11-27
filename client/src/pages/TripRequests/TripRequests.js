import React, { Component } from "react";
import withRouter from "react-router-dom/withRouter";
import "./TripRequests.css";

import TripService from "../../services/trip.service";
import Title from "../../components/layout/Title/Title";
import Grid from "../../components/layout/Grid/Grid";
import TripCard from "../../components/layout/TripCard/TripCard";

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

  navigateToAssignDriver = tripId => {
    this.props.history.push(`${this.props.match.url}/${tripId}`);
  };

  renderGrid = () => {
    return this.state.trips.map((trip, i) => {
      return (
        <TripCard
          trip={trip}
          key={i}
          onClick={() => this.navigateToAssignDriver(trip.id)}
        />
      );
    });
  };

  render() {
    const grid = this.renderGrid();
    return (
      <div className="TripRequests">
        <Title>Solicitudes de Viaje</Title>
        <Grid width={700}>{grid}</Grid>
      </div>
    );
  }
}

export default withRouter(TripRequests);
