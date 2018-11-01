import React from "react";
import "./List.css";

function List(props) {
  return <div className="List">{props.children}</div>;
}

export default List;
