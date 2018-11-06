import React, { Component } from "react";
import withRouter from "react-router-dom/withRouter";
import "./Customer.css";

import Title from "../../components/layout/Title/Title";

import UserService from "../../services/user.service";
import Button from "../../components/actionable/Button/Button";
import DeleteButton from "../../components/actionable/DeleteButton/DeleteButton";
import CustomerCard from "../../components/layout/CustomerCard/CustomerCard";

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {
        id: null,
        name: null,
        email: null,
        phone: null,
        address: null
      },
      editing: true
    };
    const customerId = props.match.params.customerId;
    if (customerId !== "new") {
      this.state = {
        customer: {
          id: customerId
        },
        editing: false
      };
    }
  }

  componentDidMount = async () => {
    if (this.state.customer.id) {
      await this.getCustomer();
    }
  };

  getCustomer = async () => {
    try {
      const customer = await UserService.getById(this.state.customer.id);
      this.setState({ customer: customer });
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    }
  };

  createCustomer = async () => {
    try {
      const { id, ...customer } = this.state.customer;
      await UserService.adminCreate(customer);
      this.props.history.goBack();
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    }
  };

  updateCustomer = async () => {
    try {
      const { id, ...customer } = this.state.customer;
      await UserService.update(id, customer);
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    }
  };

  deleteCustomer = async () => {
    try {
      await UserService.delete(this.state.customer.id);
      this.props.history.goBack();
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    }
  };

  changeViewMode = async ({ update }) => {
    try {
      if (update && this.state.customer.id) {
        await this.updateCustomer();
      } else if (update && !this.state.customer.id) {
        await this.createCustomer();
      } else {
        await this.getCustomer();
      }
      this.setState({ editing: !this.state.editing });
    } catch (err) {
      console.error(err);
    }
  };

  updateValue = value => {
    this.setState({
      customer: { ...this.state.customer, ...value }
    });
  };

  renderTitle = () => {
    const id = !!this.state.customer.id;
    const editing = this.state.editing;
    if (id && !editing)
      return (
        <Title
          withBackButton={true}
          buttonTitle={"Editar"}
          onClick={() => this.changeViewMode({})}
        >
          Usuario
        </Title>
      );
    else if (id && editing) return <Title withBackButton={true}>Usuario</Title>;
    else return <Title withBackButton={true}>Agregar Usuario</Title>;
  };

  renderBottomButtons = () => {
    const editing = this.state.editing;
    const id = this.state.customer.id;
    if (editing && id) {
      return (
        <div className="BottomAcceptButton">
          <Button
            style={{ width: "auto", marginLeft: "12px" }}
            onClick={() => this.changeViewMode({ update: true })}
          >
            Aceptar
          </Button>
          <Button
            style={{ width: "auto", background: "grey" }}
            onClick={() => this.changeViewMode({ update: false })}
          >
            Cancelar
          </Button>
        </div>
      );
    } else if (editing && !id) {
      return (
        <div className="BottomAcceptButton">
          <Button
            style={{ width: "auto", marginLeft: "12px" }}
            onClick={() => this.changeViewMode({ update: true })}
          >
            Aceptar
          </Button>
        </div>
      );
    } else {
      return (
        <div className="BottomDeleteButton">
          <DeleteButton onClick={() => this.deleteCustomer()}>
            Aceptar
          </DeleteButton>
        </div>
      );
    }
  };

  render() {
    const title = this.renderTitle();
    const buttons = this.renderBottomButtons();

    return (
      <div className="Customer">
        {title}
        <CustomerCard
          editing={this.state.editing}
          customer={this.state.customer}
          updateValue={data => this.updateValue(data)}
        />
        {buttons}
      </div>
    );
  }
}

export default withRouter(Customer);
