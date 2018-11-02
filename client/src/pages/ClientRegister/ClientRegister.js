import React, { Component } from "react";
import "./ClientRegister.css";
import Card from "../../components/layout/Card/Card";
import List from "../../components/layout/List/List";
import Header from "../../components/layout/Header/Header";
import Input from "../../components/actionable/Input/Input";
import Button from "../../components/actionable/Button/Button";

class ClientRegister extends Component {
  render() {
    return (
      <div className="ClientRegister">
        <Header title={"Registro de Cliente"} />
        <Card width={360}>
          <h3>Completa la Siguiente Forma</h3>
          <List>
            <Input type={"text"} name={"Nombre"} placeholder={"John Doe"} />
            <Input
              type={"email"}
              name={"Correo Electrónico"}
              placeholder={"ejemplo@ejemplo.com"}
            />
            <Input
              type={"number"}
              name={"Teléfono"}
              placeholder={"123-456-7890"}
            />
            <Input
              type={"password"}
              name={"Contraseña"}
              placeholder={"Shhhhh!"}
            />
            <Input
              type={"password"}
              name={"Confirmar Contraseña"}
              placeholder={"Shhhhh!"}
            />
          </List>
          <Button>Registrarme</Button>
        </Card>
      </div>
    );
  }
}

export default ClientRegister;
