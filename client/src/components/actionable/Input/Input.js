import React from "react";
import "./Input.css";
import { Link } from "react-router-dom";

function Input(props) {
  let textFields =
    props.link && props.linkName ? (
      <div>
        <p>{props.name}</p>
        <Link to={props.link}>{props.linkName}</Link>
      </div>
    ) : (
      <div>
        <p>{props.name}</p>
      </div>
    );
  return (
    <div className="Input">
      <input type={props.type} placeholder={props.placeholder} />
      {textFields}
    </div>
  );
}

export default Input;
