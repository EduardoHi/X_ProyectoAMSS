import React, { Component } from "react";
import "./Input.css";
import { Link } from "react-router-dom";

export default class Input extends Component {
  constructor(props) {
    super(props);
    if (props.value) {
      this.state = {
        value: props.value
      };
    } else {
      this.state = {
        value: ""
      };
    }
  }

  onChange = async event => {
    await this.setState({ value: event.target.value });
    this.props.onChange(this.state.value);
  };

  render() {
    let link;
    if (this.props.link && this.props.linkName) {
      link = <Link to={this.props.link}>{this.props.linkName}</Link>;
    } else if (!this.props.link && this.props.linkName) {
      link = <p>{this.props.linkName}</p>;
    }

    let textFields = this.props.linkName ? (
      <div>
        <p>{this.props.name}</p>
        {link}
      </div>
    ) : (
      <div>
        <p>{this.props.name}</p>
      </div>
    );
    return (
      <div className="Input">
        <input
          value={this.state.value}
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={this.onChange}
          pattern={patterns[this.props.pattern]}
          disabled={this.props.disabled}
        />
        {textFields}
      </div>
    );
  }
}

const patterns = {
  email: "^([a-zA-Z0-9 _-.]+)@([a-zA-Z0-9_-.]+).([a-zA-Z]{2,5})",
  hour: "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]",
  password: ".{6,}",
  anything: "."
};
