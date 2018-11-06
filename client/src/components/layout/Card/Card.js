import React from "react";
import "./Card.css";

function Card(props) {
  let style = props.width ? { width: props.width + "px" } : {};
  style = props.padding ? { ...style, padding: props.padding + "px" } : style;
  style = props.borderRadius
    ? { ...style, borderRadius: props.borderRadius + "px" }
    : style;

  // Atlernative Card
  style = props.altCard
    ? {
        ...style,
        padding: "12px",
        borderRadius: "8px",
        background: "lightgrey",
        boxShadow: "none"
      }
    : style;
  return (
    <div className="Card" style={style}>
      {props.children}
    </div>
  );
}

export default Card;
