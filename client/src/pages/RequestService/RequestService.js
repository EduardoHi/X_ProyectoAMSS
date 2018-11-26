import React, { Component } from "react";
import withRouter from "react-router-dom/withRouter";
import { List, Grid } from "../../components/layout";
import { Input } from "../../components/actionable";

class RequestService extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <List>
        <h4 className="SubHeader">Solicitar Servicio</h4>
        <div>MAPA</div>
        <Grid columns={3}>
          <Input placeholder="Origen" />
          <Input placeholder="Destino" />
        </Grid>
      </List>
    );
  }
}

export default withRouter(RequestService);
