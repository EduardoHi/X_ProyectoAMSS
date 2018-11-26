import React, { Component } from "react";
import mapStyle from "./MapStyle";
import "./Map.css";

import Config from "../../../lib/config";

import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const CoreMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      Config.googleMapsKey
    }&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: props.center.lat, lng: props.center.lng }}
  >
    {props.markers &&
      props.markers.map((loc, i) => {
        if (i === 0)
          return (
            <Marker
              key={i}
              position={{ lat: loc.lat, lng: loc.lng }}
              label={"Origen"}
            />
          );
        return (
          <Marker
            key={i}
            position={{ lat: loc.lat, lng: loc.lng }}
            label={"Destino"}
          />
        );
      })}
  </GoogleMap>
));

export default function Map(props) {
  let locations = [];
  if (props.origin) locations = [...locations, props.origin];
  if (props.destination) locations = [...locations, props.destination];
  return <CoreMap markers={locations} center={props.center} />;
}
