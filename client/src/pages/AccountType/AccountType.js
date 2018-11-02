import React, { Component } from "react";
import "./AccountType.css";
import Card from "../../components/layout/Card/Card";
import Grid from "../../components/layout/Grid/Grid";
import Header from "../../components/layout/Header/Header";

class AccountType extends Component {
  render() {
    return (
      <div className="AccountType">
        <Header title={"Selecciona el Tipo de Cuenta"} />
        <Grid>
          <Card width={360}>
            <h3>Cliente</h3>
            <p>
              Pndakjs adsknjkas dansnd mdfsndf smdnf mn akjnsdkja dkjnsd
              nkdjaksjd askndjkas dnksjdnfksd nkjfsndf.
            </p>
          </Card>
          <Card width={360}>
            <h3>Conductor</h3>
          </Card>
        </Grid>
      </div>
    );
  }
}

export default AccountType;
