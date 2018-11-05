import React from "react";
import "./FilePicker.css";
import FileButton from "../FileButton/FileButton";

function FilePicker(props) {
  return (
    <div className="FilePicker">
      <label>{props.name}</label>
      <input
        type="file"
        id={props.name}
        style={{ width: "0px", height: "0px" }}
        onChange={event => console.log(event.target.files)}
      />
      <FileButton htmlFor={props.name} />
    </div>
  );
}

export default FilePicker;
