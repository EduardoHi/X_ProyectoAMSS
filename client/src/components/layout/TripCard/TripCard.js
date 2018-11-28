import React, { Component } from "react";
import "./TripCard.css";
import Card from "../Card/Card";
import Map from "../../actionable/Map/Map";

class TripCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: "",
      destination: ""
    };
  }

  handleOnChange(value) {
    this.setState({ ...value });
  }

  renderUserInfo = () => {
    if (this.props.displayDriver) {
      return (
        <div className="UserInformation">
          <div>
            <img src={this.props.trip.driver.image} alt={""} />
          </div>
          <p>{this.props.trip.driver.name}</p>
        </div>
      );
    }
    return (
      <div className="UserInformation">
        <div>
          <img src={this.props.trip.user.image} alt={""} />
        </div>
        <p>{this.props.trip.user.name}</p>
      </div>
    );
  };

  render() {
    const {
      originLat,
      originLng,
      destinationLat,
      destinationLng,
      date,
      status
    } = this.props.trip;

    const userInfo = this.renderUserInfo();

    return (
      <div className="TripCard" onClick={this.props.onClick}>
        <Card padding={8} borderRadius={8}>
          <div style={{ height: "100px" }}>
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
          </div>
          {userInfo}
          <div className="TripInformation">
            <div>
              <p>Origen</p>
              <p>{this.state.origin}</p>
            </div>
            <div>
              <p>Destino</p>
              <p>{this.state.destination}</p>
            </div>
            <div>
              <p>Fecha</p>
              <p>{date}</p>
            </div>
          </div>
          {status === "started" ? (
            <p className="TripStarted">Viaje en Curso</p>
          ) : (
            <></>
          )}
        </Card>
      </div>
    );
  }
}

export default TripCard;
