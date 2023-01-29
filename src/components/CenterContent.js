import React from "react";
import "./centerContent.css";

const CenterContent = (props) => {
  return <div className="center-content">{props.children}</div>;
};

export default CenterContent;
