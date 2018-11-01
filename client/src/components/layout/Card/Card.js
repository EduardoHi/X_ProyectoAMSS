import React from "react";
import "./Card.css";

function Card(props) {
  const style = props.width ? { width: props.width + "px" } : {};
  return (
    <div className="Card" style={style}>
      {props.children}
    </div>
  );
}

export default Card;
