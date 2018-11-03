import React from "react";
import "./FilePicker.css";
import FileButton from "../FileButton/FileButton";

function FilePicker(props) {
  return (
    <div className="FilePicker">
      <p>{props.name}</p>
      <FileButton />
    </div>
  );
}

export default FilePicker;
