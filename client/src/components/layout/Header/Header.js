import React from "react";
import "./Header.css";
import BackButton from "../../actionable/BackButton/BackButton";
import Logo from "../Logo/Logo";

function Header(props) {
  return (
    <div className="Header">
      <BackButton />
      <Logo />
      <h2>{props.title}</h2>
    </div>
  );
}

export default Header;
