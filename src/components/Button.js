import React from "react";
import "./button.css";

const Button = (props) => {
  return (
    <button
      className={`customize-button ${props.className || ""}`}
      onClick={props.handleClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
