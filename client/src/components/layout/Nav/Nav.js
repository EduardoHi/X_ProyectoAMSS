import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "react-router-dom/withRouter";

import localforage from "localforage";

import "./Nav.css";

import Logo from "../Logo/Logo";
import List from "../List/List";
import Button from "../../actionable/Button/Button";
import ServiceUtils from "../../../lib/ServiceUtils";

export function NavLink(props) {
  return (
    <div className="NavLink">
      <Link to={props.to}>{props.children}</Link>
    </div>
  );
}

class Nav extends Component {
  logout = async () => {
    try {
      await ServiceUtils.logout();
      this.props.history.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  renderPages = pages => {
    return pages.map((page, i) => {
      return (
        <NavLink key={i} to={page.link}>
          {page.name}
        </NavLink>
      );
    });
  };

  render() {
    let topPages = this.props.topPages ? (
      this.renderPages(this.props.topPages)
    ) : (
      <></>
    );

    let bottomPages = this.props.bottomPages ? (
      this.renderPages(this.props.bottomPages)
    ) : (
      <></>
    );

    return (
      <div className="Nav">
        <List>
          <Logo />
          {topPages}
          <div className="NavSpacer" />
          {bottomPages}
        </List>
        <div className="NavFooter">
          <NavLink to={"/profile"}>{this.props.user.data.name}</NavLink>
          <Button onClick={this.logout}>Cerrar Sesión</Button>
        </div>
      </div>
    );
  }
}

export default withRouter(Nav);
