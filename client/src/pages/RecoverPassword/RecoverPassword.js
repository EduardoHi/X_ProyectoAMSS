import React, { Component } from "react";
import "./RecoverPassword.css";

import Card from "../../components/layout/Card/Card";
import Header from "../../components/layout/Header/Header";

import Input from "../../components/actionable/Input/Input";
import Button from "../../components/actionable/Button/Button";

class RecoverPassword extends Component {
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
          />
          <Button>Confirmar</Button>
        </Card>
      </div>
    );
  }
}

export default RecoverPassword;
