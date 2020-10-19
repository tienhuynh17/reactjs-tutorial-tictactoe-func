import React from "react";
import "./style.css";

const Square = (props) => {
  if (props.highlight) {
    return (
      <button className="square highlight" onClick={() => props.onClick()}>
        {props.value}
      </button>
    );
  } else {
    return (
      <button className="square" onClick={() => props.onClick()}>
        {props.value}
      </button>
    );
  }
};

export default Square;
