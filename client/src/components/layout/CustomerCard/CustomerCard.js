import React, { Component } from "react";
import "./CustomerCard.css";
import List from "../List/List";
import Input from "../../actionable/Input/Input";
import Card from "../Card/Card";
import Grid from "../Grid/Grid";

export default class CustomerCard extends Component {
  generateWatchView = () => {
    const { name, email, phone, address } = this.props.customer;
    return (
      <List>
        <h3>{name}</h3>
        <div>
          <h4>Información General</h4>
          <p>Correo Electrónico: {email}</p>
          <p>Teléfono: {phone}</p>
        </div>
        <div>
          <h4>Ubicación</h4>
          <p>Dirección: {address}</p>
        </div>
      </List>
    );
  };

  generateEditView = () => {
    const { name, email, phone, address } = this.props.customer;
    return (
      <List>
        <Input
          type={"text"}
          name={"Nombre"}
          placeholder={"John Doe"}
          value={name}
          onChange={value => this.props.updateValue({ name: value })}
        />
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
        <h4 className="SubHeader">Dirección</h4>
        <Input
          type={"text"}
          name={"Dirección"}
          placeholder={"Av. Garza Sada"}
          value={address}
          onChange={value => this.props.updateValue({ address: value })}
        />
      </List>
    );
  };

  renderView = () => {
    if (this.props.editing) return this.generateEditView();
    else return this.generateWatchView();
  };

  render() {
    const view = this.renderView();
    return (
      <div className="CustomerCard">
        <Card width={400}>
          <Grid firstColumnWidth={80}>
            <div className="CustomerProfileImageContainer">
              <img />
            </div>
            <div>{view}</div>
          </Grid>
        </Card>
      </div>
    );
  }
}
