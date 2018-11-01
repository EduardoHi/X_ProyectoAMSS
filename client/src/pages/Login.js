import React, { Component } from "react";
import "./Login.css";
import Button from "../components/actionable/Button/Button";
import Card from "../components/layout/Card/Card";
import List from "../components/layout/List/List";
import Input from "../components/actionable/Input/Input";
import { TodoService } from "../services/todo.service";
import Logo from "../components/layout/Logo/Logo";

class Login extends Component {
  // Web service example
  // async componentDidMount() {
  //   try {
  //     let todos = await TodoService.getAll();
  //     this.setState({
  //       todos: todos
  //     });
  //     console.log(this.state.todos);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

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
            />
            <Input
              type={"password"}
              name={"Contraseña"}
              placeholder={"Shhhh!"}
            />
          </List>
          <p>
            ¿Aún no tienes una cuenta? <a href="#">Registrate aquí</a>.
          </p>
          <Button>Entrar</Button>
        </Card>
      </div>
    );
  }
}

export default Login;
