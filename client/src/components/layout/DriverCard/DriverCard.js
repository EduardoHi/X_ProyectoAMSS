import React, { Component } from "react";
import "./DriverCard.css";

import List from "../List/List";
import Grid from "../Grid/Grid";
import Input from "../../actionable/Input/Input";
import Card from "../Card/Card";
import FilePicker from "../../actionable/FilePicker/FilePicker";

export default class DriverCard extends Component {
  generatePermits = () => {
    return (
      <List>
        <h4 className="SubHeader">Permisos</h4>
        <Card altCard={true}>
          <List>
            <FilePicker name={"INE / IFE"} />
            <FilePicker name={"Licencia de Conducir"} />
            <FilePicker name={"Acta de Nacimiento"} />
          </List>
        </Card>
      </List>
    );
  };

  generateWatchView = () => {
    const {
      name,
      email,
      phone,
      address,
      taxiBrand,
      taxiModel,
      taxiLicensePlate,
      taxiNumber
    } = this.props.driver;
    const permits = this.generatePermits();
    return (
      <div>
        <h3>{name}</h3>
        <Grid gapSize={12}>
          <List>
            <h4 className="SubHeader">Información General</h4>
            <p>Correo Electrónico: {email}</p>
            <p>Teléfono: {phone}</p>
          </List>
          {permits}
        </Grid>
        <h4 className="SubHeader">Ubicación</h4>
        <p>Dirección: {address}</p>
        <h4 className="SubHeader">Automóvil</h4>
        <Grid>
          <List>
            <p>Marca: {taxiBrand}</p>
            <p>Modelo: {taxiModel}</p>
          </List>
          <List>
            <p>Placas: {taxiLicensePlate}</p>
            <p>Número: {taxiNumber}</p>
          </List>
        </Grid>
      </div>
    );
  };

  generateEditView = () => {
    const {
      name,
      email,
      phone,
      address,
      taxiBrand,
      taxiModel,
      taxiLicensePlate,
      taxiNumber
    } = this.props.driver;
    const permits = this.generatePermits();

    return (
      <div>
        <Input
          type={"text"}
          name={"Nombre"}
          placeholder={"John Doe"}
          value={name}
          onChange={value => this.props.updateValue({ name: value })}
        />
        <Grid>
          <List>
            <h4 className="SubHeader">Información General</h4>
            <Input
              type={"email"}
              name={"Correo Electrónico"}
              placeholder={"ejemplo@ejemplo.com"}
              value={email}
              onChange={value => this.props.updateValue({ email: value })}
            />
            <Input
              type={"number"}
              name={"Teléfono"}
              placeholder={"123-456-7890"}
              value={phone}
              onChange={value => this.props.updateValue({ phone: value })}
            />
          </List>
          {permits}
        </Grid>
        <h4 className="SubHeader">Dirección</h4>
        <Input
          type={"text"}
          name={"Dirección"}
          placeholder={"Av. Garza Sada"}
          value={address}
          onChange={value => this.props.updateValue({ address: value })}
        />
        <h4 className="SubHeader">Automóvil</h4>
        <Grid>
          <List>
            <Input
              type={"text"}
              name={"Marca"}
              placeholder={"Nissan"}
              value={taxiBrand}
              onChange={value => this.props.updateValue({ taxiBrand: value })}
            />
            <Input
              type={"text"}
              name={"Modelo"}
              placeholder={"Nissan"}
              value={taxiModel}
              onChange={value => this.props.updateValue({ taxiModel: value })}
            />
          </List>
          <List>
            <Input
              type={"text"}
              name={"Placas"}
              placeholder={"THY-4532"}
              value={taxiLicensePlate}
              onChange={value =>
                this.props.updateValue({ taxiLicensePlate: value })
              }
            />
            <Input
              type={"number"}
              name={"Número"}
              placeholder={"1234"}
              value={taxiNumber}
              onChange={value => this.props.updateValue({ taxiNumber: value })}
            />
          </List>
        </Grid>
      </div>
    );
  };

  renderView = () => {
    if (this.props.editing) return this.generateEditView();
    else return this.generateWatchView();
  };

  render() {
    const view = this.renderView();
    return (
      <Card width={700}>
        <Grid firstColumnWidth={80}>
          <div className="CustomerProfileImageContainer">
            <img />
          </div>
          <div>{view}</div>
        </Grid>
      </Card>
    );
  }
}
