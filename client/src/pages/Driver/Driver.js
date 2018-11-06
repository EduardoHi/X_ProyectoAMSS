import React, { Component } from "react";
import withRouter from "react-router-dom/withRouter";
import "./Driver.css";

import Title from "../../components/layout/Title/Title";
import Button from "../../components/actionable/Button/Button";
import DeleteButton from "../../components/actionable/DeleteButton/DeleteButton";
import DriverService from "../../services/driver.service";
import DriverCard from "../../components/layout/DriverCard/DriverCard";

class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driver: {
        id: null,
        name: null,
        email: null,
        phone: null,
        address: null,
        taxiBrand: null,
        taxiModel: null,
        taxiLicensePlate: null,
        taxiNumber: null
      },
      editing: true
    };
    const driverId = props.match.params.driverId;
    if (driverId !== "new") {
      this.state = {
        driver: {
          id: driverId
        },
        editing: false
      };
    }
  }

  componentDidMount = async () => {
    if (this.state.driver.id) {
      await this.getDriver();
    }
  };

  getDriver = async () => {
    try {
      const driver = await DriverService.getById(this.state.driver.id);
      this.setState({ driver: driver });
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    }
  };

  createDriver = async () => {
    try {
      const { id, ...driver } = this.state.driver;
      await DriverService.adminCreate(driver);
      this.props.history.goBack();
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    }
  };

  updateDriver = async () => {
    try {
      const { id, ...driver } = this.state.driver;
      await DriverService.update(id, driver);
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    }
  };

  deleteDriver = async () => {
    try {
      await DriverService.delete(this.state.driver.id);
      this.props.history.goBack();
    } catch (err) {
      this.props.alert({ error: true, message: err.display });
    }
  };

  changeViewMode = async ({ update }) => {
    try {
      if (update && this.state.driver.id) {
        await this.updateDriver();
      } else if (update && !this.state.driver.id) {
        await this.createDriver();
      } else {
        await this.getDriver();
      }
      this.setState({ editing: !this.state.editing });
    } catch (err) {
      console.error(err);
    }
  };

  updateValue = value => {
    this.setState({
      driver: { ...this.state.driver, ...value }
    });
  };

  renderTitle = () => {
    const id = !!this.state.driver.id;
    const editing = this.state.editing;
    if (id && !editing)
      return (
        <Title
          withBackButton={true}
          buttonTitle={"Editar"}
          onClick={() => this.changeViewMode({})}
        >
          Conductor
        </Title>
      );
    else if (id && editing)
      return <Title withBackButton={true}>Conductor</Title>;
    else return <Title withBackButton={true}>Agregar Conductor</Title>;
  };

  renderBottomButtons = () => {
    const editing = this.state.editing;
    const id = this.state.driver.id;
    if (editing && id) {
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
    } else if (editing && !id) {
      return (
        <div className="BottomAcceptButton">
          <Button
            style={{ width: "auto", marginLeft: "12px" }}
            onClick={() => this.changeViewMode({ update: true })}
          >
            Aceptar
          </Button>
        </div>
      );
    } else {
      return (
        <div className="BottomDeleteButton">
          <DeleteButton onClick={() => this.deleteDriver()}>
            Aceptar
          </DeleteButton>
        </div>
      );
    }
  };

  render() {
    const title = this.renderTitle();
    const buttons = this.renderBottomButtons();

    return (
      <div className="Driver">
        {title}
        <DriverCard
          editing={this.state.editing}
          driver={this.state.driver}
          updateValue={data => this.updateValue(data)}
        />
        {buttons}
      </div>
    );
  }
}

export default withRouter(Driver);
