import React, { Component } from "react";
import Link from "react-router-dom/Link";
import withRouter from "react-router-dom/withRouter";

import "./Login.css";

import Button from "../../components/actionable/Button/Button";
import Input from "../../components/actionable/Input/Input";

import Card from "../../components/layout/Card/Card";
import List from "../../components/layout/List/List";
import Logo from "../../components/layout/Logo/Logo";
import UserAuthService from "../../services/user.auth.service";
import AdminAuthService from "../../services/admin.auth.service";

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

  adminLogin = async () => {
    try {
      await AdminAuthService.login(this.state.user);
      this.props.history.push("/app");
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    }
  };

  customerLogin = async () => {
    try {
      await UserAuthService.login(this.state.user);
      this.props.history.push("/app");
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    }
  };

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
          <Button onClick={this.adminLogin}>Entrar</Button>
        </Card>
      </div>
    );
  }
}

export default withRouter(Login);
