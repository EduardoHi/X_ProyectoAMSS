import React from "react";

import "./DeleteButton.css";
import withRouter from "react-router-dom/withRouter";

function DeleteButton(props) {
  const { staticContext, ...rest } = props;
  return (
    <button className="DeleteButton" {...rest}>
      X
    </button>
  );
}

export default withRouter(DeleteButton);
