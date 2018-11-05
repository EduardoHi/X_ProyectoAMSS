import React, { Component } from "react";
import withRouter from "react-router-dom/withRouter";
import "./Customers.css";

import UserService from "../../services/user.service";
import Users from "../../components/layout/Users/Users";

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: []
    };
  }

  componentDidMount = async () => {
    try {
      const customers = await UserService.getAll();
      this.setState({ customers: customers });
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    }
  };

  render() {
    return (
      <div className="Customers">
        <Users users={this.state.customers} title={"Usuarios"} />
      </div>
    );
  }
}

export default withRouter(Customers);
