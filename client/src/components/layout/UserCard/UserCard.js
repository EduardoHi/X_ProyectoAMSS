import React from "react";
import "./UserCard.css";
import Card from "../Card/Card";

function UserCard(props) {
  return (
    <div className="UserCard" onClick={props.onClick}>
      <Card padding={8} borderRadius={8}>
        <div className="UserCardLeft">
          <img src={props.image} alt={""} />
          <p>{props.name}</p>
        </div>
        <p>{props.email}</p>
      </Card>
    </div>
  );
}

export default UserCard;
