import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./rows.css";
import { getAllMovies, getMovie } from "../redux/action/movieAction";
import Button from "./Button";
import store from "../store";
import { convertNumberToExcelText } from "./utils";
import CenterContent from "./CenterContent";

const InitialSeatingArrangementSetup = (props) => {
  const { id } = props.match.params;
  const { movie, movies } = useSelector((state) => state.movies);
  const { rows: initRows, cols: initCols, blockedTicket } = movie ?? {};

  console.log("initial props ", movie);
  const [rows, setRows] = useState(initRows);
  const [cols, setCols] = useState(initCols);
  const [blocked, setBlocked] = useState({});

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setBlocked({ ...movie.blocked });
  }, [movie]);

  const selectedMovie = useMemo(
    () => movies.filter((movie) => movie.id === +id),
    [id, movies]
  );

  const handleSave = () => {
    console.log(store.getState());
    const otherMovies = movies?.filter((movie) => movie.id !== +id);

    const currentMovieData = {
      ...selectedMovie[0],
      blocked,
      rows,
      cols,
    };
    dispatch(getMovie(currentMovieData));
    dispatch(getAllMovies([currentMovieData, ...otherMovies]));
    localStorage.setItem("ticket-booking", JSON.stringify(store.getState()));
    history.push(`/movie/${id}`);
  };

  return (
    <React.Fragment>
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
      <CenterContent className="row-heading">
        Select Seats to be <span> Blocked</span>
      </CenterContent>
      {new Array(rows)?.fill(0).map((_, i) => (
        <div className="rows" key={i}>
          <div className="row-start">
            {convertNumberToExcelText(Number(i + 1))}
          </div>
          {new Array(cols)?.fill(0).map((_, j) => (
            <div
              className={`rows-col ${
                blocked?.[i + "#" + j]
                  ? "rows-col-to-be-removed"
                  : blockedTicket[i + "#" + j]
                  ? "rows-col-blocked"
                  : ""
              }`}
              key={i + "#" + j}
              onClick={() => {
                let key = i + "#" + j;
                if (!blockedTicket?.[key])
                  if (!blocked?.[key]) {
                    setBlocked({ ...blocked, [key]: 1 });
                  }
              }}
            >
              {!blocked?.[i + "#" + j] && j + 1}
            </div>
          ))}
        </div>
      ))}
    </React.Fragment>
  );
};

export default InitialSeatingArrangementSetup;
