import React, { Component } from "react";
import { Route } from "react-router-dom";
import withRouter from "react-router-dom/withRouter";
import "./Home.css";

import ServiceUtils from "../../lib/ServiceUtils";

import Nav from "../../components/layout/Nav/Nav";
import Customers from "../Customers/Customers";
import Drivers from "../Drivers/Drivers";
import Customer from "../Customer/Customer";
import Driver from "../Driver/Driver";
import Profile from "../Profile/Profile";
import Trips from "../Trips/Trips";
import Trip from "../Trip/Trip";
import RequestTrip from "../RequestTrip/RequestTrip";
import TripAssignDriver from "../TripAssignDriver/TripAssignDriver";

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
        {
          link: `${this.props.match.url}/trips`,
          name: "Solicitudes de Viaje",
          type: "requested"
        },
        { link: `${this.props.match.url}/history`, name: "Historial" },
        { link: `${this.props.match.url}/configuration`, name: "Configuración" }
      ],
      customerTopPages: [
        {
          link: `${this.props.match.url}/request-trip`,
          name: "Solicitar Viaje"
        },
        {
          link: `${this.props.match.url}/trips`,
          name: "Mis Viajes",
          type: "accepted-customer"
        }
      ],
      customerBottomPages: [
        {
          link: `${this.props.match.url}/trips`,
          name: "Historial",
          type: "history-customer"
        }
      ],
      driverTopPages: [
        {
          link: `${this.props.match.url}/trips`,
          name: "Mis Viajes",
          type: "accepted-driver"
        }
      ],
      driverBottomPages: [
        {
          link: `${this.props.match.url}/trips`,
          name: "Historial",
          type: "history-driver"
        }
      ]
    };
  }

  async componentWillMount() {
    try {
      const authenticated = await ServiceUtils.authenticateUser();
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
    const { type } = this.state.user;
    if (type === "admin")
      return {
        topPages: this.state.adminTopPages,
        bottomPages: this.state.adminBottomPages
      };
    else if (type === "customer")
      return {
        topPages: this.state.customerTopPages,
        bottomPages: this.state.customerBottomPages
      };
    else if (type === "driver")
      return {
        topPages: this.state.driverTopPages,
        bottomPages: this.state.driverBottomPages
      };
    else return { topPages: [], bottomPages: [] };
  };

  render() {
    let { topPages, bottomPages } = this.getPagesToDisplay();
    return (
      <div className="Home">
        <Nav
          user={this.state.user}
          topPages={topPages}
          bottomPages={bottomPages}
          logout={() => this.logout}
        />
        <div className="MainContainer">
          <div className="MainContainerMargin">
            <Route
              exact
              path={`${this.props.match.url}/profile`}
              render={() => (
                <Profile
                  alert={async data => this.props.alert(data)}
                  loading={loading => this.props.loading(loading)}
                />
              )}
            />
            <Route
              exact
              path={`${this.props.match.url}/customers`}
              render={() => (
                <Customers
                  alert={async data => this.props.alert(data)}
                  loading={loading => this.props.loading(loading)}
                />
              )}
            />
            <Route
              path={`${this.props.match.url}/customers/:customerId`}
              render={() => (
                <Customer
                  alert={async data => this.props.alert(data)}
                  loading={loading => this.props.loading(loading)}
                />
              )}
            />
            <Route
              exact
              path={`${this.props.match.url}/drivers`}
              render={() => (
                <Drivers
                  alert={async data => this.props.alert(data)}
                  loading={loading => this.props.loading(loading)}
                />
              )}
            />
            <Route
              exact
              path={`${this.props.match.url}/drivers/:driverId`}
              render={() => (
                <Driver
                  alert={async data => this.props.alert(data)}
                  loading={loading => this.props.loading(loading)}
                />
              )}
            />
            <Route
              exact
              path={`${this.props.match.url}/request-trip`}
              render={() => (
                <RequestTrip
                  alert={async data => this.props.alert(data)}
                  loading={loading => this.props.loading(loading)}
                />
              )}
            />
            <Route
              exact
              path={`${this.props.match.url}/trips/:type`}
              render={() => (
                <Trips
                  titles={{
                    requested: "Solicitudes de Viaje",
                    "accepted-customer": "Mis Viajes",
                    "accepted-driver": "Mis Viajes",
                    "history-customer": "Historial",
                    "history-driver": "Historial"
                  }}
                  alert={async data => this.props.alert(data)}
                  loading={loading => this.props.loading(loading)}
                />
              )}
            />
            <Route
              exact
              path={`${this.props.match.url}/trips/:type/:tripId/`}
              render={() => (
                <Trip
                  alert={async data => this.props.alert(data)}
                  loading={loading => this.props.loading(loading)}
                />
              )}
            />
            <Route
              path={`${this.props.match.url}/trips/:type/assign/:tripId`}
              render={() => (
                <TripAssignDriver
                  alert={async data => this.props.alert(data)}
                  loading={loading => this.props.loading(loading)}
                />
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
