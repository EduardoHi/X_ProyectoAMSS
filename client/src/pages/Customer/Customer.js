import React, { Component } from "react";
import withRouter from "react-router-dom/withRouter";
import "./Customer.css";

import Title from "../../components/layout/Title/Title";
import Grid from "../../components/layout/Grid/Grid";
import UserCard from "../../components/layout/UserCard/UserCard";

import UserService from "../../services/user.service";
import Card from "../../components/layout/Card/Card";

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {
        id: null
      }
    };
    const customerId = props.match.params.customerId;
    if (customerId !== "new") {
      this.state = {
        customer: {
          id: customerId
        }
      };
    }
  }

  componentDidMount = async () => {
    if (this.state.customer.id) {
      try {
        const customer = await UserService.getById(this.state.customer.id);
        this.setState({ customer: customer });
      } catch (err) {
        this.props.alert({ error: true, message: err.display });
      }
    }
  };

  render() {
    const title = !!this.state.customer.id ? (
      <Title withBackButton={true} buttonTitle={"Editar"} onClick={() => {}}>
        Usuario
      </Title>
    ) : (
      <Title withBackButton={true} onClick={() => {}}>
        Agregar Usuario
      </Title>
    );

    const { name, email, phone } = this.state.customer;
    return (
      <div className="Customer">
        {title}
        <Card width={400}>
          <h3>{name}</h3>
          <p>{email}</p>
          <p>{phone}</p>
        </Card>
      </div>
    );
  }
}

export default withRouter(Customer);
