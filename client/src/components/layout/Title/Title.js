import React from "react";
import "./Title.css";

import Button from "../../actionable/Button/Button";
import BackButton from "../../actionable/BackButton/BackButton";

function Title(props) {
  const backButtton = props.withBackButton ? (
    <BackButton darkStyle={true} />
  ) : (
    <></>
  );
  const actionButton = props.buttonTitle ? (
    <Button onClick={props.onClick}>{props.buttonTitle}</Button>
  ) : (
    <></>
  );

  return (
    <div className="Title">
      {backButtton}
      <h1>{props.children}</h1>
      {actionButton}
    </div>
  );
}

export default Title;
