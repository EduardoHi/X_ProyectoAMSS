import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login/Login";
import AccountType from "./pages/AccountType/AccountType";
import ClientRegister from "./pages/ClientRegister/ClientRegister";
import RecoverPassword from "./pages/RecoverPassword/RecoverPassword";
import DriverRegister from "./pages/DriverRegister/DriverRegister";

import Alert from "./components/utility/alert/Alert";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: {
        active: false,
        error: true,
        message: ""
      }
    };
  }

  displayAlert = ({ error, message }) => {
    this.setState({
      alert: {
        active: true,
        error: error,
        message: message
      }
    });

    setTimeout(() => {
      this.hideAlert();
    }, 4000);
  };

  hideAlert = () => {
    this.setState({
      alert: {
        active: false,
        error: true,
        message: ""
      }
    });
  };

  generateAlert = () => {
    if (!this.state.alert.active) return <></>;
    const alert = this.state.alert;
    return alert.error ? (
      <Alert error={alert.message} close={() => this.hideAlert()} />
    ) : (
      <Alert success={alert.message} close={() => this.hideAlert()} />
    );
  };

  render() {
    let alert = this.generateAlert();
    return (
      <div className="App">
        {alert}
        <Router>
          <div>
            <Route
              exact
              path="/login"
              render={() => <Login alert={data => this.displayAlert(data)} />}
            />
            <Route
              exact
              path="/account-type"
              render={() => (
                <AccountType alert={data => this.displayAlert(data)} />
              )}
            />
            <Route
              exact
              path="/client-register"
              render={() => (
                <ClientRegister alert={data => this.displayAlert(data)} />
              )}
            />
            <Route
              exact
              path="/driver-register"
              render={() => (
                <DriverRegister alert={data => this.displayAlert(data)} />
              )}
            />
            <Route
              exact
              path="/recover-password"
              render={() => (
                <RecoverPassword alert={data => this.displayAlert(data)} />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
