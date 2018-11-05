import React from "react";

import "./BackButton.css";
import withRouter from "react-router-dom/withRouter";

function BackButton(props) {
  const { staticContext, darkStyle, ...rest } = props;
  const style = darkStyle ? { background: "rgba(53, 92, 186, 0.5)" } : {};
  return (
    <button
      className="BackButton"
      {...rest}
      style={style}
      onClick={props.history.goBack}
    >
      &lt;
    </button>
  );
}

export default withRouter(BackButton);
