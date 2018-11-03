import React, { Component } from "react";
import "./DriverRegister.css";
import Card from "../../components/layout/Card/Card";
import List from "../../components/layout/List/List";
import Grid from "../../components/layout/Grid/Grid";
import Header from "../../components/layout/Header/Header";
import Input from "../../components/actionable/Input/Input";
import Button from "../../components/actionable/Button/Button";
import FilePicker from "../../components/actionable/FilePicker/FilePicker";
import DriverService from "../../services/driver.service";

class DriverRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driver: {
        name: null,
        email: null,
        phone: null,
        password: null,
        confirmPassword: null,
        // Permits
        taxiBrand: null,
        taxiModel: null,
        taxiLicensePlate: null,
        taxiNumber: null
      }
    };
  }

  registerDriver = async () => {
    try {
      await DriverService.create(this.state.driver);
      this.props.alert({ message: "Conductor registrado con éxito." });
      this.props.history.push("/login");
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    }
  };

  updateValue = async value => {
    await this.setState({ driver: { ...this.state.driver, ...value } });
  };

  render() {
    return (
      <div className="DriverRegister">
        <Header title={"Registro de Conductor"} />
        <Card width={720}>
          <h3>Completa la Siguiente Forma</h3>
          <Grid>
            <List>
              <Input
                type={"text"}
                name={"Nombre"}
                placeholder={"John Doe"}
                onChange={value => this.updateValue({ name: value })}
              />
              <Input
                type={"email"}
                name={"Correo Electrónico"}
                placeholder={"ejemplo@ejemplo.com"}
                onChange={value => this.updateValue({ email: value })}
              />
              <Input
                type={"number"}
                name={"Teléfono"}
                placeholder={"123-456-7890"}
                onChange={value => this.updateValue({ phone: value })}
              />
              <Input
                type={"password"}
                name={"Contraseña"}
                placeholder={"Shhhhh!"}
                onChange={value => this.updateValue({ password: value })}
              />
              <Input
                type={"password"}
                name={"Confirmar Contraseña"}
                placeholder={"Shhhhh!"}
                onChange={value => this.updateValue({ confirmPassword: value })}
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
              <Input
                type={"text"}
                name={"Marca"}
                placeholder={"Nissan"}
                onChange={value => this.updateValue({ taxiBrand: value })}
              />
              <Input
                type={"text"}
                name={"Modelo"}
                placeholder={"Versa"}
                onChange={value => this.updateValue({ taxiModel: value })}
              />
            </List>
            <List>
              <Input
                type={"text"}
                name={"Placas"}
                placeholder={"JTK-7198"}
                onChange={value =>
                  this.updateValue({ taxiLicensePlate: value })
                }
              />
              <Input
                type={"number"}
                name={"Número de Taxi"}
                placeholder={"1234"}
                onChange={value => this.updateValue({ taxiNumber: value })}
              />
            </List>
          </Grid>
          <Button onClick={this.registerDriver}>Registrarme</Button>
        </Card>
      </div>
    );
  }
}

export default DriverRegister;
