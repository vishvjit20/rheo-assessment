import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "./Button";
import CenterContent from "./CenterContent";
import "./rows.css";

const Rows = () => {
  const [rowsColsHash, setRowsColsHash] = useState({});
  const [blocked, setBlocked] = useState({});

  const { movie } = useSelector((state) => state.movies);
  const { blocked: blockedSeats, rows, cols } = movie ?? {};
  console.log("Selected movie ", movie);

  const convertNumberToExcelText = (n) => {
    let result = "";
    while (n > 0) {
      let char = String.fromCharCode(65 + ((n - 1) % 26));
      result = char + result;
      n = ~~((n - 1) / 26);
    }
    return result;
  };

  const handleSave = () => {
    const blockedSeats = {};
    Object.keys(rowsColsHash).forEach((key) => {
      // console.log(key, rowsColsHash[key]);
      if (rowsColsHash[key] && rowsColsHash[key] === 1)
        blockedSeats[key] = rowsColsHash[key];
    });
    setBlocked({ ...blocked, ...blockedSeats });
    setRowsColsHash({});
  };

  return (
    <div>
      <div className="row-heading">
        Select Seats to be <span> Blocked</span>
      </div>
      {new Array(rows).fill(0).map((_, i) => (
        <div className="rows" key={i}>
          <div className="row-start">
            {convertNumberToExcelText(Number(i + 1))}
          </div>
          {new Array(cols).fill(0).map((_, j) => (
            <div
              className={`rows-col ${
                rowsColsHash[i + "#" + j]
                  ? "rows-col-active"
                  : blocked[i + "#" + j]
                  ? "rows-col-blocked"
                  : !!blockedSeats?.[i + "#" + j]
                  ? "rows-col-to-be-removed"
                  : ""
              }`}
              key={i + "#" + j}
              onClick={() => {
                let key = i + "#" + j;
                if (!blocked[key])
                  if (rowsColsHash[key]) {
                    setRowsColsHash({ ...rowsColsHash, [key]: 0 });
                  } else {
                    setRowsColsHash({ ...rowsColsHash, [key]: 1 });
                  }
              }}
            >
              {j + 1}
            </div>
          ))}
        </div>
      ))}
      <CenterContent>
        <Button text="Book Ticket" handleClick={handleSave} />
      </CenterContent>
    </div>
  );
};

export default Rows;
