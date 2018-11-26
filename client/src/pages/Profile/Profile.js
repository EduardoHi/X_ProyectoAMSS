import React, { Component } from "react";
import withRouter from "react-router-dom/withRouter";
import "./Profile.css";

import Button from "../../components/actionable/Button/Button";
import Title from "../../components/layout/Title/Title";
import DriverCard from "../../components/layout/DriverCard/DriverCard";
import CustomerCard from "../../components/layout/CustomerCard/CustomerCard";

import DriverService from "../../services/driver.service";
import UserService from "../../services/user.service";
import AdminService from "../../services/admin.service";

import ServiceUtils from "../../lib/ServiceUtils";

class Profile extends Component {
  constructor(props) {
    super(props);
    const userId = props.match.params.userId;
    this.state = {
      user: {
        id: userId,
        name: null,
        email: null,
        phone: null,
        address: null,
        taxiBrand: null,
        taxiModel: null,
        taxiLicensePlate: null,
        taxiNumber: null
      },
      userType: "",
      editing: false
    };
  }

  componentDidMount = async () => {
    const { user, userType } = await ServiceUtils.getUser();
    this.setState({
      user,
      userType
    });
  };

  getUser = async () => {
    const { user } = await ServiceUtils.getUser();
    this.setState({
      user
    });
  };

  updateUser = async updateService => {
    try {
      const { id, ...user } = this.state.user;
      await updateService(id, user);
      await ServiceUtils.setUser(this.state.user);
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    }
  };

  webServices = {
    customer: UserService.update,
    driver: DriverService.update,
    admin: AdminService.update
  };

  changeViewMode = async ({ update }) => {
    try {
      if (update) {
        await this.updateUser(this.webServices[this.state.userType]);
      } else {
        await this.getUser();
      }
      this.setState({ editing: !this.state.editing });
    } catch (err) {
      console.error(err);
    }
  };

  updateValue = value => {
    this.setState({
      user: { ...this.state.user, ...value }
    });
  };

  renderTitle = () => {
    const editing = this.state.editing;
    if (!editing)
      return (
        <Title buttonTitle={"Editar"} onClick={() => this.changeViewMode({})}>
          Perfil
        </Title>
      );
    return <Title>Editar Perfil</Title>;
  };

  renderProfile = () => {
    const { user, editing } = this.state;
    if (this.state.userType === "driver") {
      return (
        <DriverCard
          editing={editing}
          driver={user}
          updateValue={data => this.updateValue(data)}
        />
      );
    }
    return (
      <CustomerCard
        editing={editing}
        customer={user}
        updateValue={data => this.updateValue(data)}
      />
    );
  };

  renderBottomButtons = () => {
    const editing = this.state.editing;
    if (editing) {
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
    }
    return <></>;
  };

  render() {
    const title = this.renderTitle();
    const profile = this.renderProfile();
    const buttons = this.renderBottomButtons();

    return (
      <div className="Profile">
        {title}
        {profile}
        {buttons}
      </div>
    );
  }
}

export default withRouter(Profile);
