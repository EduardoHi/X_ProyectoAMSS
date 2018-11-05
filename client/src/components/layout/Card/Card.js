import React from "react";
import "./Card.css";

function Card(props) {
  let style = props.width ? { width: props.width + "px" } : {};
  style = props.padding ? { ...style, padding: props.padding + "px" } : style;
  style = props.borderRadius
    ? { ...style, borderRadius: props.borderRadius + "px" }
    : style;
  return (
    <div className="Card" style={style}>
      {props.children}
    </div>
  );
}

export default Card;
