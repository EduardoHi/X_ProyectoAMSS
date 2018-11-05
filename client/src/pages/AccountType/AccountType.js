import React, { Component } from "react";

import "./AccountType.css";
import Card from "../../components/layout/Card/Card";
import Grid from "../../components/layout/Grid/Grid";
import Header from "../../components/layout/Header/Header";
import Link from "react-router-dom/Link";

class AccountType extends Component {
  render() {
    return (
      <div className="AccountType">
        <Header title={"Selecciona el Tipo de Cuenta"} />
        <Grid>
          <Link to="/customer-register">
            <Card width={360}>
              <h3>Cliente</h3>
              <p>Pide tu viaje con la app de Transpais o en taquilla.</p>
            </Card>
          </Link>
          <Link to="driver-register">
            <Card width={360}>
              <h3>Conductor</h3>
              <p>Únete a Transpais como conductor.</p>
            </Card>
          </Link>
        </Grid>
      </div>
    );
  }
}

export default AccountType;
