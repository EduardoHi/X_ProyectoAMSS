import React, { Component } from "react";
import "./App.css";
import Login from "./pages/Login/Login";
import AccountType from "./pages/AccountType/AccountType";
import ClientRegister from "./pages/ClientRegister/ClientRegister";
import RecoverPassword from "./pages/RecoverPassword/RecoverPassword";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Login /> */}
        {/* <AccountType /> */}
        {/* <ClientRegister /> */}
        <RecoverPassword />
      </div>
    );
  }
}

export default App;
