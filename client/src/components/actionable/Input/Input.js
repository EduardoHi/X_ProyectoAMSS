import React, { Component } from "react";
import "./Input.css";
import { Link } from "react-router-dom";

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  onChange = async event => {
    await this.setState({ value: event.target.value });
    this.props.onChange(this.state.value);
  };

  render() {
    let textFields =
      this.props.link && this.props.linkName ? (
        <div>
          <p>{this.props.name}</p>
          <Link to={this.props.link}>{this.props.linkName}</Link>
        </div>
      ) : (
          <div>
            <p>{this.props.name}</p>
          </div>
        );
    return (
      <div className="Input">
        <input
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={this.onChange}
          pattern={patterns[this.props.pattern]}
        />
        {textFields}
      </div>
    );
  }
}

const patterns = {
  email: "^([a-zA-Z0-9 _-.]+)@([a-zA-Z0-9_-.]+).([a-zA-Z]{2,5})",
  password: ".{6,}",
  anything: ".",
}
