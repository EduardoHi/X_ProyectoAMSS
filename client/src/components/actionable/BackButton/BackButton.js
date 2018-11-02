import React from "react";
import "./BackButton.css";

function BackButton(props) {
  return (
    <button className="BackButton" {...props}>
      &lt;
    </button>
  );
}

export default BackButton;
