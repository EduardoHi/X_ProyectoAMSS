import React, { Component } from "react";
import "./RecoverPassword.css";
import { withRouter } from 'react-router-dom';

import Card from "../../components/layout/Card/Card";
import Header from "../../components/layout/Header/Header";

import Input from "../../components/actionable/Input/Input";
import Button from "../../components/actionable/Button/Button";
import UserAuthService from "../../services/user.auth.service";
import AdminAuthService from "../../services/admin.auth.service";
import DriverAuthService from "../../services/driver.auth.service";

class RecoverPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      type: this.props.match.params.type
    }
  }

  recoverAdminPassword = async () => {
    try {
      await AdminAuthService.recoverPassword({ email: this.state.email });
      this.props.alert({ error: false, message: "Correo mandado con éxito." });
      this.props.history.push("/login");
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    }
  };

  recoverUserPassword = async () => {
    try {
      await UserAuthService.recoverPassword({ email: this.state.email });
      this.props.alert({ error: false, message: "Correo mandado con éxito." });
      this.props.history.push("/login");
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    }
  };

  recoverDriverPassword = async () => {
    try {
      await DriverAuthService.recoverPassword({ email: this.state.email });
      this.props.alert({ error: false, message: "Correo mandado con éxito." });
      this.props.history.push("/login");
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    }
  }

  updateValue = async value => {
    this.setState(value);
  };

  getType = async () => {
    if (this.state.type == 'admin') {
      this.recoverAdminPassword();
    } else if (this.state.type == 'customer') {
      this.recoverUserPassword();
    } else if (this.state.type == 'driver') {
      this.recoverDriverPassword();
    }
  }

  render() {
    return (
      <div className="RecoverPassword">
        <Header title={"Reestablecer Contraseña"} />
        <Card width={360}>
          <h3>Completa la Siguiente Forma</h3>
          <Input
            type={"email"}
            name={"Correo Electrónico"}
            placeholder={"ejemplo@ejemplo.com"}
            onChange={value => this.updateValue({ email: value })}
          />
          <Button onClick={this.getType}>Confirmar</Button>
        </Card>
      </div>
    );
  }
}

export default withRouter(RecoverPassword);
