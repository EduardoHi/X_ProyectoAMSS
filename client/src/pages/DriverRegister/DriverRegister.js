import React, { Component } from "react";
import "./DriverRegister.css";
import Card from "../../components/layout/Card/Card";
import List from "../../components/layout/List/List";
import Grid from "../../components/layout/Grid/Grid";
import Header from "../../components/layout/Header/Header";
import Input from "../../components/actionable/Input/Input";
import Button from "../../components/actionable/Button/Button";
import FilePicker from "../../components/actionable/FilePicker/FilePicker";

class DriverRegister extends Component {
  render() {
    return (
      <div className="DriverRegister">
        <Header title={"Registro de Conductor"} />
        <Card width={720}>
          <h3>Completa la Siguiente Forma</h3>
          <Grid>
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
            <div className="GreyCard">
              <h3>Permisos</h3>
              <List>
                <FilePicker name={"INE / IFE"} />
                <FilePicker name={"Licencia de Conducir"} />
                <FilePicker name={"Acta de Nacimiento"} />
                <p>
                  Debes subir un archivo PDF a cada uno de los permisos para
                  poder crear una cuenta de conductor.
                </p>
              </List>
            </div>
          </Grid>
          <h3>Datos del Automóvil</h3>
          <Grid>
            <List>
              <Input type={"text"} name={"Marca"} placeholder={"Nissan"} />
              <Input type={"text"} name={"Modelo"} placeholder={"Versa"} />
            </List>
            <List>
              <Input type={"text"} name={"Placas"} placeholder={"JTK-7198"} />
              <Input
                type={"number"}
                name={"Número de Taxi"}
                placeholder={"1234"}
              />
            </List>
          </Grid>
          <Button>Registrarme</Button>
        </Card>
      </div>
    );
  }
}

export default DriverRegister;
