import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import AccountType from "./pages/AccountType/AccountType";
import ClientRegister from "./pages/ClientRegister/ClientRegister";
import RecoverPassword from "./pages/RecoverPassword/RecoverPassword";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/login" component={Login} />
            <Route exact path="/account-type" component={AccountType} />
            <Route exact path="/client-register" component={ClientRegister} />
            <Route exact path="/recover-password" component={RecoverPassword} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
