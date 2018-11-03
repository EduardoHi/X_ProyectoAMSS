import React, { Component } from "react";
import Link from "react-router-dom/Link";
import "./Login.css";

import Button from "../../components/actionable/Button/Button";
import Input from "../../components/actionable/Input/Input";

import Card from "../../components/layout/Card/Card";
import List from "../../components/layout/List/List";
import Logo from "../../components/layout/Logo/Logo";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: null,
        password: null
      }
    };
  }

  updateValue = value => {
    this.setState({
      user: { ...this.state.user, ...value }
    });
  };

  render() {
    return (
      <div className="Login">
        <Logo />
        <Card width={360}>
          <h3>Iniciar Sesión</h3>
          <List>
            <Input
              type={"email"}
              name={"Correo Electrónico"}
              placeholder={"ejemplo@ejemplo.com"}
              onChange={value => this.updateValue({ email: value })}
            />
            <Input
              type={"password"}
              name={"Contraseña"}
              placeholder={"Shhhh!"}
              link={"/recover-password"}
              linkName={"¿Olvidaste tu contraseña?"}
              onChange={value => this.updateValue({ password: value })}
            />
          </List>
          <p>
            ¿Aún no tienes una cuenta?{" "}
            <Link to="/account-type">Regístrate aquí</Link>.
          </p>
          <Button>Entrar</Button>
        </Card>
      </div>
    );
  }
}

export default Login;
