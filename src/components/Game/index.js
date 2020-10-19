import React, { useState } from "react";

import "./style.css";

import Board from "../Board";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], a, b, c];
    }
  }
  return null;
}

const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [orderedChecked, setOrderedChecked] = useState(Array(0));
  const [isReversedMoves, setIsReversedMoves] = useState(false);
  const [
    copiedOrReversedOrderChecked,
    setCopiedOrReversedOrderChecked,
  ] = useState(Array(0));

  const handleClick = (i) => {
    const history1 = history.slice(0, stepNumber + 1);
    const current = history1[history1.length - 1];
    const cloneSquares = current.squares.slice();
    const cloneOrderChecked = orderedChecked.concat(i);
    if (calculateWinner(cloneSquares) || cloneSquares[i]) {
      return;
    }
    cloneSquares[i] = xIsNext ? "X" : "O";

    setHistory(history1.concat([{ squares: cloneSquares }]));
    setXIsNext(!xIsNext);
    setStepNumber(history1.length);
    setOrderedChecked(cloneOrderChecked);
    setCopiedOrReversedOrderChecked(cloneOrderChecked);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const toggleMoves = () => {
    setIsReversedMoves(!isReversedMoves);
    setCopiedOrReversedOrderChecked(
      copiedOrReversedOrderChecked.slice().reverse()
    );
  };

  const current = history[stepNumber];

  const result = calculateWinner(current.squares);
  const winner = result && result[0];

  let moves;
  moves = history.map((step, move) => {
    if (isReversedMoves === true) {
      move = history.length - 1 - move;
    }
    const iCell = copiedOrReversedOrderChecked[move - 1];
    const nRow = ~~(iCell / 3);
    const nCol = iCell % 3;
    const desc = move
      ? "Go to move #" + move + " (" + nRow + ", " + nCol + ")"
      : "Go to game start";
    if (move === stepNumber) {
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>
            <b>{desc}</b>
          </button>
        </li>
      );
    } else {
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    }
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (stepNumber === 9) {
    status = "Draw match !";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          result={result}
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ul>
          <li>
            <button onClick={toggleMoves}>Toggle moves</button>
          </li>
        </ul>
        {isReversedMoves === false && <ol>{moves}</ol>}
        {isReversedMoves === true && <ol reversed>{moves}</ol>}
      </div>
    </div>
  );
};

export default Game;
