import React, { useState } from "react";
import "./rows.css";

const Rows = () => {
  const [rows, setRows] = useState(30);
  const [cols, setCols] = useState(6);
  const [rowsColsHash, setRowsColsHash] = useState({});
  const [blocked, setBlocked] = useState({});

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

  console.log("Blocked Seats are ", blocked);

  return (
    <div>
      <div className="row-input">
        <input
          type="number"
          placeholder="Rows"
          value={rows}
          onChange={(e) => {
            setRows(Number(e.target.value) || 0);
          }}
        />
        <input
          type="number"
          placeholder="Cols"
          value={cols}
          onChange={(e) => {
            setCols(Number(e.target.value) || 0);
          }}
        />

        <button className="save-btn" onClick={handleSave}>
          Save Setup
        </button>
      </div>
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
                  : ""
              }`}
              key={i + "#" + j}
              onClick={() => {
                console.log("clicked");
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
    </div>
  );
};

export default Rows;
