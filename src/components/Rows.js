import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "./Button";
import CenterContent from "./CenterContent";
import { useHistory } from "react-router-dom";
import store from "../store";
import "./rows.css";
import { getAllMovies, getMovie } from "../redux/action/movieAction";
import { convertNumberToExcelText } from "./utils";

const Rows = (props) => {
  const [rowsColsHash, setRowsColsHash] = useState({});
  const [blocked, setBlocked] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();

  const { id } = props.match.params;

  const { movie, movies } = useSelector((state) => state.movies);
  const { blocked: blockedSeats, rows, cols } = movie ?? {};

  useEffect(() => {
    setBlocked({ ...movie.blockedTicket });
  }, [movie]);

  const otherMovies = useMemo(
    () => movies.filter((movie) => movie.id !== +id),
    [id, movies]
  );

  const handleSave = () => {
    const blockedTicket = {};
    Object.keys(rowsColsHash).forEach((key) => {
      if (rowsColsHash[key] && rowsColsHash[key] === 1)
        blockedTicket[key] = rowsColsHash[key];
    });
    setBlocked({ ...blocked, ...blockedTicket });
    setRowsColsHash({});
    const currentMovie = {
      ...movie,
      blockedTicket: { ...blocked, ...blockedTicket },
    };
    dispatch(getMovie(currentMovie));
    dispatch(getAllMovies([currentMovie, ...otherMovies]));
    localStorage.setItem("ticket-booking", JSON.stringify(store.getState()));
    // history.push(`/movies/${id}`);
  };

  return (
    <div>
      <CenterContent className="row-heading">
        Select Seats to be <span> Blocked</span>
      </CenterContent>

      {new Array(rows).fill(0).map((_, i) => (
        <div
          className={`rows ${+cols > 20 ? "rows-start" : "rows-center"}`}
          key={i}
        >
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
                  : blockedSeats?.[i + "#" + j]
                  ? "rows-col-to-be-removed"
                  : ""
              }`}
              key={i + "#" + j}
              onClick={() => {
                let key = i + "#" + j;
                if (!blockedSeats?.[key]) {
                  if (rowsColsHash[key]) {
                    setRowsColsHash({ ...rowsColsHash, [key]: 0 });
                  } else {
                    setRowsColsHash({ ...rowsColsHash, [key]: 1 });
                  }
                }
              }}
            >
              {!blockedSeats?.[i + "#" + j] && j + 1}
            </div>
          ))}
        </div>
      ))}
      {Object.keys(rowsColsHash)?.length > 0 && (
        <CenterContent>
          <Button text="Book Ticket" handleClick={handleSave} />
        </CenterContent>
      )}
    </div>
  );
};

export default Rows;
