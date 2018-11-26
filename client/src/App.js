import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login/Login";
import AccountType from "./pages/AccountType/AccountType";
import RecoverPassword from "./pages/RecoverPassword/RecoverPassword";
import DriverRegister from "./pages/DriverRegister/DriverRegister";

import { Alert, Loading } from "./components/utility";
import Home from "./pages/Home/Home";
import CustomerRegister from "./pages/CustomerRegister/CustomerRegister";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: {
        active: false,
        error: true,
        message: ""
      },
      loading: false
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

  toggleLoading = loading => {
    this.setState({ loading: loading });
  };

  render() {
    let alert = this.generateAlert();
    let loading = this.state.loading ? <Loading /> : <></>;
    return (
      <div className="App">
        {alert}
        {loading}
        <Router>
          <Switch>
            <Route
              exact
              path="/login"
              render={() => (
                <Login
                  alert={async data => this.displayAlert(data)}
                  loading={loading => this.toggleLoading(loading)}
                />
              )}
            />
            <Route
              exact
              path="/account-type"
              render={() => (
                <AccountType
                  alert={async data => this.displayAlert(data)}
                  loading={loading => this.toggleLoading(loading)}
                />
              )}
            />
            <Route
              exact
              path="/customer-register"
              render={() => (
                <CustomerRegister
                  alert={async data => this.displayAlert(data)}
                  loading={loading => this.toggleLoading(loading)}
                />
              )}
            />
            <Route
              exact
              path="/driver-register"
              render={() => (
                <DriverRegister
                  alert={async data => this.displayAlert(data)}
                  loading={loading => this.toggleLoading(loading)}
                />
              )}
            />
            <Route
              exact
              path="/recover-password"
              render={() => (
                <RecoverPassword
                  alert={async data => this.displayAlert(data)}
                  loading={loading => this.toggleLoading(loading)}
                />
              )}
            />
            <Route
              path="/app"
              render={() => (
                <Home
                  alert={async data => this.displayAlert(data)}
                  loading={loading => this.toggleLoading(loading)}
                />
              )}
            />
            <Route
              render={() => (
                <Login
                  alert={async data => this.displayAlert(data)}
                  loading={loading => this.toggleLoading(loading)}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
