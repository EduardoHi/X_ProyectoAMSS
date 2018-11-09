import React, { Component } from "react";
import "./Checkbox.css";

export default class Checkbox extends Component {
  render() {
    return (
      <label className="container">
        {this.props.children}
        <input
          type="checkbox"
          checked={this.props.value}
          onChange={this.props.onChange}
        />
        <span className="checkmark" />
      </label>
    );
  }
}
