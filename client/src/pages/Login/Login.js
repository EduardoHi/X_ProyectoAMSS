import React, { Component } from "react";
import Link from "react-router-dom/Link";
import withRouter from "react-router-dom/withRouter";

import "./Login.css";

import Button from "../../components/actionable/Button/Button";
import Input from "../../components/actionable/Input/Input";

import Card from "../../components/layout/Card/Card";
import List from "../../components/layout/List/List";
import Grid from "../../components/layout/Grid/Grid";
import Logo from "../../components/layout/Logo/Logo";
import UserAuthService from "../../services/user.auth.service";
import AdminAuthService from "../../services/admin.auth.service";
import DriverAuthService from "../../services/driver.auth.service";
import Checkbox from "../../components/actionable/Checkbox/Checkbox";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: null,
        password: null
      },
      isCustomer: true,
      isDriver: false,
      isAdmin: false
    };
  }

  adminLogin = async () => {
    try {
      await AdminAuthService.login(this.state.user);
      this.props.history.push("/app/customers");
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

  driverLogin = async () => {
    try {
      await DriverAuthService.login(this.state.user);
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

  login = () => {
    const { isCustomer, isDriver, isAdmin } = this.state;
    if (isCustomer) this.customerLogin();
    else if (isDriver) this.driverLogin();
    else if (isAdmin) this.adminLogin();
  };

  updateUserType = async userType => {
    const { isCustomer, isDriver, isAdmin } = this.state;
    if (userType === "customer") {
      this.setState({
        isCustomer: !isCustomer,
        isDriver: false,
        isAdmin: false
      });
    } else if (userType === "admin") {
      this.setState({
        isCustomer: false,
        isDriver: false,
        isAdmin: !isAdmin
      });
    } else if (userType === "driver") {
      this.setState({
        isCustomer: false,
        isDriver: !isDriver,
        isAdmin: false
      });
    }
  };

  getCheckboxes = () => {
    const { isCustomer, isDriver, isAdmin } = this.state;
    return (
      <Grid gapSize={8} columns={3}>
        <Checkbox
          value={isCustomer}
          onChange={() => this.updateUserType("customer")}
        >
          Cliente
        </Checkbox>
        <Checkbox
          value={isDriver}
          onChange={() => this.updateUserType("driver")}
        >
          Conductor
        </Checkbox>
        <Checkbox value={isAdmin} onChange={() => this.updateUserType("admin")}>
          Administrador
        </Checkbox>
      </Grid>
    );
  };

  getUserType() {
    if (this.state.isAdmin)
      return 'admin';
    if (this.state.isCustomer)
      return 'customer';
    if (this.state.isDriver)
      return 'driver';
  }

  render() {
    const checkboxes = this.getCheckboxes();
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
              placeholder={"Contraseña"}
              link={`/recover-password/${this.getUserType()}`}
              linkName={"¿Olvidaste tu contraseña?"}
              onChange={value => this.updateValue({ password: value })}
            />
            {checkboxes}
          </List>
          <p>
            ¿Aún no tienes una cuenta?{" "}
            <Link to="/account-type">Regístrate aquí</Link>.
          </p>
          <Button onClick={this.login}>Entrar</Button>
        </Card>
      </div>
    );
  }
}

export default withRouter(Login);
