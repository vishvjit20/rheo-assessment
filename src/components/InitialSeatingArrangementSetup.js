import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./rows.css";
import { getMovie } from "../redux/action/movieAction";
import store from "../store";

const InitialSeatingArrangementSetup = (props) => {
  const { id } = props.match.params;
  console.log("initial props ", id);
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(6);
  const [blocked, setBlocked] = useState({});

  const history = useHistory();
  const dispatch = useDispatch();

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
    dispatch(
      getMovie({
        blocked,
      })
    );
    console.log(store.getState());
    // history.push(`/movie/${id}`);
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
                blocked[i + "#" + j] ? "rows-col-active" : ""
              }`}
              key={i + "#" + j}
              onClick={() => {
                console.log("clicked");
                let key = i + "#" + j;
                if (blocked[key]) {
                  setBlocked({ ...blocked, [key]: 0 });
                } else {
                  setBlocked({ ...blocked, [key]: 1 });
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

export default InitialSeatingArrangementSetup;
