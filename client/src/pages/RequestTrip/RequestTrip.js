import React, { Component } from "react";
import withRouter from "react-router-dom/withRouter";
import "./RequestTrip.css";

import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import TripService from "../../services/trip.service";

import Map from "../../components/actionable/Map/Map";
import Button from "../../components/actionable/Button/Button";
import Input from "../../components/actionable/Input/Input";
import Select from "../../components/actionable/Select/Select";

import List from "../../components/layout/List/List";
import Grid from "../../components/layout/Grid/Grid";
import Card from "../../components/layout/Card/Card";
import Title from "../../components/layout/Title/Title";

class RequestTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: {
        originLat: null,
        originLng: null,
        destinationLat: 25.6876154,
        destinationLng: -100.325244,
        date: Date.now(),
        day: null,
        hour: null
      },
      centrales: [
        {
          name: "Transpais Central Monterrey",
          lat: 25.6876154,
          lng: -100.325244
        },
        {
          name: "Transpais Monterrey South Terminal",
          lat: 25.6727724,
          lng: -100.3262975
        }
      ]
    };
  }

  async componentDidMount() {
    this.props.loading(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        this.setState({
          trip: {
            ...this.state.trip,
            originLat: coords.latitude,
            originLng: coords.longitude
          }
        });
        this.props.loading(false);
      },
      err => console.log(err)
    );
  }

  changeDestination = value => {
    const central = this.state.centrales.find(cent => cent.name === value);
    this.setState({
      trip: {
        ...this.state.trip,
        destinationLat: central.lat,
        destinationLng: central.lng
      }
    });
  };

  handleDayClick = day => {
    this.setState({ trip: { ...this.state.trip, day: day } });
  };

  changeHour = hour => {
    this.setState({ trip: { ...this.state.trip, hour: hour } });
  };

  sendRequest = async () => {
    const { day, hour } = this.state.trip;
    const [hours, minutes] = hour.split(":");
    const date = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      hours,
      minutes
    );
    this.setState({ trip: { ...this.state.trip, date } });
    try {
      await TripService.request(this.state.trip);
      this.props.alert({
        error: false,
        message: "Se ha enviado la solicitud exitosamente."
      });
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    }
  };

  render() {
    const {
      originLat,
      originLng,
      destinationLat,
      destinationLng
    } = this.state.trip;
    const origin =
      originLat && originLng ? { lat: originLat, lng: originLng } : null;
    const destination =
      destinationLat && destinationLng
        ? { lat: destinationLat, lng: destinationLng }
        : null;
    const map = origin ? (
      <Map origin={origin} destination={destination} center={origin} />
    ) : (
      <></>
    );

    return (
      <div className="RequestTrip">
        <Title>Solicitar Viaje</Title>
        <List>
          <Card width={700}>{map}</Card>
          <Grid>
            <Card>
              <p>Origen: Ubicación Actual</p>
              <Select
                title={"Destino"}
                values={this.state.centrales}
                onChange={value => this.changeDestination(value)}
              />
            </Card>
            <Card>
              <div>
                <DayPicker
                  onDayClick={this.handleDayClick}
                  selectedDays={this.state.trip.day}
                />
              </div>
              <Input
                type={"text"}
                name={"Hora"}
                placeholder={"2:00"}
                pattern={"hour"}
                linkName={"Formato 24hrs"}
                onChange={value => this.changeHour(value)}
              />
            </Card>
          </Grid>
          <Button onClick={this.sendRequest}>Enviar Solicitud</Button>
        </List>
      </div>
    );
  }
}

export default withRouter(RequestTrip);
