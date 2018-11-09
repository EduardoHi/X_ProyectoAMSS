import React, { Component } from "react";
import "./Grid.css";
export default class Grid extends Component {
  getColumns = () => {
    if (!this.props.columns) return {};
    let gridTemplateColumns = "";
    for (let i = 0; i < this.props.columns; i++) gridTemplateColumns += "1fr ";
    return gridTemplateColumns;
  };

  render() {
    const props = this.props;
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

    const columns = this.getColumns();
    style = { ...style, gridTemplateColumns: columns };
    return (
      <div className="Grid" style={style}>
        {props.children}
      </div>
    );
  }
}
