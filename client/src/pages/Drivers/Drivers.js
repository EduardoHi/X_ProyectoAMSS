import React, { Component } from "react";

import "./Drivers.css";
import Title from "../../components/layout/Title/Title";

class Drivers extends Component {
  render() {
    return (
      <div className="Drivers">
        <Title buttonTitle={"Agregar +"}>Conductores</Title>
      </div>
    );
  }
}

export default Drivers;
