import React, { Component } from "react";
import "./RecoverPassword.css";

import Card from "../../components/layout/Card/Card";
import Header from "../../components/layout/Header/Header";

import Input from "../../components/actionable/Input/Input";
import Button from "../../components/actionable/Button/Button";
import UserAuthService from "../../services/user.auth.service";

class RecoverPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      name: "J"
    }
  }

  recoverPassword = async () => {
    try {
      await UserAuthService.recoverPassword({ email: this.state.email });
      this.props.alert({ error: false, message: "Correo mandado con éxito." });
      this.props.history.push("/login");
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    }
  };

  updateValue = async value => {
    this.setState(value);
  };

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
          <Button onClick={this.recoverPassword}>Confirmar</Button>
        </Card>
      </div>
    );
  }
}

export default RecoverPassword;
