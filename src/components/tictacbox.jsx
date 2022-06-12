import React, { useState } from "react";
import "./tictacbox.css";
import logo from "./lux.mp4";

function Tictacbox() {
  const [cell, setCell] = useState([...Array(9)]);
  const [turn, setTurn] = useState("X");
  const [result, setResult] = useState({ names: "", winner: "" });

  const HandleDraw = (box) => {
    if (box.length === 9) {
      const allEqual = (box) => box.every((v) => v !== undefined);
      const values = allEqual(box);

      if (values === true && result.winner === "") {
        setResult({ names: "", winner: "Draw" });
      }
    }
  };
  const HandleResult = (box) => {
    let pattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    for (const value of pattern) {
      if (
        box[value[0]] === undefined ||
        box[value[1]] === undefined ||
        box[value[2]] === undefined
      ) {
      } else if (
        box[value[0]] === box[value[1]] &&
        box[value[1]] === box[value[2]]
      ) {
        setResult({ names: box[value[0]], winner: "Wins" });
      }
    }
    HandleDraw(box);
  };
  const Handlereset = (num) => {
    setCell([...Array(9)]);
    setTurn("X");
    setResult({ names: "", winner: "" });
  };
  const Handleclick = (num) => {
    if (cell[num] !== undefined) {
      return alert("Box Occupied");
    }
    let box = [...cell];
    if (turn === "X") {
      box[num] = "X";
      setTurn("O");
    } else {
      box[num] = "O";
      setTurn("X");
    }
    setCell(box);
    HandleResult(box, num);
  };
  const Cell = ({ num }) => {
    return (
      <td onClick={() => Handleclick(num)}>
        <b>{cell[num]}</b>
      </td>
    );
  };
  const Reset = () => {
    return (
      <button className="btn btn-success" onClick={() => Handlereset()}>
        Reset
      </button>
    );
  };
  return (
    <React.Fragment>
      <video src={logo} muted autoPlay loop></video>
      <div className="nava">
        <h1>Tic Tac Toe Game</h1>
      </div>
      <div className="container">
        {result.winner === "" ? (
          <h1 className="result">Player {turn} Turn</h1>
        ) : result.winner === "Wins" ? (
          <h1>
            Player {result.names} {result.winner}
          </h1>
        ) : (
          <h1>{result.winner}</h1>
        )}
        <table>
          <tbody>
            <tr>
              <Cell num={0} />
              <Cell num={1} />
              <Cell num={2} />
            </tr>
            <tr>
              <Cell num={3} />
              <Cell num={4} />
              <Cell num={5} />
            </tr>
            <tr>
              <Cell num={6} />
              <Cell num={7} />
              <Cell num={8} />
            </tr>
          </tbody>
        </table>
        <Reset />
      </div>
    </React.Fragment>
  );
}

export default Tictacbox;
