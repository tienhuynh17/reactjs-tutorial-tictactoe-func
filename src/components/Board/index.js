import React from "react";

import "./style.css";

import Square from "../Square";

const Board = (props) => {
  const renderSquare = (i, isHighlighted) => {
    return (
      <Square
        key={i}
        highlight={isHighlighted}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  };

  const renderBoard = (size) => {
    let board = [];
    const result = props.result;
    for (let i = 0; i < size; i++) {
      let boardRow = [];
      for (let j = 0; j < size; j++) {
        const iCell = i * size + j;
        if (
          result &&
          (result[1] === iCell || result[2] === iCell || result[3] === iCell)
        )
          boardRow.push(renderSquare(iCell, true));
        else boardRow.push(renderSquare(iCell, false));
      }
      board.push(
        <div key={i} className="board-row">
          {boardRow}
        </div>
      );
    }
    return board;
  };

  return <div>{renderBoard(3)}</div>;
};

export default Board;
