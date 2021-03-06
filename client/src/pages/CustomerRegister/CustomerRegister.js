import React, { Component } from "react";
import withRouter from "react-router-dom/withRouter";
import "./CustomerRegister.css";

import Card from "../../components/layout/Card/Card";
import List from "../../components/layout/List/List";
import Header from "../../components/layout/Header/Header";

import Input from "../../components/actionable/Input/Input";
import Button from "../../components/actionable/Button/Button";

import UserService from "../../services/user.service";

class CustomerRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: null,
        email: null,
        phone: null,
        password: null,
        confirmPassword: null
      }
    };
  }

  registerUser = async () => {
    if (this.state.user.password !== this.state.user.confirmPassword) {
      this.props.alert({ error: true, message: "Las contraseñas no coinciden." })
    } else {
      try {
        await UserService.create(this.state.user);
        this.props.alert({ error: false, message: "Usuario registrado con éxito." });
        this.props.history.push("/login");
      } catch (err) {
        this.props.alert({ error: true, message: err.display });
      }
    }
  };

  updateValue = async value => {
    await this.setState({ user: { ...this.state.user, ...value } });
  };

  render() {
    return (
      <div className="CustomerRegister">
        <Header title={"Registro de Cliente"} />
        <Card width={360}>
          <h3>Completa la Siguiente Forma</h3>
          <form name={"register"}>
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
                pattern={"email"}
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
                placeholder={"Contraseña"}
                onChange={value => this.updateValue({ password: value })}
                pattern={"password"}
              />
              <Input
                type={"password"}
                name={"Confirmar Contraseña"}
                placeholder={"Confirmar Contraseña"}
                onChange={value => this.updateValue({ confirmPassword: value })}
                pattern={"password"}
              />
            </List>
          </form>
          <Button onClick={this.registerUser}>Registrarme</Button>
        </Card>
      </div>
    );
  }
}

export default withRouter(CustomerRegister);
