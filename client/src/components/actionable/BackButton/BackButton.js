import React from "react";

import "./BackButton.css";
import withRouter from "react-router-dom/withRouter";

function BackButton(props) {
  const { staticContext, ...rest } = props;
  return (
    <button className="BackButton" {...rest} onClick={props.history.goBack}>
      &lt;
    </button>
  );
}

export default withRouter(BackButton);
