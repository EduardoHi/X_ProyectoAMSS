import React from "react";
import "./Select.css";
import Button from "../Button/Button";

function Select(props) {
  return (
    <div className="Select">
      <p>{props.title}</p>
      <select onChange={event => props.onChange(event.target.value)}>
        {props.values &&
          props.values.map((val, i) => <option>{val.name}</option>)}
      </select>
    </div>
  );
}

export default Select;
