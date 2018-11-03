import React, { Component } from "react";

import "./AccountType.css";
import Card from "../../components/layout/Card/Card";
import Grid from "../../components/layout/Grid/Grid";
import Header from "../../components/layout/Header/Header";
import BackButton from "../../components/actionable/BackButton/BackButton";
import Link from "react-router-dom/Link";

class AccountType extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="AccountType">
        <Header title={"Selecciona el Tipo de Cuenta"} />
        <Grid>
          <Link to="/client-register">
            <Card width={360}>
              <h3>Cliente</h3>
              <p>
                Pndakjs adsknjkas dansnd mdfsndf smdnf mn akjnsdkja dkjnsd
                nkdjaksjd askndjkas dnksjdnfksd nkjfsndf.
              </p>
            </Card>
          </Link>
          <Link to="driver-register">
            <Card width={360}>
              <h3>Conductor</h3>
              <p>
                Kjfn fkmdfdm fsmdnf smnf vjdsvj fnmdf jdf smdfv dmfnv dfmn
                jfbdmaodskjdmn sd fmansdf amsnd fnas dfbn.
              </p>
            </Card>
          </Link>
        </Grid>
      </div>
    );
  }
}

export default AccountType;
