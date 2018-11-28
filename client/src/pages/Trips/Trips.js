import React, { Component } from "react";
import withRouter from "react-router-dom/withRouter";
import "./Trips.css";

import TripService from "../../services/trip.service";
import Title from "../../components/layout/Title/Title";
import Grid from "../../components/layout/Grid/Grid";
import TripCard from "../../components/layout/TripCard/TripCard";

class Trips extends Component {
  constructor(props) {
    super(props);
    const type = props.match.params.type;
    this.state = {
      trips: [],
      type,
      services: {
        requested: TripService.getAllRequest,
        "accepted-driver": TripService.getAllDriverAccepted,
        "accepted-customer": TripService.getAllCustomerAccepted
      }
    };
  }

  componentDidMount = async () => {
    try {
      this.props.loading(true);
      const trips = await this.state.services[this.state.type]();
      this.setState({ trips });
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    } finally {
      this.props.loading(false);
    }
  };

  nagivate = tripId => {
    switch (this.state.type) {
      case "requested":
        this.props.history.push(`${this.props.match.url}/assign/${tripId}`);
        break;
      default:
        this.props.history.push(`${this.props.match.url}/${tripId}`);
        break;
    }
  };

  renderGrid = () => {
    return this.state.trips.map((trip, i) => {
      return (
        <TripCard
          trip={trip}
          displayDriver={this.state.type === "accepted-customer"}
          key={i}
          onClick={() => this.nagivate(trip.id)}
        />
      );
    });
  };

  render() {
    const grid = this.renderGrid();
    return (
      <div className="Trips">
        <Title>{this.props.titles[this.state.type]}</Title>
        <Grid width={700}>{grid}</Grid>
      </div>
    );
  }
}

export default withRouter(Trips);
