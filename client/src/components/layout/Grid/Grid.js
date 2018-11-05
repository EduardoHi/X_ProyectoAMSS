import React from "react";
import "./Grid.css";

function Grid(props) {
  let style = props.gapSize
    ? {
        gridColumnGap: `${props.gapSize}px`,
        gridRowGap: `${props.gapSize}px`
      }
    : {};
  style = props.firstColumnWidth
    ? { ...style, gridTemplateColumns: `${props.firstColumnWidth}px auto` }
    : style;
  style = props.width ? { ...style, width: `${props.width}px` } : style;
  return (
    <div className="Grid" style={style}>
      {props.children}
    </div>
  );
}

export default Grid;
