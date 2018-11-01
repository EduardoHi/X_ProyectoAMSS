import React from "react";
import "./Input.css";

function Input(props) {
  return (
    <div className="Input">
      <input type={props.type} placeholder={props.placeholder} />
      <div>
        <p>{props.name}</p>
      </div>
    </div>
  );
}

export default Input;
