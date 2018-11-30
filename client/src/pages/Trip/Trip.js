import React, { Component } from "react";
import withRouter from "react-router-dom/withRouter";
import "./Trip.css";

import TripService from "../../services/trip.service";

import Title from "../../components/layout/Title/Title";
import List from "../../components/layout/List/List";
import Card from "../../components/layout/Card/Card";

import Button from "../../components/actionable/Button/Button";
import DeleteButton from "../../components/actionable/DeleteButton/DeleteButton";
import Input from "../../components/actionable/Input/Input";
import Map from "../../components/actionable/Map/Map";

class Trip extends Component {
  constructor(props) {
    super(props);
    const tripId = props.match.params.tripId;
    const type = props.match.params.type;
    this.state = {
      trip: {
        user: {
          name: ""
        }
      },
      type: type,
      tripId: tripId,
      origin: null,
      destination: null
    };
  }

  componentDidMount = async () => {
    try {
      this.props.loading(true);
      const trip = await TripService.get(this.state.tripId);
      this.setState({ ...this.state, trip });
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    } finally {
      this.props.loading(false);
    }
  };

  handleOnChange = data => {
    this.setState({
      ...data
    });
  };

  updateTrip = async newStatus => {
    const trip = { ...this.state.trip, status: newStatus };
    try {
      await TripService.update(trip.id, trip);
      this.props.history.goBack();
    } catch (err) {
    } finally {
    }
  };

  renderMap = () => {
    if (!this.state.trip.id) {
      return <></>;
    }

    const {
      originLat,
      originLng,
      destinationLat,
      destinationLng
    } = this.state.trip;

    return (
      <Map
        center={{ lat: originLat, lng: originLng }}
        origin={{ lat: originLat, lng: originLng }}
        destination={{ lat: destinationLat, lng: destinationLng }}
        searchedOriginAddress={originAddress =>
          this.handleOnChange({ origin: originAddress })
        }
        searchedDestinationAddress={destinationAddress =>
          this.handleOnChange({ destination: destinationAddress })
        }
      />
    );
  };

  renderPeopleData = () => {
    if (this.state.type == "accepted-customer") {
      return (
        <Input
          type={"text"}
          name={"Nombre"}
          placeholder={"Conductor"}
          value={this.state.trip.driver.name}
          disabled={true}
        />
      );
    }
    return (
      <Input
        type={"text"}
        name={"Nombre"}
        placeholder={"Cliente"}
        value={this.state.trip.user.name}
        disabled={true}
      />
    );
  };

  renderInputs = () => {
    if (this.state.trip.id && this.state.origin && this.state.destination) {
      const peopleData = this.renderPeopleData();
      return (
        <List>
          {peopleData}
          <Input
            type={"text"}
            name={"Origen"}
            placeholder={"Dirección"}
            value={this.state.origin}
            disabled={true}
          />
          <Input
            type={"text"}
            name={"Destino"}
            placeholder={"Dirección"}
            value={this.state.destination}
            disabled={true}
          />
          <Input
            type={"text"}
            name={"Fecha"}
            placeholder={"12:00"}
            value={this.state.trip.date}
            disabled={true}
          />
        </List>
      );
    }
    return <></>;
  };

  renderButton = () => {
    const { status } = this.state.trip;
    if (this.state.type === "accepted-customer") {
      if (status === "accepted") {
        return (
          <div className="BottomButtons">
            <DeleteButton onClick={() => this.updateTrip("canceled")} />
          </div>
        );
      } else {
        return <></>;
      }
    } else if (status === "accepted") {
      return (
        <div className="BottomButtons">
          <DeleteButton onClick={() => this.updateTrip("canceled")} />
          <Button
            style={{ width: "auto" }}
            onClick={() => this.updateTrip("started")}
          >
            Iniciar
          </Button>
        </div>
      );
    } else if (status === "started") {
      return (
        <div className="BottomButtons" style={{ flexDirection: "row-reverse" }}>
          <Button
            style={{ width: "auto" }}
            onClick={() => this.updateTrip("finished")}
          >
            Terminar
          </Button>
        </div>
      );
    }
    return <></>;
  };

  render() {
    const map = this.renderMap();
    const data = this.renderInputs();
    const buttons = this.renderButton();
    return (
      <div className="Trip">
        <Title withBackButton={true}>Viaje</Title>
        <List>
          <Card width={700} height={300}>
            {map}
          </Card>
          <Card>{data}</Card>
          {buttons}
        </List>
      </div>
    );
  }
}

export default withRouter(Trip);
