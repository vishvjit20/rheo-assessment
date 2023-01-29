import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./rows.css";
import { getAllMovies, getMovie } from "../redux/action/movieAction";
import NavigationBar from "./NavigationBar";
import Button from "./Button";
import store from "../store";

const InitialSeatingArrangementSetup = (props) => {
  const { id } = props.match.params;
  const { movie, movies } = useSelector((state) => state.movies);
  const { rows: initRows, cols: initCols } = movie;

  console.log("initial props ", movie);
  const [rows, setRows] = useState(initRows);
  const [cols, setCols] = useState(initCols);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selectedMovie = useMemo(
    () => movies.filter((movie) => movie.id === +id),
    [id, movies]
  );

  const handleSave = async () => {
    console.log(store.getState());
    const otherMovies = movies?.filter((movie) => movie.id !== +id);

    const currentMovieData = {
      ...selectedMovie[0],
      blocked,
      rows,
      cols,
    };
    await dispatch(getMovie(currentMovieData));
    await dispatch(getAllMovies([currentMovieData, ...otherMovies]));
    localStorage.setItem("ticket-booking", JSON.stringify(store.getState()));

    console.log(store.getState());

    history.push(`/movie/${id}`);
  };

  return (
    <div>
      <NavigationBar />
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
        <Button text="Save Setup" handleClick={handleSave} />
      </div>
      <div className="row-heading">
        Select Seats to be <span> Blocked</span>
      </div>
      {new Array(rows)?.fill(0).map((_, i) => (
        <div className="rows" key={i}>
          <div className="row-start">
            {convertNumberToExcelText(Number(i + 1))}
          </div>
          {new Array(cols)?.fill(0).map((_, j) => (
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
