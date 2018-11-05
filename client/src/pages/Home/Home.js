import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import withRouter from "react-router-dom/withRouter";
import "./Home.css";

import ServiceUtils from "../../lib/ServiceUtils";

import Nav from "../../components/layout/Nav/Nav";
import NavLink from "../../components/layout/Nav/Nav";
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
        { link: "/users", name: "Usuarios" },
        { link: "/drivers", name: "Conductores" }
      ],
      adminBottomPages: [
        { link: "/history", name: "Historial" },
        { link: "/configuration", name: "Configuración" }
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
          <Router>{/* Paginas aqui */}</Router>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
