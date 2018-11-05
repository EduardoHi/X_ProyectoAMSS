import React, { Component } from "react";
import withRouter from "react-router-dom/withRouter";
import "./Customers.css";

import Title from "../../components/layout/Title/Title";
import Grid from "../../components/layout/Grid/Grid";
import UserCard from "../../components/layout/UserCard/UserCard";

import UserService from "../../services/user.service";

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount = async () => {
    try {
      const users = await UserService.getAll();
      this.setState({ users: users });
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    }
  };

  navigateToCustomer = customerId => {
    if (!customerId) this.props.history.push(`${this.props.match.url}/new`);
    else this.props.history.push(`${this.props.match.url}/${customerId}`);
  };

  renderUserCards = () => {
    return this.state.users.map(({ id, name, email, image }, i) => {
      return (
        <UserCard
          key={i}
          name={name}
          email={email}
          image={image}
          onClick={() => this.navigateToCustomer(id)}
        />
      );
    });
  };

  render() {
    const userCards = this.renderUserCards();
    return (
      <div className="Customers">
        <Title
          buttonTitle={"Agregar +"}
          onClick={() => this.navigateToCustomer()}
        >
          Usuarios
        </Title>
        <Grid gapSize={12}>{userCards}</Grid>
      </div>
    );
  }
}

export default withRouter(Customers);
