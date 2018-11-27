import React from "react";
import "./TripCard.css";
import Card from "../Card/Card";
import Map from "../../actionable/Map/Map";

function TripCard(props) {
  const { originLat, originLng, destinationLat, destinationLng } = props.trip;
  return (
    <div className="TripCard" onClick={props.onClick}>
      <Card padding={8} borderRadius={8}>
        <div style={{ height: "100px" }}>
          <Map
            center={{ lat: originLat, lng: originLng }}
            origin={{ lat: originLat, lng: originLng }}
            destination={{ lat: destinationLat, lng: destinationLng }}
          />
        </div>
        <div className="UserInformation">
          <img src={props.trip.user.image} alt={""} />
          <p>{props.trip.user.name}</p>
        </div>
      </Card>
    </div>
  );
}

export default TripCard;
