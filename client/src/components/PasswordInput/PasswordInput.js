import React from "react";
import "./PasswordInput.css";
import Button from "../Button/Button";

function PasswordInput(props) {
  return (
    <div className="passwordInput">
      <input className="PasswordInput" placeholder="Contraseña" />
      <Button className="recoverButton">Olvidé mi Contraseña</Button>
    </div>
  );
}

export default PasswordInput;
