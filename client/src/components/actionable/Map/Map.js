import React from "react";
import mapStyle from "./MapStyle";
import "./Map.css";

import Config from "../../../lib/config";

import { compose, withProps, lifecycle } from "recompose";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from "react-google-maps";

const CoreMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      Config.googleMapsKey
    }&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    calcRoute() {
      const DirectionsService = new window.google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin:
            this.props.markers && this.props.markers.length >= 1
              ? new window.google.maps.LatLng(
                  this.props.markers[0].lat,
                  this.props.markers[0].lng
                )
              : "",
          destination:
            this.props.markers && this.props.markers.length >= 2
              ? new window.google.maps.LatLng(
                  this.props.markers[1].lat,
                  this.props.markers[1].lng
                )
              : "",
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`, result);
            this.setState({
              directions: null
            });
          }
        }
      );
    },

    componentDidMount() {
      this.calcRoute();
    },
    componentDidUpdate(prevProps) {
      if (this.props.markers !== prevProps.markers) {
        this.calcRoute();
      }
      if (this.props.originAddress !== prevProps.originAddress) {
        const Geocoder = new window.google.maps.Geocoder();
        Geocoder.geocode(
          { address: this.props.originAddress },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              this.props.searchedAddress(result);
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
      }
    }
  })
)(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: props.center.lat, lng: props.center.lng }}
    defaultOptions={{
      styles: mapStyle,
      disableDefaultUI: true,
      gestureHandling: "none",
      clickableIcons: false
    }}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

export default function Map(props) {
  let locations = [];
  if (props.origin) locations = [...locations, props.origin];
  if (props.destination) locations = [...locations, props.destination];
  return (
    <CoreMap
      originAddress={props.originAddress}
      searchedAddress={address => props.searchedAddress(address)}
      markers={locations}
      center={props.center}
    />
  );
}
