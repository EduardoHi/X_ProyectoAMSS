import React, { Component } from "react";
import withRouter from "react-router-dom/withRouter";
import "./Users.css";

import UserCard from "../UserCard/UserCard";
import Title from "../Title/Title";
import Grid from "../Grid/Grid";

class Users extends Component {
  navigateToUser = userId => {
    if (!userId) this.props.history.push(`${this.props.match.url}/new`);
    else this.props.history.push(`${this.props.match.url}/${userId}`);
  };

  renderUserCards = () => {
    return this.props.users.map(({ id, name, email, image }, i) => {
      return (
        <UserCard
          key={i}
          name={name}
          email={email}
          image={image}
          onClick={() => this.navigateToUser(id)}
        />
      );
    });
  };

  render() {
    const userCards = this.renderUserCards();
    return (
      <div className="Users">
        <Title buttonTitle={"Agregar +"} onClick={() => this.navigateToUser()}>
          {this.props.title}
        </Title>
        <Grid gapSize={12} width={700}>
          {userCards}
        </Grid>
      </div>
    );
  }
}

export default withRouter(Users);
