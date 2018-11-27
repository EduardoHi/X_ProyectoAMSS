import React from "react";
import "./Select.css";

function Select(props) {
  return (
    <div className="Select">
      <p>{props.title}</p>
      <select
        onChange={event => props.onChange(event.target.value)}
        defaulvalue={{ lat: null, lng: null }}
      >
        <option value={{ lat: null, lng: null }}>Seleccionar</option>
        {props.values &&
          props.values.map((val, i) => <option key={i}>{val.name}</option>)}
      </select>
    </div>
  );
}

export default Select;
