import React, { Component } from "react";
import "./Login.css";
import Button from "../components/Button/Button";
import PasswordInput from "../components/PasswordInput/PasswordInput";

class Login extends Component {
  render() {
    return (
      <div className="Login">
        Login
        <input placeholder="Correo electronico" />
        <PasswordInput />
        <Button>Registrarme</Button>
        <Button>Log in</Button>
      </div>
    );
  }
}

export default Login;
