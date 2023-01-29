import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "./Button";
import CenterContent from "./CenterContent";
import { useHistory } from "react-router-dom";
import store from "../store";
import "./rows.css";
import NavigationBar from "./NavigationBar";
import { getAllMovies, getMovie } from "../redux/action/movieAction";

const Rows = (props) => {
  const [rowsColsHash, setRowsColsHash] = useState({});
  const [blocked, setBlocked] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();

  const { id } = props.match.params;

  const { movie, movies } = useSelector((state) => state.movies);
  const { blocked: blockedSeats, rows, cols } = movie ?? {};
  console.log("Movie ", movie);

  useEffect(() => {
    setBlocked({ ...movie.blockedTicket });
  }, [movie]);

  console.log("Hash ", blocked);

  const convertNumberToExcelText = (n) => {
    let result = "";
    while (n > 0) {
      let char = String.fromCharCode(65 + ((n - 1) % 26));
      result = char + result;
      n = ~~((n - 1) / 26);
    }
    return result;
  };

  console.log(blocked);

  const otherMovies = useMemo(
    () => movies.filter((movie) => movie.id !== +id),
    [id, movies]
  );

  const handleSave = () => {
    const blockedTicket = {};
    Object.keys(rowsColsHash).forEach((key) => {
      // console.log(key, rowsColsHash[key]);
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
      <NavigationBar />
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
      <CenterContent>
        <Button text="Book Ticket" handleClick={handleSave} />
      </CenterContent>
    </div>
  );
};

export default Rows;
