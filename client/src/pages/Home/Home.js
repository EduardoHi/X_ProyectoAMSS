import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import withRouter from "react-router-dom/withRouter";
import "./Home.css";

import ServiceUtils from "../../lib/ServiceUtils";

import Nav from "../../components/layout/Nav/Nav";
import Customers from "../Customers/Customers";
import Drivers from "../Drivers/Drivers";
import Customer from "../Customer/Customer";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        data: {
          name: null
        },
        type: null
      },
      adminTopPages: [
        { link: `${this.props.match.url}/customers`, name: "Usuarios" },
        { link: `${this.props.match.url}/drivers`, name: "Conductores" }
      ],
      adminBottomPages: [
        { link: `${this.props.match.url}/history`, name: "Historial" },
        { link: `${this.props.match.url}/configuration`, name: "Configuración" }
      ]
    };
  }

  async componentWillMount() {
    try {
      const authenticated = await ServiceUtils.authenticateAdmin();
      if (!authenticated) {
        this.props.history.push("/login");
        return;
      }
      const userData = await ServiceUtils.getUser();
      this.setState({
        user: {
          data: userData.user,
          type: userData.userType
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  getPagesToDisplay = () => {
    if (this.state.user.type === "admin")
      return {
        topPages: this.state.adminTopPages,
        bottomPages: this.state.adminBottomPages
      };
    return { topPages: [], bottomPages: [] };
  };

  render() {
    let { topPages, bottomPages } = this.getPagesToDisplay();
    return (
      <div className="Home">
        <Nav
          user={this.state.user}
          topPages={topPages}
          bottomPages={bottomPages}
        />
        <div className="MainContainer">
          <div className="MainContainerMargin">
            <Route
              exact
              path={`${this.props.match.url}/customers`}
              render={() => (
                <Customers alert={async data => this.props.alert(data)} />
              )}
            />
            <Route
              path={`${this.props.match.url}/customers/:customerId`}
              render={() => (
                <Customer alert={async data => this.props.alert(data)} />
              )}
            />
            <Route
              exact
              path={`${this.props.match.url}/drivers`}
              render={() => (
                <Drivers alert={async data => this.props.alert(data)} />
              )}
            />
            {/* More routes */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
