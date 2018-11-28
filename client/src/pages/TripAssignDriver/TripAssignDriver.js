import React, { Component } from "react";
import withRouter from "react-router-dom/withRouter";
import "./TripAssignDriver.css";

import TripService from "../../services/trip.service";
import Title from "../../components/layout/Title/Title";
import Grid from "../../components/layout/Grid/Grid";
import UserCard from "../../components/layout/UserCard/UserCard";

class TripAssignDriver extends Component {
  constructor(props) {
    super(props);
    const tripId = props.match.params.tripId;
    this.state = {
      trip: {
        driver: null
      },
      drivers: [],
      tripId
    };
  }

  componentDidMount = async () => {
    try {
      this.props.loading(true);
      const { trip, drivers } = await TripService.getTripWithDrivers(
        this.state.tripId
      );
      this.setState({ trip, drivers });
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    } finally {
      this.props.loading(false);
    }
  };

  assignDriver = async driver => {
    const trip = {
      ...this.state.trip,
      driver: driver,
      driverId: driver.id,
      status: "accepted"
    };
    try {
      this.props.loading(true);
      await TripService.update(trip.id, trip);
      this.props.alert({
        error: false,
        message: "Se asignó el conductor al viaje exitosamente."
      });
      this.props.history.goBack();
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    } finally {
      this.props.loading(false);
    }
  };

  renderGrid = () => {
    return this.state.drivers.map((driver, i) => {
      const { id, name, email, image } = driver;
      return (
        <UserCard
          key={id}
          name={name}
          email={email}
          image={image}
          onClick={() => this.assignDriver(driver)}
        />
      );
    });
  };

  render() {
    const grid = this.renderGrid();
    return (
      <div className="TripAssignDriver">
        <Title withBackButton={true}>Asignar Conductor a Viaje</Title>
        <Grid width={700}>{grid}</Grid>
      </div>
    );
  }
}

export default withRouter(TripAssignDriver);
